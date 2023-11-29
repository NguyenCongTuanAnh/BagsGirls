import React, { useState } from 'react';
import { Button, Modal, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import billsAPI from '~/api/BillApi';

function FormCapNhatTrangThai(props) {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Xác nhận
            </Button>
            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Timeline
                    items={[
                        {
                            children: 'Create a services site 2015-09-01',
                        },
                        {
                            children: 'Solve initial network problems 2015-09-01',
                        },
                        {
                            dot: <ClockCircleOutlined className="timeline-clock-icon" />,
                            color: 'red',
                            children: 'Technical testing 2015-09-01',
                        },
                        {
                            children: 'Network problems being solved 2015-09-01',
                        },
                    ]}
                />
            </Modal>
        </>
    );
};

export default FormCapNhatTrangThai;
