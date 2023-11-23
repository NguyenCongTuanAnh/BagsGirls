import styles from '../FormEdit/FormProductEdit.module.scss';

import React, { Fragment, useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Popconfirm, Row, Select, Space, Table, notification } from 'antd';
import ProductDetailsEdit from './ProductDetailsEdit/ProductDetailsEdit';
import baloDetailsAPI from '~/api/productDetailsAPI';
import brandAPI from '~/api/propertitesBalo/brandAPI';
import productAPI from '~/api/productsAPI';
import productDetailsAPI from '~/api/productDetailsAPI';
const { Option } = Select;
function FormProductEdit(props) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(props.product);
  const [brand, setBrand] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [baloList, setBaloList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fetchProducts();
    }, 1000);
  };
  const fetchProducts = async (productCode) => {
    setLoading(true);

    try {
      const response = await baloDetailsAPI.getAllByProductId(productCode);
      const data = response.data;

      setBaloList(data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('Đã xảy ra lỗi: ', error);
    }
  };
  const handleLoadBrand = async () => {
    const brandData = await brandAPI.getAll();
    setBrand(brandData.data);
  };
  useEffect(() => {
    handleLoadBrand();
  }, []);
  useEffect(() => {
    fetchProducts(product.productCode);

    handleLoadBrand();
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 70,
      fixed: 'left',
      render: (text, record, index) => <span>{(pagination.current - 1) * pagination.pageSize + index + 1}</span>,
    },
    {
      title: 'Balo Color',
      dataIndex: ['color', 'colorName'],
      width: 200,
      sorter: (a, b) => a.color.colorName.localeCompare(b.color.colorName),
    },
    {
      title: 'Type Balo',
      dataIndex: ['type', 'typeName'],
      width: 200,
      sorter: (a, b) => a.type.typeName.localeCompare(b.type.typeName),
    },
    {
      title: 'Material Balo',
      dataIndex: ['material', 'materialName'],
      width: 200,
      sorter: (a, b) => a.material.materialName.localeCompare(b.material.materialName),
    },
    {
      title: 'Size Balo',
      dataIndex: ['size', 'sizeName'],
      width: 200,
      sorter: (a, b) => a.size.sizeName.localeCompare(b.size.sizeName),
    },
    {
      title: 'Brand Balo',
      dataIndex: ['product', 'brand', 'brandName'],
      width: 200,
      sorter: (a, b) => a.product.brand.brandName.localeCompare(b.product.brandbrandName),
    },
    {
      title: 'Compartment Balo',
      dataIndex: ['compartment', 'compartmentName'],
      width: 200,
      sorter: (a, b) => a.compartment.compartmentName.localeCompare(b.compartment.compartmentName),
    },
    {
      title: 'Producer Balo',
      dataIndex: ['producer', 'producerName'],
      width: 200,
      sorter: (a, b) => a.producer.producerName.localeCompare(b.producer.producerName),
    },

    {
      title: 'Describe',
      dataIndex: 'productDetailDescribe',
      width: 500,
      sorter: (a, b) => a.productDetailDescribe.localeCompare(b.productDetailDescribe),
    },
    {
      title: 'Status',
      dataIndex: 'productDetailStatus',
      width: 200,
      sorter: (a, b) => a.productDetailStatus - b.productDetailStatus,
      render: (productDetailStatus) => {
        switch (productDetailStatus) {
          case 1:
            return 'Hoạt động';
          case 0:
            return 'Không hoạt động';
          case -1:
            return 'Trạng thái khác';
          default:
            return 'Không xác định';
        }
      },
    },
    {
      title: 'Import Price',
      dataIndex: 'importPrice',
      fixed: 'right',
      width: 100,
      sorter: (a, b) => a.importPrice - b.importPrice,
    },
    {
      title: 'Retails Price',
      dataIndex: 'retailPrice',
      fixed: 'right',
      width: 100,
      sorter: (a, b) => a.retailPrice - b.retailPrice,
    },
    {
      title: 'Amount',
      dataIndex: 'productDetailAmount',
      fixed: 'right',
      width: 100,
      sorter: (a, b) => a.productDetailAmount - b.productDetailAmount,
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button></Button>
        </Space>
      ),
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    form.submit();
  };
  const handleEditProductDetails = async (values) => {
    const editBalo = {
      productId: props.product.productId,
      productCode: values.productCode,
      productName: values.productName,
      productStatus: values.productStatus,
      brand: {
        brandId: values.brandId,
      },
    };
    try {
      const response = await productAPI.update(editBalo);
      notification.success({
        message: 'Thành công',
        description: 'Sửa thành công',
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
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };
  const handleDeleteSelected = async () => {
    setSelectedRowKeys([]);
    if (selectedRowKeys.length === 0) {
      notification.info({
        message: 'Lỗi',
        description: 'Vui lòng Chọn Sản phẩm chi tiết cần xóa!!!!',
        duration: 2,
      });
    } else {
      var isDone = true;
      selectedRowKeys.forEach((e, index) => {
        const response = productDetailsAPI.delete(e);
        //  if(response.)
      });
      isDone = true;
    }
  };
  return (
    <Fragment>
      <Button style={{ borderColor: 'blue', color: 'blue' }} onClick={showDrawer} icon={<EditOutlined />}>
        Sửa
      </Button>
      <Drawer
        title={'Edit - ' + product.productCode}
        width={1600}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose} type="primary">
              Thoát
            </Button>
          </Space>
        }
      >
        <h1>Thông tin Balo</h1>
        <div>
          <Popconfirm
            title="Xác Nhận"
            description="Bạn Có chắc chắn muốn Sửa?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={handleEdit}
            onCancel={() => {
              console.log('abc');
            }}
          >
            <Button type="primary" loading={false}>
              Sửa Balo
            </Button>
          </Popconfirm>
        </div>
        <hr></hr>
        <Form
          layout="vertical"
          hideRequiredMark
          initialValues={{
            productCode: product.productCode,
            productName: product.productName,
            productStatus: product.productStatus,
            brandId: props.brandId,
          }}
          onFinish={handleEditProductDetails}
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productCode"
                label="Mã Code Balo "
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền Mã Code Balo',
                  },
                ]}
              >
                <Input placeholder="Vui lòng điền Mã Code Balo" readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="productName"
                label="Tên "
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền Tên Balo',
                  },
                ]}
              >
                <Input name="baloName" placeholder="Vui lòng điền Tên Balo" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productStatus"
                label="Trạng Thái Balo"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner',
                  },
                ]}
              >
                <Select placeholder="Vui lòng chọn Trạng Thái Balo">
                  <Option value={1}>Hoạt Động</Option>
                  <Option value={0}>Không Hoạt Động</Option>
                  <Option value={-1}>Hủy Hoạt Động</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Thương Hiệu"
                    name="brandId"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn Thương Hiệu!',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      style={{
                        width: 200,
                      }}
                    >
                      {brand.map((o) => (
                        <Select.Option key={o.brandId} value={o.brandId}>
                          {o.brandName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
              </Row>
            </Col>
          </Row>
        </Form>

        <div>
          <h1>Thông tin Balo Chi tiết</h1>
          <hr></hr>
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <Button type="primary" onClick={start} loading={loading}>
              Reload
            </Button>

            <Table
              rowKey={(record) => record.productDetailId}
              rowSelection={rowSelection}
              loading={loading}
              columns={columns}
              dataSource={baloList}
              pagination={pagination}
              scroll={{
                x: 1500,
                y: 500,
              }}
            />
            <div>
              <Popconfirm
                title="Xác Nhận"
                description="Bạn Có chắc chắn muốn Sửa?"
                okText="Đồng ý"
                cancelText="Không"
                onConfirm={handleDeleteSelected}
                onCancel={() => {
                  console.log('abc');
                }}
              >
                <Button type="primary" loading={false} disabled={selectedRowKeys.length === 0}>
                  Xóa Balo Chi tiết
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Drawer>
    </Fragment>
  );
}
export default FormProductEdit;
