import React, { useState } from 'react';
import { Steps, Button, Modal } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import billsAPI from '~/api/BillApi';
import { icon } from '@fortawesome/fontawesome-svg-core';
import Icon from '@ant-design/icons/lib/components/Icon';

function FormCapNhatTrangThai(props) {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState();
    const { Step } = Steps;


    const showModal = () => {
        setCurrent(currentData(props.status.billStatus));
        setVisible(true);
    };
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const currentData = (value) => {
        switch (value) {
            case 0:
                return '4';
            case 1:
                return '3';
            case 2:
                return '2';
            case 3:
                return '1';
            default:
                return '1';
        }
    }

    const generateSubTitle = (step) => {
        return step.subTitle;
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Xác nhận
            </Button>
            <Modal
                title="Tình trạng hóa đơn"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
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
