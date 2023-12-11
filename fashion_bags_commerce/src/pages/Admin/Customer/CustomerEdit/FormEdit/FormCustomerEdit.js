import React, { Fragment, useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Radio, Row, Select, Space, Tabs, notification } from 'antd';

import customerAPI from '~/api/customerAPI';
const { useForm } = Form;
const { TabPane } = Tabs;


function FormCustomerEdit(props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [getEmail, setEmail] = useState('');
  const [getSDT, setSDT] = useState('');
  const [data, setData] = useState(props.customerData);
  const [password, setPassword] = useState(props.customerData.users.password);
  const [form] = useForm();



  const showDrawer = () => {
    setOpen(true);
    setData(props.customerData);
    setEmail(props.customerData.users.email);
    setSDT(props.customerData.users.phoneNumber);
    setPassword(props.customerData.users.password);
  };
  const onClose = () => {
    setOpen(false);
  };
  const updateData = (event) => {
    const { name, value } = event.target;
    setPassword(value);
  };

  const updateFunction = async (values) => {
    setError(false);
    if (!error) {
      let update = {
        customerId: data.customerId,
        customerCode: data.customerCode,
        customerStatus: values.customerStatus,
        consumePoints: data.consumePoints,
        rankingPoints: values.rankingPoints,
        customerRanking: data.customerRanking,
        users: {
          userId: data.users.userId,
          account: values.fullName,
          fullName: values.fullName,
          birthDay: null,
          password: data.users.password,
          email: values.email,
          userStatus: data.users.userStatus,
          gender: values.gender,
          address: values.address,
          phoneNumber: values.phoneNumber,
          userNote: values.userNote,
          role: "ROLE_CUSTOMER"
        }
      }
      try {
        console.log(update);
        await customerAPI.update(update);
        notification.success({
          message: 'Update thành công',
          description: 'Dữ liệu đã được thay đổi thành công',
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

  const updatePassword = async (customerId, password) => {
    setError(false);
    try {
      await customerAPI.updatePassword(customerId, password);
      notification.success({
        message: 'Cập nhật thành công',
        description: 'Dữ liệu đã được thay đổi thành công',
        duration: 2,
      });
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
  };


  const capNhatThongTin = (data) => {
    return (
      <Form layout="vertical" form={form} initialValues=
        {{
          fullName: data.users.fullName,
          customerStatus: data.customerStatus,
          email: data.users.email,
          phoneNumber: data.users.phoneNumber,
          address: data.users.address,
          gender: data.users.gender,
          rankingPoints: data.rankingPoints,
          userNote: data.users.userNote
        }}
        onFinish={updateFunction} >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='fullName'
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
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                placeholder="Vui lòng điền họ và tên!"
              />
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
              <Select placeholder="Vui lòng chọn trạng thái">
                <Select.Option value={1}>Hoạt động</Select.Option>
                <Select.Option value={-1}>Không hoạt động</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='email'
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
              <Input
                placeholder="Vui lòng điền email!"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='phoneNumber'
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
              <Input
                placeholder="Vui lòng điền SĐT!"
              />
            </Form.Item>
          </Col>

        </Row>
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item
              name='address'
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
            <Form.Item
              name="rankingPoints"
              label="Điểm"
            >
              <Input
                placeholder="Điểm"
                type="number"
                disabled={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Giới tính" name='gender'>
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
              name='userNote'
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
          <Space>
            <Button htmlType="submit" type="primary" className="btn btn-warning">
              Lưu
            </Button>
            <Button onClick={() => { form.resetFields(); }}>Tải lại</Button>
            <Button onClick={onClose}>Thoát</Button>
          </Space>
        </div>
      </Form>)
  }

  const capNhatMatKhau = (values) => {
    return (
      <div>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
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
                <Input.Password iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeFilled />)} onChange={updateData} name="password" />
              </Form.Item>
            </Col>
          </Row>
          <div>
            <Space>
              <Button onClick={() => updatePassword(values.customerId, password)} type="primary" className="btn btn-warning">
                Lưu
              </Button>
              <Button onClick={onClose}>Thoát</Button>

            </Space>
          </div>

        </Form>
      </div>
    )
  }

  return (
    <Fragment>
      <Button style={{ borderColor: 'blue', color: 'blue' }} onClick={showDrawer} icon={<EditOutlined />}>
        Sửa
      </Button>
      <Drawer
        title={'Cập nhật khách hàng có mã: ' + data.customerCode}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Cập nhật thông tin" key="1">
            {capNhatThongTin(data)}
          </TabPane>
          <TabPane tab="Cập nhật mật khẩu" key="2">
            {capNhatMatKhau(data)}
          </TabPane>
        </Tabs>


      </Drawer>
    </Fragment>
  );
}
export default FormCustomerEdit;
