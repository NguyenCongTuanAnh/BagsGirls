import styles from './BaloDetailsPreview.module.scss';

import React, { Fragment, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  message,
  notification,
} from 'antd';
import baloAPI from '~/api/productsAPI';
import baloDetailsAPI from '~/api/productDetailsAPI';
import imageAPI from '~/api/ImageAPI';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';

const { Option } = Select;
function BaloDetailsPreview(props) {
  const [loading, setLoading] = useState(false);

  const [baloList, setBaloList] = useState(props.baloList);
  const [baloListPreview, setBaloListPreview] = useState(props.baloListPreview);
  const columns = [
    {
      title: 'Balo Code',
      dataIndex: 'productCode',
      fixed: 'left',
      width: 100,
      sorter: (a, b) => a.productCode.localeCompare(b.productCode),
    },
    {
      title: 'Name Balo',
      dataIndex: 'productName',
      width: 300,
      fixed: 'left',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'Color Balo',
      dataIndex: 'colorName',
      width: 100,
      sorter: (a, b) => a.productColor.localeCompare(b.productColor),
    },
    {
      title: 'Type Balo',
      dataIndex: 'typeName',
      width: 200,
      sorter: (a, b) => a.typeName.localeCompare(b.typeName),
    },
    {
      title: 'Material Balo',
      dataIndex: 'materialName',
      width: 100,
      sorter: (a, b) => a.materialName.localeCompare(b.materialName),
    },
    {
      title: 'Size Balo',
      dataIndex: 'sizeName',
      width: 100,
      sorter: (a, b) => a.sizeName.localeCompare(b.sizeName),
    },
    {
      title: 'Brand Balo',
      dataIndex: 'brandName',
      width: 100,
      sorter: (a, b) => a.brandName.localeCompare(b.brandName),
    },
    {
      title: 'Compartment Balo',
      dataIndex: 'compartmentName',
      width: 100,
      sorter: (a, b) => a.compartmentName.localeCompare(b.compartmentName),
    },
    {
      title: 'Producer Balo',
      dataIndex: 'producerName',
      width: 100,
      sorter: (a, b) => a.producerName.localeCompare(b.producerName),
    },

    {
      title: 'Describe',
      dataIndex: 'productDetailDescribe',
      width: 250,
      sorter: (a, b) => a.productDetailDescribe.localeCompare(b.productDetailDescribe),
    },
    {
      title: 'Status',
      dataIndex: 'productDetailStatus',
      width: 100,
      sorter: (a, b) => a.baloDetailStatus - b.baloDetailStatus,
    },
    {
      title: 'Import Price',
      dataIndex: 'importPrice',
      fixed: 'right',
      width: 150,
      sorter: (a, b) => a.importPrice - b.importPrice,
      render: (text, record) => (
        <InputNumber
          value={text}
          style={{
            width: '100%',
          }}
          onChange={(value) => handleEditChange(value, record.productCode, 'importPrice')}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\₫\s?|(,*)/g, '')}
        />
      ),
    },
    {
      title: 'Retails Price',
      dataIndex: 'retailPrice',
      fixed: 'right',
      width: 150,
      sorter: (a, b) => a.retailPrice - b.retailPrice,
      render: (text, record) => (
        <InputNumber
          style={{
            width: '100%',
          }}
          value={text}
          onChange={(value) => handleEditChange(value, record.productCode, 'retailPrice')}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\₫\s?|(,*)/g, '')}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'baloDetailAmount',
      fixed: 'right',
      width: 120,
      sorter: (a, b) => a.baloDetailAmount - b.baloDetailAmount,
      render: (text, record) => (
        <InputNumber
          style={{
            width: '100%',
          }}
          value={text}
          onChange={(value) => handleEditChange(value, record.productCode, 'baloDetailAmount')}
          formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\₫\s?|(,*)/g, '')}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
    },
  ];

  const handleEditChange = (value, key, field) => {
    if (value <= 0) {
      message.error('Giá trị không hợp lệ ! (giá trị sẽ không thay đổi)');
    } else {
      const newData = [...baloListPreview];
      const target = newData.find((item) => item.productCode === key);
      if (target) {
        target[field] = value;
        setBaloListPreview(newData);
      }

      const newDataAdd = [...baloList];
      const targetAdd = newDataAdd.find((item) => item.productCode === key);
      if (targetAdd) {
        targetAdd[field] = value;
        setBaloList(newDataAdd);
      }
    }
  };
  const save = async () => {
    if (baloList.length !== 0) {
      const tempBalo = baloList[0];
      console.log('====================================');
      console.log('tempBalo');
      console.log(tempBalo);
      console.log('====================================');
      const baloAdd = {
        productCode: tempBalo.productCode,
        productName: tempBalo.productName,
        brand: { brandId: tempBalo.brandId },
        productStatus: tempBalo.productStatus,
      };

      let baloDetails = baloList.map(
        ({
          buckleTypeId,
          colorId,
          compartmentId,
          materialId,
          producerId,
          sizeId,
          typeId,
          productDetailStatus,
          importPrice,
          retailPrice,
          productDetailDescribe,
          baloDetailAmount,
        }) => ({
          buckleType: {
            buckleTypeId: buckleTypeId,
          },
          color: {
            colorId: colorId,
          },
          compartment: {
            compartmentId: compartmentId,
          },
          material: {
            materialId: materialId,
          },
          producer: {
            producerId: producerId,
          },
          size: {
            sizeId: sizeId,
          },
          type: {
            typeId: typeId,
          },

          importPrice: importPrice,
          retailPrice: retailPrice,
          productDetailDescribe: productDetailDescribe,
          productDetailAmount: baloDetailAmount,
          productDetailStatus: productDetailStatus,
        }),
      );

      try {
        const response = await baloAPI.add(baloAdd);
        const id = response.data.productId;
        const result = await props.handleSendUpload();
        for (const obj of result) {
          const uploadedImage = obj;
          const imageAdd = {
            imgCode: uploadedImage.imgCode,
            imgName: uploadedImage.imgName,
            imgUrl: uploadedImage.imgUrl,
            isPrimary: true,
            products: {
              productId: id,
            },
          };
          const response = await imageAPI.upload(imageAdd);
        }

        baloDetails.forEach((element) => {
          element = {
            ...element,
            product: {
              productId: id,
            },
          };
          console.log('đây là detail');
          console.log(element);
          const response2 = baloDetailsAPI.add(element);
        });

        notification.success({
          message: 'Add thành công',
          description: 'Dữ liệu đã được thêm thành công',
          duration: 2,
        });
      } catch (error) {
        console.log(error);
        notification.error({
          message: 'Lỗi',
          description: 'Vui lòng xác nhận',
          duration: 2,
        });
      }
    } else {
      notification.error({
        message: 'Lỗi',
        description: 'Chưa có sản phẩm nào trong Danh sách thêm, vui lòng điền Form bên dưới để thêm',
        duration: 2,
      });
    }
  };
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    start();

    setBaloList(props.baloList);
    setBaloListPreview(props.baloListPreview);
  }, [props.baloList, props.baloListPreview]);
  return (
    <Fragment>
      <div>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <div className={styles.handleButton}>
            <div>
              <Button type="primary" onClick={start} loading={loading}>
                Reload
              </Button>
            </div>
            <div className={styles.buttonSave}>
              <Popconfirm
                title="Xác Nhận"
                description="Bạn Có chắc chắn muốn Thêm?"
                okText="Đồng ý"
                cancelText="Không"
                onConfirm={save}
                onCancel={start}
              >
                <Button type="primary" loading={loading}>
                  Lưu
                </Button>
              </Popconfirm>
            </div>
          </div>
          <span
            style={{
              marginLeft: 8,
            }}
          ></span>
        </div>

        <Table
          rowKey={(record) => record.productCode}
          loading={loading}
          columns={columns}
          dataSource={baloListPreview}
          pagination={false}
          scroll={{
            x: 1500,
            y: 600,
          }}
          style={{ maxHeight: '700px' }}
        />
      </div>
    </Fragment>
  );
}
export default BaloDetailsPreview;
