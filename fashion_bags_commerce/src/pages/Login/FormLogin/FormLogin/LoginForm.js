import styles from './LoginForm.module.scss';
import { FacebookOutlined, GooglePlusOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { Button, Form, notification } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import Input from 'antd/es/input/Input';
import axios from 'axios';
import AuthAPI from '~/api/auth/AuthAPI';
import customerAPI from '~/api/customerAPI';
import staffAPI from '~/api/staffAPI';
function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  const onFinish = async (values) => {
    const userLogin = {
      email: values.email,
      password: values.password,
      role: 'ROLE_CUSTOMER',
    };
    try {
      console.log(userLogin);
      const response = await AuthAPI.login(userLogin);
      console.log(response.data.data.users.role);

      if (response.data.data.users.role === 'ROLE_CUSTOMER') {
        const customer = await customerAPI.findByUserId(response.data.data.users.userId);

        localStorage.setItem('customerToken', response.data.data.token);
        localStorage.setItem('customerId', customer.data.customerId);
        const userToken = await AuthAPI.getCustomerToken('ROLE_CUSTOMER');
        console.log('====================================');
        console.log('kh');
        console.log(userToken);
        console.log('====================================');
        localStorage.setItem('customerTokenString', JSON.stringify(userToken.data));
        localStorage.setItem('customerTokenStringDecode', JSON.stringify(btoa(userToken.data)));
        notification.success({
          message: 'Đăng nhập thành công!!!',
          description: `Welcome back to ${response.data.data.users.fullName}`,
          duration: 2,
        });
        navigate('/');
      }
      if (response.data.data.users.role === 'ROLE_STAFF' || response.data.data.users.role === 'ROLE_ADMIN') {
        const staff = await staffAPI.findByUserId(response.data.data.users.userId);

        localStorage.setItem('staffToken', response.data.data.token);
        localStorage.setItem('staffId', staff.data.staffId);
        const userToken = await AuthAPI.getStaffToken('ROLE_STAFF');
        localStorage.setItem('staffTokenString', JSON.stringify(userToken.data));
        const decodeUserString = btoa(userToken.data);
        localStorage.setItem('staffTokenStringDecode', decodeUserString);

        notification.success({
          message: 'Đăng nhập thành công!!!',
          description: `Welcome back to ${response.data.data.users.fullName}`,
          duration: 2,
        });
        navigate('/admin');
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Lỗi',
        description: 'Thông tin đăng nhập không chính xác',
        duration: 2,
      });
      localStorage.removeItem('usersTokenString');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.formLoginne}>
      <div className={styles.authFormContainer}>
        <h2 className={styles.title}>Đăng nhập</h2>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập Email!',
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Vui lòng nhập địa chỉ Email hợp lệ!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền Password!',
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value &&
                    value.length >= 12 &&
                    value.length <= 30 &&
                    /[\W_]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu trong khoảng 12-30 kí tự, bao gồm ký tự đặc biệt, số và chữ in hoa!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Button className={styles.linkBtn} onClick={() => navigate('/signup')}>
          Bạn đã chưa có tài khoản? Đăng kí ở đây!!!
        </Button>
      </div>
    </div>
  );
}
export default LoginForm;
