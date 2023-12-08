import React, { useState, useEffect, Fragment } from 'react';
import { Button, Pagination, Popconfirm, Space, Spin, Table, notification } from 'antd';
import customerAPI from '~/api/customerAPI';
import { DeleteOutlined, ReloadOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { tab } from '@testing-library/user-event/dist/tab';
import FormCustomerEdit from '../../CustomerEdit/FormEdit/FormCustomerEdit';
import SearchForm from './FormSearch/SearchForm';
import FormCustomerCreate from '../../CustomerEdit/FormCreate/FormCustomerCreate';

const TableContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSize, setPagesSize] = useState(10);
  const [totalItem, setTotalItem] = useState();
  const [search, setSearch] = useState('');

  const onCancel = () => { };

  useEffect(() => {
    getAll(currentPage, pagesSize);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading, search]);



  const onChange = (current, pageSize) => {
    setCurrentPage(current);
    setPagesSize(pageSize);
    setLoading(true);
  };

  const handleSearchChange = (newFilter) => {
    if (newFilter === undefined || newFilter.trim().length === 0) {
      setSearch('');
      setLoading(true);
      setCurrentPage(1);
    } else {
      setSearch(newFilter.trim());
      setLoading(true);
      setCurrentPage(1);
    }
  };

  const getAll = async (page, size) => {
    try {
      const response = await customerAPI.getSearchPagination(search, page, size);
      const data = response.data.content;
      setTotalItem(response.data.totalElements);
      setData(data);
    } catch (error) { }
  };

  // Define your table columns
  const columns = [
    {
      title: 'STT',
      width: '4%',
      render: (text, record, index) => <span>{(currentPage - 1) * pagesSize + index + 1}</span>,
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'customerCode',
      // sorter: (a, b) => a.staffCode.localeCompare(b.staffCode),
      width: '7%',
    },
    {
      title: 'Họ và tên',
      dataIndex: ['users', 'fullName'],
      sorter: (a, b) => a.users.fullName.localeCompare(b.users.fullName),
      width: '12%',
    },
    {
      title: 'Email',
      dataIndex: ['users', 'email'],
      sorter: (a, b) => a.users.usersEmail.localeCompare(b.users.usersEmail),
      width: '15%',
    },

    {
      title: 'SĐT',
      dataIndex: ['users', 'phoneNumber'],
      sorter: (a, b) => a.users.phoneNumber.localeCompare(b.users.phoneNumber),
      width: '8%',
    },
    {
      title: 'Giới tính',
      dataIndex: ['users', 'gender'],
      width: '5%',
      render: (gender) => {
        return gender ? 'Nam' : 'Nữ';
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: ['users', 'address'],
      // sorter: (a, b) => a.users.address.localeCompare(b.users.address),
      width: '15%',
    },
    {
      title: 'Điểm',
      dataIndex: 'rankingPoints',
      sorter: (a, b) => a.rankingPoints.localeCompare(b.rankingPoints),
      width: '5%',
    },
    {
      title: 'Hạng khách hàng',
      dataIndex: 'customerRanking',
      // sorter: (a, b) => a.users.userNote.localeCompare(b.users.userNote),
      width: '9%',
      render: (text, record) => {
        let statusText;

        switch (record.customerRanking) {
          case 'KH_TIEMNANG':
            statusText = 'Tiềm năng';
            break;
          case 'KH_THANTHIET':
            statusText = 'Thân thiết';
            break;
          case 'KH_BAC':
            statusText = 'Bạc';
            break;
          case 'KH_VANG':
            statusText = 'Vàng';
            break;
          case 'KH_KIMCUONG':
            statusText = 'Kim cương';
            break;
          default:
            statusText = 'Tiềm năng';
        }

        return <span>{statusText}</span>;
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: 'customerStatus',

      width: '11%',
      render: (status) => {
        let statusText;
        let statusClass;

        switch (status) {
          case 1:
            statusText = 'Hoạt động';
            statusClass = 'active-status';
            break;
          case -1:
            statusText = 'Ngừng hoạt động';
            statusClass = 'inactive-status';
            break;
          default:
            statusText = 'Không hoạt động';
            statusClass = 'inactive-status';
        }

        return <span className={statusClass}>{statusText}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <FormCustomerEdit
            customerData={record}
            reload={() => {
              setLoading(true);
            }}
          />

          <Popconfirm
            title="Xác Nhận"
            description="Bạn Có chắc chắn muốn xóa?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              deleteHandle(record.customerId, -1);
              setLoading(true);
            }}
            onCancel={onCancel}
          >
            <Button type="default" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),

      width: 100,
    },
  ];

  const deleteHandle = async (id, status) => {
    const xoa = await customerAPI.updateStatus(id, status);
    notification.info({
      message: 'Thông báo',
      description: 'Đã xóa thành công khách khàng',
    });
    setLoading(true);
  };

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <SearchForm onSubmit={handleSearchChange} />
      <FormCustomerCreate reload={() => setLoading(true)} />
      <Button icon={<ReloadOutlined />} style={{ marginLeft: '10px' }} onClick={() => setLoading(true)} loading={loading}></Button>

      <Table
        // scroll={{
        //   x: 550,
        //   y: 570,
        // }}
        style={{ marginTop: '10px' }}
        rowKey={(record) => record.customerId}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      // onChange={handlePageChange} // Handle page changes
      />

      <Pagination
        style={{ margin: '20px' }}
        className={styles.pagination}
        showSizeChanger
        total={totalItem}
        onChange={onChange}
        defaultCurrent={1}
        current={currentPage}
        defaultPageSize={pagesSize}
      />
    </div>
  );
};

export default TableContent;

//add nhan vien
