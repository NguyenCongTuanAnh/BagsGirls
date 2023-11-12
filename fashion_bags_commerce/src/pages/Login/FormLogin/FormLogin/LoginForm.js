import { FacebookOutlined, GooglePlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from '../../indexLogin.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, notification } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import Input from 'antd/es/input/Input';
import axios from 'axios';
import AuthAPI from '~/api/auth/AuthAPI';
function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  const onFinish = async (values) => {
    const userLogin = {
      email: values.email,
      password: values.password,
    };
    try {
      console.log(userLogin);
      const response = await AuthAPI.login(userLogin);
      const LoginUser = response.data.data.users;
      console.log(response.data.data.token);
      console.log(response.data.data.users.userId);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userId', response.data.data.users.userId);
      window.location.href = 'http://localhost:3000/product-add';
      notification.error({
        message: 'Đăng nhập thành công!!!',
        description: `Welcome back to ${LoginUser.fullName}`,
        duration: 2,
      });
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Lỗi',
        duration: 2,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
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
              message: 'Please input your email!',
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
              message: 'Please input your password!',
            },
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

      <button className={styles.linkBtn} onClick={() => props.onFormSwitch('register')}>
        Bạn không có tài khoản? Đăng ký ở đây!!!
      </button>
    </div>
  );
}
export default LoginForm;
