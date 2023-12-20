import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, notification, Modal, Popconfirm, Input, Select, DatePicker, Space, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { timers } from 'jquery';
import React, { Component, Fragment, useState } from 'react';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';
import voucherAPI from '~/api/voucherAPI';

function FormVoucherCreate(props) {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(true);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addFunc = async (values) => {
    setError(false);
    if (!error) {
      let add = { ...values, voucherCode: generateCustomCode('vc', 3) };
      console.log(add);

      try {
        const response = await voucherAPI.add(add);

        console.log(response);
        notification.success({
          message: 'Add thành công',
          description: 'Dữ liệu đã được thêm thành công',
          duration: 2,
        });

        handleCancel();

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
      <Button type="primary" onClick={showModal} style={{ width: '100px' }} icon={<PlusOutlined />}></Button>
      <Modal title="Thêm voucher" open={modalOpen} onCancel={handleCancel} footer={null}>
        <div>
          <Form
            form={form}
            labelCol={{
              span: 8,
            }}
            style={{
              maxWidth: 600,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={addFunc} // Xử lý khi submit form
          >
            <Form.Item
              label="Voucher Name"
              name="voucherName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền thông tin!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giảm giá"
              name="discountPercent"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền thông tin!',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            {/* <Form.Item label="Ngày tạo" name="voucherCreateDate">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item> */}

            <Form.Item label="Thời gian áp dụng" name="voucherDateRange">
              <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  name={'voucherStartTime'}
                  fieldKey={'voucherStartTime'}
                  rules={[{ required: true, message: 'Missing start date' }]}
                >
                  <RangePicker showTime />
                </Form.Item>
              </Space>
            </Form.Item>

            <Form.Item label="Kiểu voucher" name="voucherType">
              <Select
                style={{ width: 300 }}
                placeholder="Vui lòng chọn trạng thái"
                options={[
                  {
                    value: '1',
                    label: 'Giảm trực tiếp',
                  },
                  {
                    value: '0',
                    label: 'Giảm online',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Giá tối thiểu"
              name="totalPriceToReceive"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền thông tin!',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label="Voucher Note"
              name="voucherNote"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền thông tin!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="voucherAmount"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền thông tin!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Hình thức thanh toán" name="paymentType">
              <Select
                style={{ width: 300 }}
                placeholder="Vui lòng chọn trạng thái"
                options={[
                  {
                    value: 'trực tiếp',
                    label: 'Trực Tiếp',
                  },
                  {
                    value: 'online',
                    label: 'Online',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="Status" name="voucherStatus">
              <Select
                style={{ width: 300 }}
                placeholder="Vui lòng chọn trạng thái"
                options={[
                  {
                    value: '1',
                    label: 'Hoạt động',
                  },
                  {
                    value: '0',
                    label: 'Không Hoạt động',
                  },
                ]}
              />
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </Fragment>
  );
}

export default FormVoucherCreate;
