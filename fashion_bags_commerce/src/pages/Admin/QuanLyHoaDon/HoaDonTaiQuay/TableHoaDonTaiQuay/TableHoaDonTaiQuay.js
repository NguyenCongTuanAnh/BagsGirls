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
  SyncOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
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
  const [status, setStatus] = useState('0');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterStaffName, setFilterStaffName] = useState('');


  const columns = [
    {
      key: 'stt',
      dataIndex: 'index',
      title: 'STT',
      width: 70,
      render: (text, record, index) => {
        return <span id={record.id}>{(PageNum - 1) * pageSize + (index + 1)}</span>;
      },
    },
    {
      title: 'Mã',
      dataIndex: 'billCode',
      key: 'code',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'billCreateDate',
      width: 100,
      sorter: (a, b) => a.billCreateDate.localeCompare(b.billCreateDate),
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'staff',
      key: 'staffName',
      render: (staff) => {
        if (staff && staff.users && staff.users.fullName) {
          return staff.users.fullName;
        } else {
          return 'NULL';
        }
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'receiverName',
      key: 'receiverName',
      render: (text, record) => {
        if (record.customer == null) {
          return record.receiverName;
        } else {
          return record.customer.users.fullName;
        }
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'orderPhone',
      key: 'orderPhone',
      render: (text, record) => {
        if (record.customer == null) {
          return record.orderPhone;
        } else {
          return record.customer.users.phoneNumber;
        }
      },
    },
    {
      title: 'Tổng thanh toán',
      dataIndex: 'billPriceAfterVoucher',
      key: 'billPriceAfterVoucher',
      // sorter: (a, b) => a.billTotalPrice.localeCompare(b.billTotalPrice),
      render: (price) => {
        return <span>{VNDFormaterFunc(price)}</span>;
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: 'billStatus',
      key: 'status',
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
              {hanhDong(record, false)}
              <Space size="middle">
                <FormChiTietHoaDon bills={record} reload={() => setLoading(true)} />
              </Space>
            </div>
          );
        } else {
          return (
            <div>
              {hanhDong(record, true)}
              <Space size="middle">
                <FormChiTietHoaDon bills={record} reload={() => setLoading(true)} />
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
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs().add(1, 'd')],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs().add(1, 'd')],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs().add(1, 'd')],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs().add(1, 'd')],
    },
  ];

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
        pageSize
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

  }, [loading, search, status, startDate, endDate, filterStaffName]);
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
            <Col span={8}>
              <div style={{ paddingTop: '10px', fontSize: '16px' }}>
                <span style={{ fontWeight: 500 }}>Ngày tạo</span>
                <RangePicker className={styles.filter_inputSearch} presets={rangePresets} onChange={onRangeChange} />
              </div>
            </Col>
            <Col span={6}>
              <div style={{ paddingTop: '10px', fontSize: '16px' }}>
                <span style={{ paddingTop: '20px', fontSize: '16px', fontWeight: 500 }}>
                  Nhân viên
                  <Select
                    bordered={false}
                    style={{ width: '50%', borderBottom: '1px solid #ccc' }}
                    onChange={(value) => {
                      setFilterStaffName(value);
                    }}
                    defaultValue=""
                  >
                    <Select.Option value="">Tất cả</Select.Option>
                    {(listStaff ?? []).map((item, index) => (
                      <Select.Option key={index} value={item.usersFullName}>
                        {item.usersFullName}
                      </Select.Option>
                    ))}
                  </Select>
                </span>
              </div>
            </Col>

            <Col span={10}>
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
              CheckCircleOutlined,
              CloseCircleOutlined,
            ].map((Icon, i) => {
              const id = String(i + 1);
              return {
                label: (
                  <span>
                    <Icon />
                    {id === '1'
                      ? 'Tất cả'
                      : id === '2'
                        ? 'Thành công'
                        : id === '3'
                          ? 'Đã hủy'
                          : ''}
                  </span>
                ),
                key:
                  id === '1'
                    ? '0'
                    : id === '2'
                      ? '1'
                      : id === '3'
                        ? '-1'
                        : '',
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
