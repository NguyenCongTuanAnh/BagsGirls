import React, { useState, useEffect, Fragment } from 'react';
import { Button, Pagination, Popconfirm, Space, Spin, Table, notification } from 'antd';
import staffAPI from '~/api/staffAPI';
import { DeleteOutlined, ReloadOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
// import FormStaffViewDetails from '../../StaffViewDetails/FormStaffViewDetails';
import FormStaffEdit from '../../StaffEdit/FormEdit/FormStaffEdit';
import SearchForm from './FormSearch/SearchForm';
import FormStaffCreate from '../../StaffEdit/FormCreate/FormStaffCreate';
const TableContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSize, setPagesSize] = useState(10);
  const [totalItem, setTotalItem] = useState();
  const [search, setSearch] = useState('');

  const onCancel = () => { };


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
    };


  };

  useEffect(() => {
    getAll(currentPage, pagesSize);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading, search]);

  const getAll = async (current, pageSize) => {
    try {
      const response = await staffAPI.getAllStaff(search, current, pageSize);
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
      title: 'Mã nhân viên',
      dataIndex: 'staffCode',
      sorter: (a, b) => a.staffCode.localeCompare(b.staffCode),
      width: '7%',
    },
    {
      title: 'Họ và tên',
      dataIndex: ['users', 'fullName'],
      sorter: (a, b) => a.users.fullName.localeCompare(b.users.fullName),
      width: '13%',
    },
    {
      title: 'Email',
      dataIndex: ['users', 'email'],
      width: '15%',
    },

    {
      title: 'SĐT',
      dataIndex: ['users', 'phoneNumber'],
      sorter: (a, b) => a.users.phoneNumber.localeCompare(b.users.phoneNumber),
      width: '10%',
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
      title: 'Chức vụ',
      dataIndex: ['users', 'role'],
      width: '8%',
      render: (text, record) => {
        let statusText;
        let statusClass;

        switch (record.users.role) {
          case 'ROLE_ADMIN':
            statusText = 'Admin';
            break;
          case 'ROLE_STAFF':
            statusText = 'Nhân viên';
            break;
          default:
            statusText = 'Null';
            statusClass = 'inactive-status';
        }
        return <span className={statusClass}>{statusText}</span>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: ['users', 'userNote'],
      // sorter: (a, b) => a.users.userNote.localeCompare(b.users.userNote),
      width: '12%',
    },

    {
      title: 'Trạng thái',
      dataIndex: 'staffStatus',
      width: '12%',
      render: (text, record) => {
        let statusText;
        let statusClass;

        switch (record.staffStatus) {
          case 1:
            statusText = 'Đang làm';
            statusClass = 'active-status';
            break;
          case 0:
            statusText = 'Tạm dừng';
            statusClass = 'other_status';
            break;
          case -1:
            statusText = 'Nghỉ làm';
            statusClass = 'inactive-status';
            break;
          default:
            statusText = 'Nghỉ làm';
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
          <FormStaffEdit
            staffData={record}
            reload={() => {
              setLoading(true);
            }}
          />
          <Popconfirm
            title="Xác nhận"
            description="Bạn có chắc chắn muốn cho nhân viên nghỉ làm?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              deleteHandle(record.staffId, -1, record.staffCode);
              setLoading(true);
            }}
            onCancel={onCancel}
          >
            <Button type="default" danger icon={<DeleteOutlined />}>
              Nghỉ làm
            </Button>
          </Popconfirm>
        </Space>
      ),

      width: 100,
    },
  ];

  const deleteHandle = async (id, status, code) => {
    const xoa = await staffAPI.updateStatus(id, status);
    notification.success({
      message: 'Thành công',
      description: 'Cập nhật nhân viên có mã: ' + code + ' là: nghỉ làm!',
    });
    setLoading(true);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearchChange} />
      <FormStaffCreate reload={() => setLoading(true)} />
      <Button icon={<ReloadOutlined />} onClick={() => setLoading(true)} style={{ marginLeft: '10px' }} loading={loading}></Button>

      <Table
        style={{ margin: '10px' }}
        className="table table-striped"
        scroll={{
          x: 1000,
          y: 590,
        }}
        rowKey={(record) => record.staffId}
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
