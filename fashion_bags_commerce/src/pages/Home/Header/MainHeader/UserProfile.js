import { Avatar, Badge, Button, Card, Popover } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCustomer } from '~/api/auth/helper/UserCurrent';

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

  const customer = getCustomer();

  console.log(customer);

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
                customer: customer,
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
        avatar={<Avatar src="https://i.imgur.com/TQNotqB.jpg"  style={{ fontSize: '90px', width:'50px',height:'50px' }} alt="User Avatar" />}
        title={`Xin chào, ${customer.users.fullName}`}
        description="Chúc bạn 1 ngày tốt lành"
      />
    </Card>
  );

  return (
    <Popover content={PopupProContent} title="Tài Khoản" trigger="hover">
      <Badge dot={true}>
        <div style={{ cursor: 'pointer' }}>
          <Avatar style={{ fontSize: '90px', width:'50px',height:'50px' }} size="large" src="https://i.imgur.com/TQNotqB.jpg" />
        </div>
      </Badge>
    </Popover>
  );
}

export default UserProfile;
