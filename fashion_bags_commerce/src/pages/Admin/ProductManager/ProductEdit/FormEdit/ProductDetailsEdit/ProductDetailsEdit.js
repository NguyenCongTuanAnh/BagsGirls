import React, { Fragment, useEffect, useState } from 'react';
import { InfoOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Table } from 'antd';
import baloDetailsAPI from '~/api/productDetailsAPI';
const { Option } = Select;
function ProductDetailsEdit(props) {
  const [form] = Form.useForm();
  const productCode = props.productCode;
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    fetchProducts(productCode);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(true);
  const [baloList, setBaloList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

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
  useEffect(() => {
    if (productCode && open) {
      fetchProducts(productCode);
    }
  }, [productCode]);

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

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fetchProducts();
    }, 1000);
  };

  return (
    <Fragment>
      <div>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button type="primary" onClick={start} loading={loading}>
            Reload
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          ></span>
        </div>
        <Table
          rowKey={(record) => record.productDetailId}
          loading={loading}
          columns={columns}
          dataSource={baloList}
          pagination={pagination}
          scroll={{
            x: 1500,
            y: 500,
          }}
        />
      </div>
    </Fragment>
  );
}
export default ProductDetailsEdit;
