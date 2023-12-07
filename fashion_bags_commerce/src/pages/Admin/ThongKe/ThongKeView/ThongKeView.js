import { Button, Card, Col, DatePicker, Pagination, Popconfirm, Row, Select, Space, Spin, Statistic, Table, notification } from 'antd';
import dayjs from 'dayjs';
import { Chart } from 'react-google-charts';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, FilterFilled, ReloadOutlined, ShoppingCartOutlined, ShoppingOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext, Fragment } from 'react';
import colorAPI from '~/api/propertitesBalo/colorAPI';
import styles from './thongKe.module.scss';
import SearchForm from '~/Utilities/FormSearch/SearchForm';
import Icon from '@ant-design/icons/lib/components/Icon';
const { RangePicker } = DatePicker;


function ThongKeContent() {
    const [data, setData] = useState([]);
    const [totalItem, setTotalItem] = useState();
    const [loading, setLoading] = useState(true);
    const [PageNum, setPageNum] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [status, setStatus] = useState('0');
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tiLeDoanhThu, setTiLeDoanhThu] = useState(1);
    const revenueData = []; // Dữ liệu doanh thu
    const topProductsData = []; // Dữ liệu top sản phẩm
    const topCustomersData = []; // Dữ liệu top khách hàng
    const totalRevenue = 1000000; // Tổng doanh thu
    const totalExpenses = 500000; // Tổng chi
    const totalOrders = 50; // Tổng số lượng hóa đơn

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
            setPageNum(1);
        } else {
            setStartDate('0001-01-01');
            setEndDate('9999-02-02');
            setPageNum(1);
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
                        value={-tiLeDoanhThu}
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
            value: [dayjs().add(-7, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
        },
        {
            label: '7 ngày qua',
            value: [dayjs().add(-7, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
        },
        {
            label: '14 ngày qua',
            value: [dayjs().add(-14, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
        },
        {
            label: '30 ngày qua',
            value: [dayjs().add(-30, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
        },
        {
            label: '90 ngày qua',
            value: [dayjs().add(-90, 'd').add(7, 'h'), dayjs().add(1, 'd').add(7, 'h')],
        },
    ];

    const handleSearchChange = (newFilter) => {
        if (newFilter === undefined || newFilter.trim().length === 0) {
            setSearch('');
            setLoading(true);
            setPageNum(1);
        } else {
            setSearch(newFilter.trim());
            setLoading(true);
            setPageNum(1);
        }
    };

    const onChangeBill = (e) => {
        setStatus(e);
        setPageNum(1);
    };
    const onChangePage = (current, pageSize) => {
        setPageNum(current);
        setPageSize(pageSize);
        setLoading(true);
    };

    // Tính toán phần trăm tăng giảm doanh thu so với tháng trước
    const calculateRevenueChange = () => {
        // Thực hiện tính toán dựa trên dữ liệu doanh thu


        return 10; // Phần trăm tăng giảm doanh thu so với tháng trước
    };

    const [revenueChange, setRevenueChange] = useState(0);

    useEffect(() => {
        setRevenueChange(calculateRevenueChange());
        // Tải API biểu đồ Google
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
            // Load the visualization library
            window.google.charts.load('current', { packages: ['corechart'] });
            // Set a callback to run when the Google Visualization API is loaded
            window.google.charts.setOnLoadCallback(drawChart);
        };
        document.head.appendChild(script);
    }, []);
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

        const dataChartColumn = window.google.visualization.arrayToDataTable([
            ['Ngày', 'Doanh thu'],
            ['Ngày 1', 400050000],
            ['Ngày 2', 50000000],
            ['Ngày 3', 19900000],
            ['Ngày 4', 20000000],
            ['Ngày 5', 45674565],
        ]);
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
            <Card style={{ marginTop: '15px', marginLeft: '1%', height: '95%', width: '98%', border: '30px' }}>
                <Row>
                    <Col span={10}>
                        <div style={{ fontSize: '16px' }}>
                            <FilterFilled style={{ fontSize: '30px' }} />
                            <span style={{ fontWeight: 700, fontSize: '24px' }}>  Khoảng ngày:  </span>
                            <RangePicker className={styles.filter_inputSearch} presets={rangePresets} onChange={onRangeChange} />
                        </div>
                    </Col>
                </Row>
            </Card>
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
                                value={revenueChange}
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
                                value={revenueChange}
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
                                value={revenueChange}
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
