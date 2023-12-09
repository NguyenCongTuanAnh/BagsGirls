import React from 'react';
import { Avatar, Badge, Button, Card, Popconfirm, Popover } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Meta } = Card;

function UserProfile(props) {
  const { changeLoggedIn } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const customerTokenString = localStorage.getItem('customerTokenString');
  const customerId = localStorage.getItem('customerId');
  const customerToken = localStorage.getItem('customerToken');

  const handleLgOut = () => {
    changeLoggedIn();
  };

  // Trích xuất fullName từ location.state
  const fullName = (location?.state && location?.state?.fullName) || '';
  localStorage.setItem('fullName', fullName);
  const storedFullName = localStorage.getItem('fullName') || '';

  const PopupProContent = (
    <Card
      style={{
        width: 300,
      }}
      actions={[
        <Button
          onClick={() => {
            navigate('/profile', {
              state: {
                customerId: customerId,
                customerTokenString: customerTokenString,
                customerToken: customerToken,
                fullName: fullName,
                storedFullName: storedFullName,
              },
            });
          }}
        >
          Thông tin cá nhân
        </Button>,
        <Button key="logout" onClick={handleLgOut}>
          Đăng Xuất
        </Button>,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/201221549_1429087400810981_3996635976232470826_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7a1959&_nc_ohc=o_U7QXHn2v4AX9r9Ge0&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAiFUtuDyk8r86cMUKEo3qPmM040hn2duLnhF0bZ1n-zA&oe=6587F458"
            alt="User Avatar"
          />
        }
        title={`Xin chào, ${storedFullName}`}
        description="Chúc bạn 1 ngày tốt lành"
      />
    </Card>
  );

  return (
    <Popover content={PopupProContent} title="Tài Khoản" trigger="hover">
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
