import { Button, Card, Col, DatePicker, InputNumber, Pagination, Popconfirm, Row, Select, Space, Spin, Statistic, Table, notification } from 'antd';
import dayjs from 'dayjs';
import { Chart } from 'react-google-charts';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, FilterFilled, ReloadOutlined, ShoppingCartOutlined, ShoppingOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext, Fragment } from 'react';
import colorAPI from '~/api/propertitesBalo/colorAPI';
import styles from './thongKe.module.scss';
import SearchForm from '~/Utilities/FormSearch/SearchForm';
import Icon from '@ant-design/icons/lib/components/Icon';
import ThongKeAPI from '~/api/ThongKeAPI';
const { RangePicker } = DatePicker;


function ThongKeContent() {

    const [startDate, setStartDate] = useState('0001-01-01');
    const [endDate, setEndDate] = useState('9999-02-02');
    const [totalProductAmount, setTotalProductAmount] = useState(0);
    const [totalBillsCount, setTotalBillsCount] = useState(0);
    const [totalStaffsCount, setTotalStaffsCount] = useState(0);
    const [tiLeDoanhThu, setTiLeDoanhThu] = useState(1);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [listDoanhThuTrongThang, setListDoanhThuTrongThang] = useState([]);
    const revenueData = []; // Dữ liệu doanh thu
    const topProductsData = []; // Dữ liệu top sản phẩm
    const topCustomersData = []; // Dữ liệu top khách hàng


    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
        } else {
            setStartDate('0001-01-01');
            setEndDate('9999-02-02');
        }
    };
    const setTangGiamDoanhThu = () => {
        if (tiLeDoanhThu == null) {
            return <Space></Space>;
        } else if (tiLeDoanhThu != null && tiLeDoanhThu >= 0) {
            return (
                <Space>
                    <Statistic
                        title={<span style={{ fontSize: '23px' }}>Doanh thu so với tháng trước</span>}
                        value={tiLeDoanhThu}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="% doanh thu"
                    />
                </Space>
            )
        } else {
            return (
                <Space>
                    <Statistic
                        title={<span style={{ fontSize: '23px' }}>Doanh thu so với tháng trước</span>}
                        value={tiLeDoanhThu}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Space>
            )
        }
    }
    const rangePresets = [
        {
            label: 'Ngày hôm nay',
            value: [dayjs(), dayjs().add(1, 'd')],
        },
        {
            label: '7 ngày qua',
            value: [dayjs().add(-7, 'd'), dayjs().add(1, 'd')],
        },
        {
            label: '14 ngày qua',
            value: [dayjs().add(-14, 'd'), dayjs().add(1, 'd')],
        },
        {
            label: '30 ngày qua',
            value: [dayjs().add(-30, 'd'), dayjs().add(1, 'd')],
        },
        {
            label: '90 ngày qua',
            value: [dayjs().add(-90, 'd'), dayjs().add(1, 'd')],
        },
    ];


    // Tính toán phần trăm tăng giảm doanh thu so với tháng trước
    const getBillStatisticsByDateRange = async () => {
        try {
            const response = await ThongKeAPI.getBillStatisticsByDateRange(startDate, endDate);
            const data = response.data;
            setTiLeDoanhThu(data.doanhThuSoVoiThangTruoc);
            setTotalBillsCount(data.totalBillsCount);
            setTotalProductAmount(data.totalProductAmount);
            setTotalStaffsCount(data.totalStaffsCount);
        } catch (error) { }
    };

    const getTotalPricesByDay = async () => {
        try {
            const response = await ThongKeAPI.getTotalPricesByDay(month, year);
            const data = response.data;
            setListDoanhThuTrongThang(data);
        } catch (error) { }
    };
    useEffect(() => {
        getTotalPricesByDay();
        // Tải API biểu đồ Google
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;

        // Set up a callback for when the script is loaded
        script.onload = () => {
            // Load the visualization library
            window.google.charts.load('current', { packages: ['corechart'] });

            // Set a callback to run when the Google Visualization API is loaded
            window.google.charts.setOnLoadCallback(drawChart);
            window.google.charts.load('current', { packages: ['corechart'] });

            // Set a callback to run when the Google Visualization API is loaded
            window.google.charts.setOnLoadCallback(drawChart);
        };

        // Append the script element to the document head
        document.head.appendChild(script);

        // Clean up the script element when the component is unmounted
        return () => {
            document.head.removeChild(script);
        };
    }, [month, year]);
    useEffect(() => {
        getBillStatisticsByDateRange();
        // // Tải API biểu đồ Google
        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src = 'https://www.gstatic.com/charts/loader.js';
        // script.async = true;
        // script.onload = () => {
        //     // Load the visualization library
        //     window.google.charts.load('current', { packages: ['corechart'] });
        //     // Set a callback to run when the Google Visualization API is loaded
        //     window.google.charts.setOnLoadCallback(drawChart);
        // };
        // document.head.appendChild(script);
    }, [startDate, endDate]);


    const drawChart = () => {
        // Dữ liệu và cấu hình biểu đồ của bạn tại đây
        const data = window.google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7],
        ]);

        const options = {
            title: 'Thống kê trạng thái đơn hàng',
            pieHole: 0.4,
        };
        const chart = new window.google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);

        // Khởi tạo và vẽ biểu đồ

        const dataChartColumn = new window.google.visualization.DataTable();
        dataChartColumn.addColumn('string', 'Ngày: ');
        dataChartColumn.addColumn('number', 'Doanh thu');
        listDoanhThuTrongThang.forEach(item => {
            dataChartColumn.addRow([item[0], item[1]]);
        });
        const optionsChartColumn = {
            title: 'Thống kê doanh thu trong tháng',
            pieHole: 0.4,
        };
        const chartColumn = new window.google.visualization.ColumnChart(document.getElementById('chart_column'));
        chartColumn.draw(dataChartColumn, optionsChartColumn);
    };

    const columnProduct = [
        {
            key: 'stt',
            dataIndex: 'index',
            title: 'Top',
            width: 70,
            render: (text, record, index) => {
                return <span id={record.id}>{index + 1}</span>;
            },
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Tên balo',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Mã balo',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Số lượng balo bán được',
            dataIndex: 'quantitySold',
            key: 'quantitySold',
        },

    ];
    const columnCustomer = [
        {
            key: 'stt',
            dataIndex: 'index',
            title: 'Top',
            width: 70,
            render: (text, record, index) => {
                return <span id={record.id}>{index + 1}</span>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'SĐT',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'quantitySold',
            key: 'quantitySold',
        },
    ];
    return (
        <div style={{}}>
            {/* <Card style={{ marginTop: '15px', marginLeft: '1%', height: '95%', width: '98%', border: '30px' }}>
                
            </Card> */}
            <Row>
                <Col span={10}>
                    <div style={{ fontSize: '16px', marginTop: '5px', marginBottom: '20px', marginLeft: '20px', height: '95%', width: '98%', border: '30px' }}>
                        <FilterFilled style={{ fontSize: '30px' }} />
                        <span style={{ fontWeight: 700, fontSize: '24px' }}>  Khoảng ngày:  </span>
                        <RangePicker className={styles.filter_inputSearch} presets={rangePresets} onChange={onRangeChange} />
                    </div>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '15px', marginLeft: '5px' }}>
                <Col span={6} >
                    <Row style={{ backgroundColor: '#ffffff', height: '100%' }}>
                        <Col span={24} style={{ margin: '0 10px 10px 10px' }}>
                            {setTangGiamDoanhThu()}
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row style={{ backgroundColor: '#2d73d4', height: '100%' }}>
                        <Col span={8} style={{ textAlign: 'center', margin: 'auto' }}>
                            <ShoppingCartOutlined style={{ fontSize: '60px', color: '#ffffff' }} />
                        </Col>
                        <Col span={16} style={{ backgroundColor: '#ffffff' }}>
                            <Statistic
                                style={{ marginLeft: '10px' }}
                                title={<span style={{ fontSize: '23px' }}>Tổng số đơn hàng</span>}
                                value={totalBillsCount}
                                valueStyle={{ fontSize: '30px' }}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col span={6}>
                    <Row style={{ backgroundColor: 'rgb(6, 117, 34)', height: '100%', marginRight: '15px' }}>
                        <Col span={8} style={{ textAlign: 'center', margin: 'auto' }}>
                            <ShoppingOutlined style={{ fontSize: '50px', color: '#ffffff' }} />
                        </Col>
                        <Col span={16} style={{ backgroundColor: '#ffffff' }}>
                            <Statistic
                                style={{ marginLeft: '10px' }}
                                title={<span style={{ fontSize: '23px' }}>Sản phẩm bán được</span>}
                                value={totalProductAmount}
                                valueStyle={{ fontSize: '30px' }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row style={{ backgroundColor: 'red', height: '100%' }}>
                        <Col span={8} style={{ textAlign: 'center', margin: 'auto' }}>
                            <UserOutlined style={{ fontSize: '50px', color: '#ffffff' }} />
                        </Col>
                        <Col span={16} style={{ backgroundColor: '#ffffff' }}>
                            <Statistic
                                style={{ marginLeft: '10px' }}
                                title={<span style={{ fontSize: '23px' }}>Nhân viên</span>}
                                value={totalStaffsCount}
                                valueStyle={{ fontSize: '30px' }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <div style={{ margin: '15px 15px 15px 15px' }}>
                        <Card style={{ borderRadius: '20px' }}>
                            <h5>
                                <FilterFilled style={{ fontSize: '25px' }} />
                                Tháng
                                <InputNumber
                                    min={1}
                                    max={12}
                                    value={month}
                                    onChange={(newValue) => {
                                        setMonth(newValue);
                                    }}
                                >
                                </InputNumber>
                            </h5>
                            <div id="chart_column" style={{ width: '100%', height: '300px' }}></div>
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ margin: '15px 15px 15px 15px' }}>
                        <Card style={{ borderRadius: '20px' }}>
                            <div id="chart_div" style={{ width: '100%', height: '300px' }}></div>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Card style={{ margin: '0 15px 0 ' }}   >
                        {/* <Statistic title="Top 5 sản phẩm bán chạy nhất " value={totalRevenue} /> */}
                        <Statistic value={' '} title={<span style={{ fontSize: '23px' }}>Top 5 sản phẩm bán chạy nhất</span>} />
                        <Table dataSource={topProductsData} columns={columnProduct} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ margin: '0 15px 0 15px' }}>
                        <Statistic value={' '} title={<span style={{ fontSize: '23px' }}>Top 5 khách hàng mua nhiều nhất</span>} />
                        <Table dataSource={topCustomersData} columns={columnCustomer} />
                    </Card>
                </Col>
            </Row>
            <br></br>
        </div>
    );
}
export default ThongKeContent;
