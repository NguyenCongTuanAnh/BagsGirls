import React, { useState } from 'react';
import { Steps, Button, Modal, notification, Popconfirm } from 'antd';
import billsAPI from '~/api/BillApi';
import { ReloadOutlined } from '@ant-design/icons';

function FormCapNhatTrangThai(props) {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState();
    const [billId, setBillId] = useState();
    const { Step } = Steps;


    const showModal = () => {
        setBillId(props.status.billId);
        setCurrent(currentData(props.status.billStatus));
        setVisible(true);
    };
    const onChange = (value) => {
        setCurrent(value);
    };
    const currentData = (value) => {
        switch (value) {
            case 1:
                return 4;
            case 2:
                return 2;
            case 3:
                return 1;
            case 4:
                return 0;
            default:
                return -1;
        }
    }

    const updateStatusBill = async (id, status) => {
        const xoa = await billsAPI.updateStatus(id, status);
        notification.success({
            message: 'Cập nhật thành công',
            description: 'Trạng thái đơn hàng ' + props.status.billCode + ' được cập nhật thành: ' + currentString(current),
        });
        setVisible(false);
        props.reload();
    };

    const currentString = (value) => {
        switch (value) {
            case 4:
                return 'Thành công';
            case 3:
                return 'Thành công';
            case 2:
                return 'Đang giao';
            case 1:
                return 'Đang đóng gói';
            case 0:
                return 'Chờ xác nhận';
            default:
                return 'Đã hủy';
        }
    }
    const statusTraVe = (value) => {
        switch (value) {
            case 0:
                return 4;
            case 1:
                return 3;
            case 2:
                return 2;
            case 3:
                return 1;
            case 4:
                return 1;
            default:
                return -1;
        }
    }

    return (
        <>
            <Button type="primary" disabled={props.disabled} onClick={showModal} icon={<ReloadOutlined />}>
                Trạng thái
            </Button>
            <Modal
                title={'Tình trạng hóa đơn: ' + currentString(current)}
                centered
                open={visible}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={[
                    <Button key="cancel" onClick={() => setVisible(false)}>
                        Hủy
                    </Button>,
                    <Popconfirm
                        key="popconfirm"
                        title="Xác nhận cập nhật trạng thái?"
                        onConfirm={() => updateStatusBill(billId, statusTraVe(current))}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type="primary">Xác nhận</Button>
                    </Popconfirm>,
                ]}
            >
                <Steps
                    type="navigation"
                    size="small"
                    current={current}
                    onChange={onChange}
                    className="site-navigation-steps"
                >
                    {[
                        {
                            title: 'Giai đoạn 1',
                            status: '4',
                            description: 'Chờ xác nhận',
                        },
                        {
                            title: 'Giai đoạn 2',
                            status: '3',
                            description: 'Đang đóng gói',
                        },
                        {
                            title: 'Giai đoạn 3',
                            status: '2',
                            description: 'Đang giao',
                        },
                        {
                            title: 'Giai đoạn 4',
                            status: '1',
                            description: 'Thành công',
                        },
                    ].map((item, index) => (
                        <Step
                            key={index}
                            title={item.title}
                            // subTitle={generateSubTitle(item)}
                            description={item.description}
                        />
                    ))}
                </Steps>
            </Modal>
        </>
    );
};

export default FormCapNhatTrangThai;
