import React, { useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Popconfirm, Popover, message } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
const { Meta } = Card;

function UserProfile() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const navigate = useNavigate();
  let canNavigate = false;
  const handleLgOut = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Đang đăng xuất...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Mời đăng nhập lại!!!',
        duration: 2,
      });
      canNavigate = true;
      setTimeout(() => {
        localStorage.removeItem('customerTokenString');
        localStorage.removeItem('customerId');
        localStorage.removeItem('token');
        localStorage.removeItem('temporaryCart');
        navigate('/');
        window.location.reload();
      }, 1000);
    }, 1000);
  };
  const PopupProContent = (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/201221549_1429087400810981_3996635976232470826_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7a1959&_nc_ohc=o_U7QXHn2v4AX9r9Ge0&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAiFUtuDyk8r86cMUKEo3qPmM040hn2duLnhF0bZ1n-zA&oe=6587F458"
        />
      }
      actions={[
        <Popconfirm
          title="Xác Nhận"
          description="Bạn Có chắc chắn muốn đăng xuất?"
          okText="Đồng ý"
          cancelText="Không"
          onConfirm={handleLgOut}
          onCancel={() => {}}
        >
          <Button>
            <LogoutOutlined key="setting" />
          </Button>
          ,
        </Popconfirm>,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/201221549_1429087400810981_3996635976232470826_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7a1959&_nc_ohc=o_U7QXHn2v4AX9r9Ge0&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAiFUtuDyk8r86cMUKEo3qPmM040hn2duLnhF0bZ1n-zA&oe=6587F458" />
        }
        title="Thông tin cá nhân"
        description="Xin chào Phùng Văn huỳnh"
      />
    </Card>
  );
  return (
    <Popover content={PopupProContent} title="Thông báo" trigger="click">
      {contextHolder}
      <Badge dot={true}>
        <div style={{ cursor: 'pointer' }}>
          <Avatar
            style={{ marginLeft: '20px', fontSize: '50px' }}
            size="large"
            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/201221549_1429087400810981_3996635976232470826_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7a1959&_nc_ohc=o_U7QXHn2v4AX9r9Ge0&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAiFUtuDyk8r86cMUKEo3qPmM040hn2duLnhF0bZ1n-zA&oe=6587F458"
          />
        </div>
      </Badge>
    </Popover>
  );
}
export default UserProfile;
