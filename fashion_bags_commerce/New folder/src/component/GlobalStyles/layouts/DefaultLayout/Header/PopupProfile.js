import React from 'react';
import { EditOutlined, EllipsisOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Popover } from 'antd';
import { Navigate } from 'react-router-dom';
const { Meta } = Card;
const handleLogout = () => {
  // localStorage.removeItem('userId');
  // localStorage.removeItem('token');
  // <Navigate to={'/login'} />;
};
const PopupProContent = (
  <Card
    style={{
      width: 300,
    }}
    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
    actions={[
      <LogoutOutlined
        key="setting"
        onClick={() => {
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          window.location.href = 'http://localhost:3000/login';
        }}
      />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);
const PopupProfile = () => (
  <Popover content={PopupProContent} title="Thông báo" trigger="click">
    <Badge dot={true}>
      <div style={{ cursor: 'pointer' }}>
        <Avatar
          style={{ marginLeft: '20px' }}
          size="large"
          src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
        />
      </div>
    </Badge>
  </Popover>
);
export default PopupProfile;
