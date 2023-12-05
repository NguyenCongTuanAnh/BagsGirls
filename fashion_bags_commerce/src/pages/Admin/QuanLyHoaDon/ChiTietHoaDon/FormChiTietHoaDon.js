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
    }, []);

    const getAllByBillId = async () => {
        const response = await billDetailsAPI.getAllByBillId(props.bills.billId);
        const data = response.data;
        setListBillDetais(data);
    };

    // useEffect(() => {
    //     const storedCart = localStorage.getItem('temporaryCart');
    //     if (storedCart) {
    //         const parsedCart = JSON.parse(storedCart);
    //         setCartItems(parsedCart);
    //     }
    // }, []);

    // const calculateTotal = () => {
    //     return cartItems.reduce((total, item) => {
    //         return total + item.quantity * item.retailPrice;
    //     }, 0);
    // };

    // const handleRemoveItem = (record) => {
    //     const updatedCart = cartItems.filter((item) => item !== record);
    //     setCartItems(updatedCart);
    //     localStorage.setItem('temporaryCart', JSON.stringify(updatedCart));

    //     if (updatedCart.length === 0) {
    //         window.location.reload();
    //     }
    // };

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (text, record) => (
                <Image style={{ width: '100px', height: '100px' }} src={record.productDetails.product.images[0].imgUrl} />
            ),
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
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            render: (text, record) => vndFormaterFunc(record.price),
            key: 'price',
        },
        {
            title: 'Thành tiền',
            render: (text, record) => vndFormaterFunc(record.amount * record.price),
            key: 'calculateTotal',
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
                            <h4 style={{ margin: '10px', }}>Danh sách sản phẩm đã mua:</h4>
                            <Table
                                bordered
                                style={{ margin: 'center', width: '100%', height: '100%' }}
                                className={styles.table_cart_item}
                                dataSource={listBillDetails}
                                columns={columns}
                                rowKey={(record) => record.billDetailId}
                                pagination={false}
                            />
                        </Col>
                        <Col span={8} style={{ border: '1px solid #cccccc ', margin: '10px 0 0 0', borderRadius: '15px', height: '700px' }}>
                        </Col>
                    </Row>



                    {/* <div className={styles.finalCart}>
                        <br></br>
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
                                                <span className={styles.labelName}>{vndFormaterFunc(calculateTotal())}</span>
                                            </li>
                                            <hr></hr>
                                            <li className={styles.productDetailItem}>
                                                <span className={styles.label}>Giảm tiền: </span>
                                                <span className={styles.labelName}>chưa có</span>
                                            </li>{' '}
                                            <hr></hr>
                                            <li className={styles.productDetailItem}>
                                                <span className={styles.label}>Thành tiền: </span>
                                                <span className={styles.labelName} style={{ color: 'red', fontWeight: 'bold', fontSize: '30px' }}>
                                                    {vndFormaterFunc(calculateTotal())}
                                                </span>
                                            </li>{' '}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </Modal >
        </>
    );
}

export default FormChiTietHoaDon;
