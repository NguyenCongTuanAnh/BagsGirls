import React, { Fragment, useState, useEffect, initialValue } from 'react';
import { EyeFilled, EyeInvisibleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Radio, notification } from 'antd';
import customerAPI from '~/api/customerAPI';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';

const { Option } = Select;
const FormCustomerCreate = (props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(true);


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const addFunc = async (values) => {
    setError(false);
    if (!error) {
      let add = { ...values, customerCode: generateCustomCode("KH", 7) };
      console.log(add);
      try {
        const response = await customerAPI.add(add);
        notification.success({
          message: 'Thêm thành công',
          description: 'Khách hàng đã được thêm thành công',
          duration: 2,
        });
        props.reload();
        onClose();

        // Đóng Modal sau khi thêm thành công
      } catch (error) {
        setError(true);
        notification.error({
          message: 'Lỗi',
          description: 'Vui lòng xác nhận',
          duration: 2,
        });
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        {' '}
        Thêm khách hàng
      </Button>
      <Drawer
        title="Tạo mới tài khoản khách hàng"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button>
            <Button onClick={addFunc} htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark initialValues={{
          users: { gender: true, role: 'ROLE_CUSTOMER' },
          // users: {}
          // customerRanking: 0,
          rankingPoints: 0
        }} onFinish={addFunc}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['user', 'fullName']}
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền họ và tên!',
                    pattern: /^[\p{L}\d\s]+$/u,
                    whitespace: true,
                    validator: (rule, value) => {
                      if (value && value.trim() !== value) {
                        return Promise.reject('Tên không được chứa khoảng trắng ở hai đầu!');
                      }
                      //  else if (value) {
                      //   return Promise.reject('');
                      // }
                      // else if (true) {
                      //   return Promise.reject('Vui lòng điền họ và tên!');
                      // }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Vui lòng điền họ và tên!" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="customerStatus"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn trạng thái!',
                  },
                ]}
              >
                <Select placeholder="Vui lòng chọn trạng thái!">
                  <Option value="1">Hoạt động</Option>
                  <Option value="-1">Ngừng Hoạt động</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền Email!',
                    whitespace: true,
                  },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Vui lòng nhập địa chỉ email hợp lệ!',
                  },
                ]}
              >
                <Input placeholder="Vui lòng điền email!" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name={['user', 'password']}
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
                <Input.Password iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeFilled />)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['user', 'phoneNumber']}
                label="SĐT"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền SĐT!',
                    whitespace: true,
                  },
                  {
                    pattern: /^((\+|00)84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8-9]|9\d)\d{7}$/,
                    message: 'Vui lòng nhập số điện thoại hợp lệ!',
                  },
                ]}
              >
                <Input placeholder="Vui lòng điền số điện thoại!" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['user', 'address']}
                label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền địa chỉ!',
                  },
                ]}
              >
                <Input placeholder="Vui lòng điền địa chỉ!" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giới tính" name={['user', 'gender']}>
                <Radio.Group>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={['user', 'userNote']}
                label="Ghi chú"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền ghi chú!',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder='Vui lòng điền ghi chú!' />
              </Form.Item>
            </Col>
          </Row>
          <div>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          </div>
        </Form>
      </Drawer>
    </Fragment>
  );
};
export default FormCustomerCreate;
