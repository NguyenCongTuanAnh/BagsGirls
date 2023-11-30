import React, { Fragment, useState } from 'react';
import styles from './indexLogin.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import AuthAPI from '~/api/auth/AuthAPI';

function RegisterForm(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [sdt, setSdt] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = async (values) => {
    const userSignUp = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      rePassword: values.rePassword,
    };
    if (userSignUp.password !== userSignUp.rePassword) {
      messageApi.open({
        type: 'error',
        content: '2 Mật Khẩu không khớp!!!',
      });
    } else {
      const useradd = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        role: 'ROLE_CUSTOMER',
      };
      try {
        const response = await AuthAPI.signup(useradd);
        console.log(response);

        if (response.status === 200) {
          notification.success({
            message: 'Thành Công',
            description: 'Tạo taì khoản thành công!!!',
            duration: 2,
          });
          setTimeout(() => {
            navigate('/login');
          }, 100);
        }
      } catch (error) {
        // messageApi.open({
        //   type: 'error',
        //   content: 'Đã có lỗi trong quá trình Đăng kí!!!',
        // });
        if (error.response.status === 400) {
          messageApi.open({
            type: 'error',
            content: 'Email này đã tồn tại!!!',
          });
        }
      }
    }
  };
  const handleSignUp = () => {
    form.submit();
  };
  return (
    <Fragment>
      {contextHolder}
      <div className={styles.formLoginne}>
        <div className={styles.authFormContainer}>
          <h2 className={styles.title}>Đăng ký</h2>
          <Form
            layout="vertical"
            form={form}
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
              label="Họ và Tên"
              name="fullName"
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
              label="Số Điện Thoại"
              name="phoneNumber"
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
              label="Mật Khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && value.length >= 12 && /[\W_]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Mật khẩu cần ít nhất 12 ký tự, bao gồm ký tự đặc biệt, số và chữ in hoa!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại Mật Khẩu"
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && value.length >= 12 && /[\W_]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Mật khẩu cần ít nhất 12 ký tự, bao gồm ký tự đặc biệt, số và chữ in hoa!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
          <Button className={styles.linkBtn} onClick={() => navigate('/login')}>
            Bạn đã có tài khoản? Đăng nhập ở đây!!!
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
export default RegisterForm;
