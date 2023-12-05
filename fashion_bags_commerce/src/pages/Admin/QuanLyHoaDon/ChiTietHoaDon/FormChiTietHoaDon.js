import { Table, Image, Button, notification, Modal, Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import styles from './chiTietHoaDon.module.scss';
import vndFormaterFunc from '~/Utilities/VNDFormaterFunc';
import { DeleteOutlined, DoubleRightOutlined, MenuFoldOutlined, MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import billDetailsAPI from '~/api/BillDetailsAPI';

function FormChiTietHoaDon(props) {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [visible, setVisible] = useState(false);
    const [billId, setBillId] = useState();
    const [titleComponent, setTitleComponent] = useState();
    const [listBillDetails, setListBillDetais] = useState([]);

    const showModal = () => {
        setBillId(props.bills.billId);
        getAllByBillId();
        console.log(listBillDetails);
        setTitleComponent(props.bills.billCode);
        setVisible(true);
    };


    useEffect(() => {
        getAllByBillId();
        const total = listBillDetails.reduce((totalQty, item) => {
            return totalQty + item.amount;
        }, 0);
        setTotalQuantity(total);
    }, [visible]);

    const getAllByBillId = async () => {
        const response = await billDetailsAPI.getAllByBillId(props.bills.billId);
        const data = response.data;
        setListBillDetais(data);

    };
    const setTenNhanVien = () => {
        if (props.bills.staff == null) {
            return '';
        } else {
            return props.bills.staff.users.fullName;
        }
    }
    const setSDTNhanVien = () => {
        if (props.bills.staff == null) {
            return '';
        } else {
            return props.bills.staff.users.phoneNumber;
        }
    }
    const setTenKhachHang = () => {
        if (props.bills.customer == null && props.bills.receiverName == null) {
            return '';
        } else if (props.bills.customer == null) {
            return props.bills.receiverName;
        } else if (props.bills.customer != null) {
            return props.bills.customer.users.fullName;
        }
    }
    const setSDTKhachHang = () => {
        if (props.bills.customer == null && props.bills.orderPhone == null) {
            return '';
        } else if (props.bills.customer == null) {
            return props.bills.orderPhone;
        } else if (props.bills.customer != null) {
            return props.bills.customer.users.phoneNumber;
        }
    }
    const setDiaChiKhachHang = () => {
        if (props.bills.customer == null && props.bills.shippingAddress == null) {
            return '';
        } else if (props.bills.customer == null) {
            return props.bills.shippingAddress;
        } else if (props.bills.customer != null) {
            return props.bills.customer.users.address;
        }
    }
    const setRankKhachHang = () => {
        if (props.bills.customer == null) {
            return 'Khách hàng lẻ';
        } else if (props.bills.customer.customerRanking === 'KH_TIEMNANG') {
            return "Khách hàng tiềm năng";
        } else if (props.bills.customer.customerRanking === 'KH_THANTHIET') {
            return "Khách hàng thân thiết";
        } else if (props.bills.customer.customerRanking === 'KH_BAC') {
            return "Khách hàng bạc";
        } else if (props.bills.customer.customerRanking === 'KH_VANG') {
            return "Khách hàng vàng";
        } else if (props.bills.customer.customerRanking === 'KH_KIMCUONG') {
            return "Khách hàng kim cương";
        } else {
            return 'Chưa có hạng';
        }
    }





    const columns = [
        {
            key: 'stt',
            dataIndex: 'index',
            title: 'STT',
            width: 70,
            render: (text, record, index) => {
                return <span id={record.id}>{(index + 1)}</span>;
            },
            width: '6%'
        },
        {
            title: 'Ảnh',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (text, record) => (
                <Image style={{ width: '100px', height: '100px' }} src={record.productDetails.product.images[0].imgUrl} />
            ),
            width: '15%'
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            render: (texe, record) => (
                <div className={styles.info_item}>
                    <div className={styles.title_product}>
                        {' '}
                        {record.productDetails.product.productName}-{record.productDetails.product.productCode}
                    </div>
                    <ul className={styles.attr}>
                        <li>
                            {' '}
                            <span className={styles.spanTitle}>Màu sắc: </span> {record.productDetails.color.colorName}
                        </li>
                        <li>
                            <span className={styles.spanTitle}>Chất liệu: </span>
                            {record.productDetails.material.materialName}
                        </li>
                    </ul>
                </div>
            ),
            key: 'productName',
        },
        {
            title: 'SL',
            dataIndex: 'amount',
            key: 'amount',
            width: '7%'
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            render: (text, record) => vndFormaterFunc(record.price),
            key: 'price',
            width: '13%'
        },
        {
            title: 'Thành tiền',
            render: (text, record) => vndFormaterFunc(record.amount * record.price),
            key: 'calculateTotal',
            width: '15%'
        },

    ];
    return (
        <>
            <Button type="primary" onClick={showModal} icon={<MenuFoldOutlined />}
            >
                Chi tiết
            </Button>
            <Modal
                title={<h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Chi tiết hóa đơn: {titleComponent}</h2>}
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                width={'85%'}
                height={'85%'}
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}>
                        Hủy
                    </Button>,
                ]}
            >
                <div>
                    <Row>
                        <Col span={15} style={{ border: '1px solid #cccccc ', margin: '10px 20px 0 20px', borderRadius: '15px', height: '700px' }}>
                            <h4 style={{ margin: '10px', fontWeight: 'bold' }}>Danh sách sản phẩm đã mua:</h4>
                            <Table
                                bordered
                                style={{ textAlign: 'center', width: '100%', height: '650px' }}
                                scroll={{ y: 550 }}
                                className={styles.table_cart_item}
                                dataSource={listBillDetails}
                                columns={columns}
                                rowKey={(record) => record.billDetailId}
                                pagination={false}
                            />
                        </Col>
                        <Col span={8} style={{ border: '1px solid #cccccc ', margin: '10px 0 0 0', borderRadius: '15px', height: '700px' }}>
                            <h4 style={{ margin: '10px', fontWeight: 'bold' }}>Nhân viên: </h4>
                            <div >
                                <ul >
                                    <li >
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Tên: </span>
                                        <span style={{ color: 'red', fontSize: '20px' }}>{setTenNhanVien()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>SĐT: </span>
                                        <span style={{ color: 'red', fontSize: '20px' }}>{setSDTNhanVien()} </span>
                                    </li>
                                </ul>
                            </div>
                            <hr></hr>
                            <h4 style={{ margin: '10px', fontWeight: 'bold' }}>Khách hàng: </h4>
                            <div>
                                <ul >
                                    <li >
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Tên: </span>
                                        <span style={{ color: 'red', fontSize: '20px' }}>{setTenKhachHang()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>SĐT: </span>
                                        <span style={{ color: 'red', fontSize: '20px' }}>{setSDTKhachHang()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Địa chỉ: </span>
                                        <span style={{ color: 'red', fontSize: '20px' }}>{setDiaChiKhachHang()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Hạng khách hàng: </span>
                                        <span style={{ color: 'red', fontSize: '20px' }}>{setRankKhachHang()} </span>
                                    </li>
                                </ul>
                            </div>
                            <hr></hr>

                            <div className={styles.content_product_pc}>
                                <div className={styles.group_content_product}>
                                    <div className={styles.body}>
                                        <div className={styles.body_ct}>
                                            <ul className="list-oppr">
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Số lượng: </span>
                                                    <span className={styles.labelName}>
                                                        <span style={{ color: 'red', fontSize: '30px' }}>{totalQuantity} </span>Sản phẩm
                                                    </span>
                                                </li>
                                                <hr></hr>
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Giá trị hàng hóa: </span>
                                                    <span className={styles.labelName} style={{ marginTop: '10px' }}>{vndFormaterFunc(props.bills.billTotalPrice)}</span>
                                                </li>
                                                <hr></hr>
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Giảm giá: </span>
                                                    <span className={styles.labelName} style={{ marginTop: '10px' }}>{vndFormaterFunc(props.bills.billTotalPrice - props.bills.billPriceAfterVoucher)}</span>
                                                </li>{' '}
                                                <hr></hr>
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Thành tiền: </span>
                                                    <span className={styles.labelName} style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>
                                                        {vndFormaterFunc(props.bills.billPriceAfterVoucher)}
                                                    </span>
                                                </li>{' '}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </div>
            </Modal >
        </>
    );
}

export default FormChiTietHoaDon;
