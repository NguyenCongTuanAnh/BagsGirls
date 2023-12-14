import { Table, Image, Button, notification, Modal, Card, Row, Col, Popconfirm, Space, Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import styles from './chiTietHoaDon.module.scss';
import vndFormaterFunc from '~/Utilities/VNDFormaterFunc';
import { CheckOutlined, DeleteOutlined, DoubleRightOutlined, ExclamationCircleOutlined, MenuFoldOutlined, MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';
import billDetailsAPI from '~/api/BillDetailsAPI';
import FormStaffEdit from '../../Staff/StaffEdit/FormEdit/FormStaffEdit';
import productDetailsAPI from '~/api/productDetailsAPI';

function FormChiTietHoaDon(props) {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [visible, setVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [billId, setBillId] = useState();
    const [titleComponent, setTitleComponent] = useState();
    const [listBillDetails, setListBillDetais] = useState([]);
    const [newAmount, setNewAmount] = useState([]);
    const [maxAmount, setMaxAmount] = useState([]);


    const addItemToNewAmount = (item) => {
        setNewAmount(prevState => [...prevState, item]);
    };
    const addItemToMaxAmount = (item) => {
        setMaxAmount(prevState => [...prevState, item]);
    };
    const showModal = () => {
        setBillId(props.bills.billId);
        setNewAmount([]);
        setMaxAmount([]);
        getAllByBillId();
        // console.log(listBillDetails);
        setTitleComponent(props.bills.billCode);
        const total = listBillDetails.reduce((totalQty, item) => {
            addItemToNewAmount(item.amount);
            addItemToMaxAmount(item.amount + item.productDetails.productDetailAmount);
            return totalQty + item.amount;
        }, 0);
        setTotalQuantity(total);
        setVisible(true);
    };

    useEffect(() => {
        setReload(false);
        getAllByBillId();
        calculateTotal();
        soLuongView();
    }, [visible, reload, totalQuantity]);

    const calculateTotal = () => {
        return listBillDetails.reduce((total, item) => {
            return total + item.amount * item.price;
        }, 0);
    };
    const soLuongView = () => {
        return listBillDetails.reduce((total, item) => {
            return total + item.amount;
        }, 0);
    };
    // const thanhTienView = () => {
    //     return calculateTotal() -
    // }


    const getAllByBillId = async () => {
        const response = await billDetailsAPI.getAllByBillId(props.bills.billId, -1);
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

    const updateAmountProductDetail = async (billDetailId, amount) => {
        try {
            await billDetailsAPI.updateAmountProductDetail(billDetailId, amount);
            notification.success({
                message: 'Thành công',
                description: 'Sửa thành công số lượng sản phẩm thành: ' + amount.toString(),
            });


        } catch (error) {
            console.error('Đã xảy ra lỗi: ', error);
        }
    }




    const columns = [
        {
            key: 'stt',
            dataIndex: 'index',
            title: 'STT',
            // width: 70,
            render: (text, record, index) => {
                return <span id={record.id}>{(index + 1)}</span>;
            },
            width: '57px'
        },
        {
            title: 'Ảnh',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (text, record) => (
                <Image style={{ width: '100px', height: '100px' }} src={record.productDetails.product.images[0].imgUrl} />
            ),
            width: '125px'
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            width: '250px',
            render: (texe, record) => (
                <div className={styles.info_item}>
                    <div className={styles.title_product}>
                        {record.productDetails.product.productName}-{record.productDetails.product.productCode}
                    </div>
                    <ul className={styles.attr}>
                        <li>
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
            width: '130px',
            render: (text, record, index) => (
                <Space>
                    <InputNumber
                        min={1}
                        max={Math.floor(maxAmount[index])}
                        step={1}
                        value={newAmount[index]}
                        onChange={(newValue) => {
                            setNewAmount(prevAmount => {
                                const updatedAmount = [...prevAmount];
                                updatedAmount[index] = newValue;
                                return updatedAmount;
                            });
                            // console.log(newAmount);
                        }}
                        style={{ width: '55px' }}
                    />
                    <Button
                        type="primary"
                        danger={newAmount[index] <= 0}
                        disabled={newAmount[index] == null ? true : false}
                        onClick={() => {
                            updateAmountProductDetail(record.billDetailId, newAmount[index]);
                            setReload(true);
                        }}
                        icon={<CheckOutlined />}
                        style={{ backgroundColor: newAmount[index] == null ? 'grey' : 'red', color: 'white' }}
                    >
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (text, record) => vndFormaterFunc(record.price),
            key: 'price',
            width: '120px'
        },
        {
            title: 'Thành tiền',
            render: (text, record) => vndFormaterFunc(record.amount * record.price),
            key: 'calculateTotal',
            width: '130px'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'billDetailStatus',
            width: '200px',
            key: 'status',
            render: (status) => {
                let statusText;
                let statusClass;
                let backgroundColor; // Define a variable for text color

                switch (status) {
                    case 3:
                        statusText = 'Chờ xác nhận lỗi';
                        statusClass = 'active-status';
                        backgroundColor = '#ffcc00';
                        break;
                    case 2:
                        statusText = 'Đã xác nhận lỗi';
                        statusClass = 'inactiveStatus';
                        backgroundColor = '#66cc66';
                        break;
                    case 1:
                        statusText = 'Không lỗi';
                        statusClass = 'inactiveStatus';
                        backgroundColor = '#3399ff';
                        break;
                    case -1:
                        statusText = 'Hàng lỗi';
                        statusClass = 'other-status';
                        backgroundColor = '#ff3333';
                        break;
                    default:
                        statusText = 'Không xác định';
                        statusClass = 'other-status';
                        backgroundColor = '#ff3333';
                }
                const textStyles = {
                    backgroundColor: backgroundColor,
                    padding: '13px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    color: 'white',
                };
                return (
                    <span className={statusClass} style={textStyles}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Xác nhận"
                        description="Bạn có chắc chắn muốn cho nhân viên nghỉ làm?"
                        okText="Đồng ý"
                        cancelText="Không"
                        onConfirm={() => {
                            // deleteHandle(record.staffId, -1, record.staffCode);
                            // setLoading(true);
                        }}
                    //   onCancel={onCancel}
                    >
                        <Button type="default" danger icon={<ExclamationCircleOutlined />}>
                            Hàng lỗi
                        </Button>
                    </Popconfirm>
                </Space>
            ),

            width: '150px',
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
                width={'97%'}
                height={'90%'}
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}>
                        Hủy
                    </Button>,
                ]}
            >
                <div>
                    <Row>
                        <Col span={16} style={{ border: '1px solid #cccccc ', margin: '10px 20px 0 20px', borderRadius: '15px', height: '700px' }}>
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
                        <Col span={7} style={{ border: '1px solid #cccccc ', margin: '10px 0 0 0', borderRadius: '15px', height: '700px' }}>
                            <h4 style={{ margin: '10px', fontWeight: 'bold' }}>Nhân viên: </h4>
                            <div >
                                <ul >
                                    <li >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Tên: </span>
                                        <span style={{ color: 'red', fontSize: '18px' }}>{setTenNhanVien()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>SĐT: </span>
                                        <span style={{ color: 'red', fontSize: '18px' }}>{setSDTNhanVien()} </span>
                                    </li>
                                </ul>
                            </div>
                            <hr></hr>
                            <h4 style={{ margin: '10px', fontWeight: 'bold' }}>Khách hàng: </h4>
                            <div>
                                <ul >
                                    <li >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Tên: </span>
                                        <span style={{ color: 'red', fontSize: '18px' }}>{setTenKhachHang()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>SĐT: </span>
                                        <span style={{ color: 'red', fontSize: '18px' }}>{setSDTKhachHang()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Địa chỉ: </span>
                                        <span style={{ color: 'red', fontSize: '18px' }}>{setDiaChiKhachHang()} </span>
                                    </li>
                                    <li >
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Hạng khách hàng: </span>
                                        <span style={{ color: 'red', fontSize: '18px' }}>{setRankKhachHang()} </span>
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
                                                        <span style={{ color: 'red', fontSize: '26px' }}>{soLuongView()} </span>Sản phẩm
                                                    </span>
                                                </li>
                                                <hr></hr>
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Giá trị hàng hóa: </span>
                                                    <span className={styles.labelName} style={{ marginTop: '10px' }}>{vndFormaterFunc(calculateTotal())}</span>
                                                </li>
                                                <hr></hr>
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Giảm giá: </span>
                                                    <span className={styles.labelName} style={{ marginTop: '10px' }}>{vndFormaterFunc(props.bills.billTotalPrice - props.bills.billPriceAfterVoucher)}</span>
                                                </li>{' '}
                                                <hr></hr>
                                                <li className={styles.productDetailItem}>
                                                    <span className={styles.label}>Thành tiền: </span>
                                                    <span className={styles.labelName} style={{ color: 'red', fontWeight: 'bold', fontSize: '26px' }}>
                                                        {vndFormaterFunc(calculateTotal())}
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
            </Modal>
        </>
    );
}

export default FormChiTietHoaDon;
