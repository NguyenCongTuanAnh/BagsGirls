import {
  Button,
  Card,
  Col,
  DatePicker,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  notification,

} from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FilterFilled,
  StarFilled,
  SyncOutlined,
  TableOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import billsAPI from '~/api/BillApi';
import staffAPI from '~/api/staffAPI';
import styles from './index.module.scss';
import SearchForm from '~/Utilities/FormSearch/SearchForm';
import dayjs from 'dayjs';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import productDetailsAPI from '~/api/productDetailsAPI';
import billDetailsAPI from '~/api/BillDetailsAPI';
import FormChiTietHoaDon from '../../ChiTietHoaDon/FormChiTietHoaDon';
const { RangePicker } = DatePicker;

function TableHoaDonTaiQuay() {
  const [data, setData] = useState([]);
  const [listStaff, setListStaff] = useState([]);
  const [totalItem, setTotalItem] = useState();
  const [loading, setLoading] = useState(true);
  const [PageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterStaffName, setFilterStaffName] = useState('');
  const [sortList, setSortList] = useState('billCreateDate');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [sortListPlaceHolder, setSortListPlaceHolder] = useState('timeDESC');


  const columns = [
    {
      key: 'stt',
      dataIndex: 'index',
      title: 'STT',
      width: '3%',
      render: (text, record, index) => {
        return <span id={record.id}>{(PageNum - 1) * pageSize + (index + 1)}</span>;
      },
    },
    {
      title: 'Mã hóa đơn',
      dataIndex: 'billCode',
      key: 'code',
      width: '6%',
    },
    {
      title: 'Loại hóa đơn',
      dataIndex: 'staff',
      key: 'staffCode',
      width: '6%',
      render: (staff) => {
        if (staff && staff.users) {
          return "Tại quầy";
        } else {
          return "Online";
        }
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'billCreateDate',
      width: '12%',
      sorter: (a, b) => a.billCreateDate.localeCompare(b.billCreateDate),
      render: (date) => {
        const formattedDate = dayjs(date).add(7, 'hour').format('YYYY-MM-DD HH:mm:ss');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'staff',
      key: 'staffCode',
      width: '5%',
      render: (staff) => {
        if (staff && staff.users) {
          return staff.staffCode;
        } else {
          return '';
        }
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'receiverName',
      key: 'receiverName',
      width: '12%',
      render: (text, record) => {
        if (record.customer == null) {
          if (record.receiverName == null) {
            return "";
          }
          return record.receiverName;
        } else {
          return record.customer.users.fullName;
        }
      },
    },
    {
      title: 'SĐT khách hàng',
      dataIndex: 'orderPhone',
      key: 'orderPhone',
      width: '10%',
      render: (text, record) => {
        if (record.customer == null) {
          if (record.orderPhone == null) {
            return "";
          }
          return record.orderPhone;

        } else {
          return record.customer.users.phoneNumber;
        }
      },
    },
    {
      title: 'Hạng khách hàng',
      dataIndex: 'customerRanking',
      key: 'customerRanking',
      width: '10%',
      render: (text, record) => {
        return (setRankKhachHang(record));
      },
    },
    {
      title: 'Tổng thanh toán',
      dataIndex: 'billPriceAfterVoucher',
      key: 'billPriceAfterVoucher',
      width: '10%',
      // sorter: (a, b) => a.billTotalPrice.localeCompare(b.billTotalPrice),
      render: (price) => {
        return <span>{VNDFormaterFunc(price)}</span>;
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: 'billStatus',
      key: 'status',
      width: '13%',
      render: (status) => {
        let statusText;
        let statusClass;
        let backgroundColor; // Define a variable for text color

        switch (status) {
          case 4:
            statusText = 'Chờ xác nhận';
            statusClass = 'active-status';
            backgroundColor = '#ffcc00';
            break;
          case 3:
            statusText = 'Đang đóng gói';
            statusClass = 'inactiveStatus';
            backgroundColor = '#66cc66';
            break;
          case 2:
            statusText = 'Đang giao';
            statusClass = 'inactiveStatus';
            backgroundColor = '#99cc00';
            break;
          case 1:
            statusText = 'Thành công';
            statusClass = 'inactiveStatus';
            backgroundColor = '#3399ff';
            break;
          case -1:
            statusText = 'Đã hủy';
            statusClass = 'other-status';
            backgroundColor = '#ff3333';
            break;
          default:
            statusText = 'Đã hủy';
            statusClass = 'other-status';
            backgroundColor = '#ff3333';
        }
        const textStyles = {
          backgroundColor: backgroundColor,
          padding: '13px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '20px',
          color: 'white',
        };
        return (
          <span className={statusClass} style={textStyles}>
            {statusText}
          </span>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => {
        if (record.billStatus !== -1) {
          return (
            <div>

              <Space size="middle" style={{ marginTop: '10px' }}>
                <FormChiTietHoaDon bills={record} reload={() => setLoading(true)} />
                {hanhDong(record, false)}
              </Space>
            </div>
          );
        } else {
          return (
            <div>

              <Space size="middle" style={{ marginTop: '10px' }}>
                <FormChiTietHoaDon bills={record} reload={() => setLoading(true)} />
                {hanhDong(record, true)}
              </Space>
            </div>
          );
        }
      },
      width: 100,
    },
  ];

  const hanhDong = (record, button) => {
    return (
      < Space size="middle" >
        <Popconfirm
          title="Xác Nhận"
          description="Bạn có chắc chắn muốn hủy đơn hàng?"
          okText="Đồng ý"
          cancelText="Không"
          onConfirm={() => {
            deleteHandle(record.billId, -1, record.billCode);
            setLoading(true);
          }}
          onCancel={onCancel}
        >
          <Button disabled={button} type="primary" danger icon={<CloseCircleOutlined />}>Hủy</Button>
        </Popconfirm>
      </Space >
    )
  };

  const updateAmount = async (billId) => {
    const list = await billDetailsAPI.getAllByBillId(billId);
    if (Array.isArray(list.data)) {
      await Promise.all(
        list.data.map(async (o) => {
          await productDetailsAPI.updateAmount(o.productDetails.productDetailId, -o.amount);
        }),
      );
    }

  };
  // const getAllByBillId = async (billId) => {
  //   const response = await billDetailsAPI.getAllByBillId(billId);
  //   const data = response.data;
  //   setListBillDetais(data);
  // };
  const deleteHandle = async (billId, status, code) => {
    updateAmount(billId);
    await billsAPI.updateStatus(billId, status);
    notification.success({
      message: 'Hủy thành công',
      description: 'Đơn hàng ' + code + ' hủy thành công!',
    });
  };
  const onCancel = () => { };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
      setPageNum(1);
    } else {
      setStartDate('0001-01-01');
      setEndDate('9999-02-02');
      setPageNum(1);
    }
  };

  const rangePresets = [
    {
      label: '7 ngày qua',
      value: [dayjs().add(-7, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
    },
    {
      label: '14 ngày qua',
      value: [dayjs().add(-14, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
    },
    {
      label: '30 ngày qua',
      value: [dayjs().add(-30, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
    },
    {
      label: '90 ngày qua',
      value: [dayjs().add(-90, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
    },
  ];

  const setRankKhachHang = (values) => {
    if (values.customer == null) {
      return (<span>
        <StarFilled /> Khách hàng lẻ
      </span>);
    } else if (values.customer.customerRanking === 'KH_TIEMNANG') {
      return "Tiềm năng";
    } else if (values.customer.customerRanking === 'KH_THANTHIET') {
      return "Thân thiết";
    } else if (values.customer.customerRanking === 'KH_BAC') {
      return "Bạc";
    } else if (values.customer.customerRanking === 'KH_VANG') {
      return "Vàng";
    } else if (values.customer.customerRanking === 'KH_KIMCUONG') {
      return "Kim cương";
    } else {
      return 'Chưa có hạng';
    }
  }

  const handleSearchChange = (newFilter) => {
    if (newFilter === undefined || newFilter.trim().length === 0) {
      setSearch('');
      setLoading(true);
      setPageNum(1);
    } else {
      setSearch(newFilter.trim());
      setLoading(true);
      setPageNum(1);
    }
  };

  const onChangeBill = (e) => {
    setStatus(e);
    setPageNum(1);
  };
  const onChangePage = (current, pageSize) => {
    setPageNum(current);
    setPageSize(pageSize);
    setLoading(true);
  };

  const getAllPhanTrangCompartment = async (pageNum, pageSize) => {
    try {
      const response = await billsAPI.getAllBillsOffline(
        filterStaffName,
        startDate,
        endDate,
        status,
        search,
        pageNum,
        pageSize,
        sortList,
        sortOrder,
        sortListPlaceHolder
      );
      const data = response.data.content;
      setTotalItem(response.data.totalElements);
      setData(data);
    } catch (error) {
      console.error('Đã xảy ra lỗi: ', error);
    }
  };
  const getAllStaff = async () => {
    try {
      const response = await staffAPI.getAllStaff();
      const list = response.data;
      setListStaff(list);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };
  useEffect(() => {
    getAllStaff();
    getAllPhanTrangCompartment(PageNum, pageSize);
    setTimeout(() => {
      setLoading(false);
    }, 500);

  }, [loading, search, status, startDate, endDate, filterStaffName, sortList, sortOrder, sortListPlaceHolder]);
  return (
    <div>
      <Card>
        <section>
          <Row>
            <h2 style={{ marginBottom: '30px' }}>
              <FilterFilled /> Bộ lọc
            </h2>
          </Row>
          <Row>
            <Col span={6}>
              <div style={{ paddingTop: '10px', fontSize: '16px' }}>
                <span style={{ fontWeight: 500 }}>Ngày tạo</span>
                <RangePicker className={styles.filter_inputSearch} style={{ marginLeft: '10px' }} presets={rangePresets} onChange={onRangeChange} />
              </div>
            </Col>
            <Col span={5}>
              <div style={{ paddingTop: '10px', fontSize: '16px' }}>
                <span style={{ paddingTop: '20px', fontSize: '16px', fontWeight: 500 }}>
                  Nhân viên
                  <Select
                    bordered={false}
                    style={{ width: '65%', borderBottom: '1px solid #ccc', marginLeft: '10px' }}
                    onChange={(value) => {
                      setFilterStaffName(value);
                    }}
                    defaultValue=""
                  >
                    <Select.Option value="">Tất cả</Select.Option>
                    {(listStaff ?? []).map((item, index) => (
                      <Select.Option key={index} value={item.staffCode}>
                        {item.staffCode}
                      </Select.Option>
                    ))}
                  </Select>
                </span>
              </div>
            </Col>
            <Col span={6}>
              <div style={{ paddingTop: '10px', fontSize: '16px' }}>
                <span style={{ paddingTop: '20px', fontSize: '16px', fontWeight: 500 }}>
                  Sắp xếp
                  <Select
                    allowClear
                    value={sortListPlaceHolder}
                    placeholder={'Sắp xếp theo...'}
                    size="large"
                    style={{
                      width: 250, marginLeft: '10px'
                    }}
                    onChange={(value) => {
                      if (value === 'priceASC') {
                        setSortOrder('ASC');
                        setSortList('billPriceAfterVoucher');
                        setSortListPlaceHolder('Tổng thanh toán tăng dần');
                      } else if (value === 'priceDESC') {
                        setSortOrder('DESC');
                        setSortList('billPriceAfterVoucher');
                        setSortListPlaceHolder('Tổng thanh toán giảm dần');
                      } else if (value === 'timeASC') {
                        setSortOrder('ASC');
                        setSortList('billCreateDate');
                        setSortListPlaceHolder('Thời gian tăng dần');
                      } else if (value === 'timeDESC') {
                        setSortOrder('DESC');
                        setSortList('billCreateDate');
                        setSortListPlaceHolder('Thời gian giảm dần');
                      } else {
                        setSortOrder(null);
                        setSortList(null);
                        setSortListPlaceHolder('Không');
                      }
                    }}
                  >
                    <Select.Option key={'0'} value={'0'}>
                      Không
                    </Select.Option>
                    <Select.Option key={'1'} value={'priceASC'}>
                      Tổng thanh toán tăng dần
                    </Select.Option>
                    <Select.Option key={'2'} value={'priceDESC'}>
                      Tổng thanh toán giảm dần
                    </Select.Option>
                    <Select.Option key={'3'} value={'timeASC'}>
                      Thời gian tăng dần
                    </Select.Option>
                    <Select.Option key={'4'} value={'timeDESC'}>
                      Thời gian giảm dần
                    </Select.Option>
                  </Select>
                </span>
              </div>
            </Col>

            <Col span={7}>
              <SearchForm onSubmit={handleSearchChange} style={{ width: '100%', marginBottom: '10px' }} />
            </Col>
          </Row>
        </section>
      </Card>
      <Card>
        <section>
          <h2 style={{ marginBottom: '10px' }}>
            <TableOutlined /> Danh sách hóa đơn tại quầy
          </h2>
          <Tabs
            defaultActiveKey={status}
            onChange={(e) => onChangeBill(e)}
            items={[
              SyncOutlined,
              ClockCircleOutlined,
              ClockCircleOutlined,
              ClockCircleOutlined,
              CheckCircleOutlined,
              CloseCircleOutlined,
            ].map((Icon, i) => {
              const id = String(i + 1);
              return {
                label: (
                  <span>
                    {React.createElement(Icon)} {/* Use React.createElement to create the icon */}
                    {id === '1'
                      ? 'Tất cả'
                      : id === '2'
                        ? 'Chờ xác nhận'
                        : id === '3'
                          ? 'Đang đóng gói'
                          : id === '4'
                            ? 'Đang giao'
                            : id === '5'
                              ? 'Thành công'
                              : id === '6'
                                ? 'Đã hủy'
                                : ''}
                  </span>
                ),
                key: id === '1' ? '' : id === '2' ? '4' : id === '3' ? '3' : id === '4' ? '2' : id === '5' ? '1' : id === '6' ? '-1' : '',
                children: (
                  <div style={{ padding: '8px' }}>
                    <span style={{ fontWeight: 500 }}>{/* <TableOutlined /> Danh sách yêu cầu */}</span>
                    <Table
                      style={{ marginTop: '10px' }}
                      dataSource={data}
                      columns={columns}
                      loading={loading}
                      rowKey={(record) => record.billCode}
                      loadingIndicator={<div>Loading...</div>}
                      pagination={false}
                    />
                    <Pagination
                      className={styles.pagination}
                      showSizeChanger
                      total={totalItem}
                      onChange={onChangePage}
                      defaultCurrent={1}
                      current={PageNum}
                      defaultPageSize={pageSize}
                    />
                  </div>
                ),
              };
            })}
          />
        </section>
      </Card>
    </div>
  );
}
export default TableHoaDonTaiQuay;
