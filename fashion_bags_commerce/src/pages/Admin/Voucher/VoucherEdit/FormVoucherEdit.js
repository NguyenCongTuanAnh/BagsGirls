import React, { Fragment, useState, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Radio, Row, Select, Space, notification } from 'antd';
import voucherAPI from '~/api/voucherAPI';

function FormvoucherEdit(props) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(props.voucher);
  const [stringStatus, setStringStatus] = useState('');

  const closeComponent = () => {
    setOpen(false);
  };

  const updateData = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const updateStatus = (value) => {
    setData({ ...data, voucherStatus: value });
  };

  const updateFunction = async (voucherId, values) => {
    try {
      await voucherAPI.update(voucherId, values);
      notification.success({
        message: 'Cập nhật thành công',
        description: 'Dữ liệu đã được cập nhật thành công',
        duration: 1,
      });
      closeComponent();
    } catch (error) {
      notification.error({
        message: 'Cập nhật thất bại',
        description: 'Dữ liệu không được cập nhật',
        duration: 1,
      });
    }
  };

  const showDrawer = () => {
    setOpen(true);
    setData({ ...data }); // Lưu dữ liệu hiện tại vào tempData khi mở Drawer
    if (data.voucherStatus === 1) {
      setStringStatus('Hoạt động');
    } else if (data.customerStatus === -1) {
      setStringStatus('Ngừng hoạt động');
    } else {
      setStringStatus('Không hoạt động');
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button style={{ borderColor: 'blue', color: 'blue' }} onClick={showDrawer} icon={<EditOutlined />}>
        Sửa
      </Button>
      <Drawer
        title={'Update voucher:' + data.voucherId}
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
            <Button onClick={onClose}>Thoát</Button>
            <Button onClick={() => updateFunction(data.voucherId, data)} type="primary" className="btn btn-warning">
              Lưu
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" initialValues={data}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="voucherName"
                label="Tên Khuyến Mại"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input name="voucherName" value={data.voucherName} onChange={updateData} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Trạng Thái"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn trạng thái',
                  },
                ]}
              >
                <Select onChange={updateStatus} defaultValue={stringStatus} placeholder="Vui lòng chọn Trạng Thái">
                  <Select.Option value="1">Hoạt động</Select.Option>
                  <Select.Option value="0">Không hoạt động</Select.Option>
                  <Select.Option value="-1">Ngừng hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="discountPercent"
                label="Giảm giá (%)"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập giá giảm',
                  },
                ]}
              >
                <Input type="number" name="discountPercent" value={data.discountPercent} onChange={updateData} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalPriceToReceive"
                label="Giá tối thiểu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập giá tối thiểu',
                  },
                ]}
              >
                <Input
                  type="number"
                  name="totalPriceToReceive"
                  value={data.totalPriceToReceive}
                  onChange={updateData}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="voucherStartTime"
                label="Thời gian bắt đầu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thời gian bắt đầu',
                  },
                ]}
              >
                <Input name="voucherStartTime" value={data.voucherStartTime} onChange={updateData} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="voucherEndTime"
                label="Thời gian kết thúc"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thời gian kết thúc',
                  },
                ]}
              >
                <Input name="voucherEndTime" value={data.voucherEndTime} onChange={updateData} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="voucherNote"
                label="Note"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập ghi chú',
                  },
                ]}
              >
                <Input.TextArea name="voucherNote" value={data.voucherNote} onChange={updateData} rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Fragment>
  );
}

export default FormvoucherEdit;
