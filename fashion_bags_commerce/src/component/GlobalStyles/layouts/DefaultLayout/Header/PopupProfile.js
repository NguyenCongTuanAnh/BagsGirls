import React, { useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Popconfirm, Popover, message } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
const { Meta } = Card;

function PopupProfile() {
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
        localStorage.removeItem('staffTokenString');
        localStorage.removeItem('staffId');
        localStorage.removeItem('token');
        navigate('/admin/login');
        window.location.reload();
      }, 1000);
    }, 1000);
  };
  const PopupProContent = (
    <Card
      style={{
        width: 300,
      }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
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
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
  return (
    <Popover content={PopupProContent} title="Thông báo" trigger="click">
      {contextHolder}
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
}
export default PopupProfile;
