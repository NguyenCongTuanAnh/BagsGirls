import { Button, Card, Col, DatePicker, InputNumber, Pagination, Popconfirm, Popover, Row, Select, Space, Spin, Statistic, Table, Typography, notification } from 'antd';
import dayjs from 'dayjs';
// import { Chart } from 'react-google-charts';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, FilterFilled, ReloadOutlined, ShoppingCartOutlined, ShoppingOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext, Fragment } from 'react';
import colorAPI from '~/api/propertitesBalo/colorAPI';
import styles from './thongKe.module.scss';
import VNDFormaterFunc from '~/Utilities/VNDFormaterFunc';

import SearchForm from '~/Utilities/FormSearch/SearchForm';
import Icon from '@ant-design/icons/lib/components/Icon';
import ThongKeAPI from '~/api/ThongKeAPI';
import { generateCustomCode } from '~/Utilities/GenerateCustomCode';
// import { Bar, Chart, Doughnut } from 'react-chartjs-2';
const { RangePicker } = DatePicker;


function ThongKeContent() {

    const [startDate, setStartDate] = useState('0001-01-01');
    const [endDate, setEndDate] = useState('9999-02-02');
    const [totalProductAmount, setTotalProductAmount] = useState(0);
    const [totalBillsCount, setTotalBillsCount] = useState(0);
    const [totalBillsCountChoXacNhan, setTotalBillsCountChoXacNhan] = useState(0);
    const [totalBillsCountDangDongGoi, setTotalBillsCountDangDongGoi] = useState(0);
    const [totalBillsCountDangGiao, setTotalBillsCountDangGiao] = useState(0);
    const [totalBillsCountThanhCong, setTotalBillsCountThanhCong] = useState(0);
    const [totalBillsFailCount, setTotalBillsFailCount] = useState(0);
    const [totalStaffsCount, setTotalStaffsCount] = useState(0);
    const [tiLeDoanhThu, setTiLeDoanhThu] = useState(1);
    const [tiLeDoanhThuCaThang, setTiLeDoanhThuCaThang] = useState(1);
    const [doanhThuCaThangTruoc, setDoanhThuCaThangTruoc] = useState(0);
    const [doanhThuThangTruoc, setDoanhThuThangTruoc] = useState(0);
    const [doanhThuThangNay, setDoanhThuThangNay] = useState(0);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [listDoanhThuTrongThang, setListDoanhThuTrongThang] = useState([]);
    const revenueData = []; // Dữ liệu doanh thu
    const [thongKeStatus, setThongKeStatus] = useState([]);
    const [topProductsData, setTopProductsData] = useState([]); // Dữ liệu top sản phẩm
    const [topCustomersData, setTopCustomersData] = useState([]); // Dữ liệu top khách hàng
    const [allProductFail, setAllProductFail] = useState(0); // Dữ liệu sản phẩm lỗi
    const [listProductFail, setListProductFail] = useState([]); // Dữ liệu sản phẩm lỗi
    const [doanhThuTrongKhoangNgay, setDoanhThuTrongKhoangNgay] = useState(0);
    // const [thangTruoc, setThangTruoc] = useState(dayjs().month);


    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
        } else {
            setStartDate('0001-01-01');
            setEndDate('9999-02-02');
        }
    };

    const viewTiLeDoanhThu = () => {
        return (
            <div >
                <h5 style={{ margin: '10px', fontWeight: 'bold' }}>Doanh thu từ ngày 1 đến ngày {dayjs().date()}: </h5>
                <ul >
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Của tháng {dayjs().subtract(1, 'month').format('MM-YYYY')}: </span>
                        <span style={{ color: 'red', fontSize: '16px' }}>{VNDFormaterFunc(doanhThuThangTruoc)} </span>
                    </li>
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Của tháng {dayjs().format('MM-YYYY')}: </span>
                        <span style={{ color: 'red', fontSize: '16px' }}>{VNDFormaterFunc(doanhThuThangNay)} </span>
                    </li>
                </ul>
            </div>
        );
    }
    const viewTiLeDoanhThuCaThang = () => {
        return (
            <div >
                <h5 style={{ margin: '10px', fontWeight: 'bold' }}>Doanh thu cả tháng: </h5>
                <ul >
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Tháng {dayjs().subtract(1, 'month').format('MM-YYYY')}: </span>
                        <span style={{ color: 'red', fontSize: '16px' }}>{VNDFormaterFunc(doanhThuCaThangTruoc)} </span>
                    </li>
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Tháng {dayjs().format('MM-YYYY')}: </span>
                        <span style={{ color: 'red', fontSize: '16px' }}>{VNDFormaterFunc(doanhThuThangNay)} </span>
                    </li>
                </ul>
            </div>
        );
    }
    const viewSoLuongHoaDon = () => {
        return (
            <div >
                <h5 style={{ margin: '10px', fontWeight: 'bold' }}>Chi tiết tổng đơn hàng: </h5>
                <ul >
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Đơn hàng chờ xác nhận:  </span>
                        <span style={{ color: 'red', fontSize: '22px' }}> {totalBillsCountChoXacNhan} </span>
                    </li>
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Đơn hàng đang đóng gói:  </span>
                        <span style={{ color: 'red', fontSize: '22px' }}> {totalBillsCountDangDongGoi} </span>
                    </li>
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Đơn hàng đang giao:  </span>
                        <span style={{ color: 'red', fontSize: '22px' }}> {totalBillsCountDangGiao} </span>
                    </li>
                    <li >
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Đơn hàng thành công:  </span>
                        <span style={{ color: 'red', fontSize: '22px' }}> {totalBillsCountThanhCong} </span>
                    </li>
                </ul>
            </div>
        );
    }

    const setTangGiamDoanhThuDenNgayHienTai = () => {
        if (tiLeDoanhThu == null) {
            return <Space></Space>;
        } else if (tiLeDoanhThu != null && tiLeDoanhThu >= 0) {
            return (
                <Space>
                    <Popover placement="top" content={viewTiLeDoanhThu()}>
                        <Typography.Text>
                            <Statistic
                                title={<span style={{ fontSize: '23px' }}>Doanh thu đến ngày hiện tại</span>}
                                value={tiLeDoanhThu}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="% doanh thu"
                            />
                        </Typography.Text>
                    </Popover>

                </Space>
            )
        } else {
            return (
                <Space>
                    <Popover placement="top" content={viewTiLeDoanhThu()}>
                        <Typography.Text>
                            <Statistic
                                title={<span style={{ fontSize: '23px' }}>Doanh thu đến ngày hiện tại</span>}
                                value={tiLeDoanhThu}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="% doanh thu"
                            />
                        </Typography.Text>
                    </Popover>

                </Space>
            )
        }
    }

    const setTangGiamDoanhThuCaThang = () => {
        if (tiLeDoanhThuCaThang == null) {
            return <Space></Space>;
        } else if (tiLeDoanhThuCaThang != null && tiLeDoanhThuCaThang >= 0) {
            return (
                <Space>
                    <Popover placement="top" content={viewTiLeDoanhThuCaThang()}>
                        <Typography.Text>
                            <Statistic
                                title={<span style={{ fontSize: '23px' }}>Doanh thu cả tháng</span>}
                                value={tiLeDoanhThuCaThang}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="% doanh thu"
                            />
                        </Typography.Text>
                    </Popover>

                </Space>
            )
        } else {
            return (
                <Space>
                    <Popover placement="top" content={viewTiLeDoanhThuCaThang()}>
                        <Typography.Text>
                            <Statistic
                                title={<span style={{ fontSize: '23px' }}>Doanh thu cả tháng</span>}
                                value={tiLeDoanhThuCaThang}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="% doanh thu"
                            />
                        </Typography.Text>
                    </Popover>

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
            setTiLeDoanhThuCaThang(data.doanhThuCaThangSoVoiThangTruoc);
            setDoanhThuCaThangTruoc(data.doanhThuCaThangTruoc);
            setDoanhThuThangTruoc(data.doanhThuThangTruoc);
            setDoanhThuThangNay(data.doanhThuThangNay);
            setTotalBillsCount(data.totalBillsCount);
            setTotalBillsCountChoXacNhan(data.totalBillsCountChoXacNhan);
            setTotalBillsCountDangDongGoi(data.totalBillsCountDangDongGoi);
            setTotalBillsCountDangGiao(data.totalBillsCountDangGiao);
            setTotalBillsCountThanhCong(data.totalBillsCountThanhCong);
            setTotalBillsFailCount(data.totalBillsFailCount);
            setTotalProductAmount(data.totalProductAmount);
            setTotalStaffsCount(data.totalStaffsCount);
            setDoanhThuTrongKhoangNgay(data.doanhThuTrongKhoangNgay);
            // drawChart();
        } catch (error) { }
    };

    const getTotalPricesByDay = async () => {
        try {
            const response = await ThongKeAPI.getTotalPricesByDay(month, year);
            const data = response.data;
            setListDoanhThuTrongThang(data);
        } catch (error) { }
    };
    const getTopFiveCustomer = async () => {
        try {
            const response = await ThongKeAPI.getTopFiveCustomer(startDate, endDate);
            const data = response.data;
            setTopCustomersData(data);
        } catch (error) { }
    };
    const getTopFiveProduct = async () => {
        try {
            // const response = await ThongKeAPI.getTopFiveProduct('0001-01-01', '9999-01-01');
            const response = await ThongKeAPI.getTopFiveProduct(startDate, endDate);
            const data = response.data;
            setTopProductsData(data);
        } catch (error) { }
    };
    const getProductsFail = async () => {
        try {
            const response = await ThongKeAPI.getProductsFail(startDate, endDate);
            const data = response.data;
            const soLuong = data.reduce((total, item) => total + item[1], 0);
            setAllProductFail(soLuong);
            setListProductFail(data);
        } catch (error) { }
    };
    const getThongKeStatus = async () => {
        try {
            const response = await ThongKeAPI.getThongKeStatus(startDate, endDate);
            const data = response.data;
            setThongKeStatus(data);
        } catch (error) { }
    };

    const bieuDoTron = () => {
        return (
            // <Bar
            //     data={{
            //         labels: [
            //             "Africa",
            //             "Asia",
            //             "Europe",
            //             "Latin America",
            //             "North America"
            //         ],
            //         datasets: [
            //             {
            //                 label: "Population (millions)",
            //                 backgroundColor: [
            //                     "#3e95cd",
            //                     "#8e5ea2",
            //                     "#3cba9f",
            //                     "#e8c3b9",
            //                     "#c45850"
            //                 ],
            //                 data: [2478, 5267, 734, 784, 433]
            //             }
            //         ]
            //     }}
            //     options={{
            //         scales: {
            //             x: {
            //                 type: 'category',
            //                 title: {
            //                     display: true,
            //                     text: 'Continent'
            //                 }
            //             },
            //             y: {
            //                 title: {
            //                     display: true,
            //                     text: 'Population (millions)'
            //                 }
            //             }
            //         },
            //         legend: { display: false },
            //         title: {
            //             display: true,
            //             text: "Predicted world population (millions) in 2050"
            //         }
            //     }}
            // />
            null
        );
    }

    // const taiAPIBieuDo = () => {
    //     const script = document.createElement('script');
    //     script.type = 'text/javascript';
    //     script.src = 'https://www.gstatic.com/charts/loader.js';
    //     script.async = true;

    //     // Set up a callback for when the script is loaded
    //     script.onload = () => {
    //         // Load the visualization library
    //         window.google.charts.load('current', { packages: ['corechart'] });

    //         // Set a callback to run when the Google Visualization API is loaded
    //         window.google.charts.setOnLoadCallback(drawChart);
    //         window.google.charts.load('current', { packages: ['corechart'] });

    //         // Set a callback to run when the Google Visualization API is loaded
    //         window.google.charts.setOnLoadCallback(drawChart);
    //     };

    //     // Append the script element to the document head
    //     document.head.appendChild(script);

    //     // Clean up the script element when the component is unmounted
    //     return () => {
    //         document.head.removeChild(script);
    //     };
    // }

    useEffect(() => {
        getTotalPricesByDay();
        getTopFiveCustomer();
        getTopFiveProduct();
        getProductsFail();
        getThongKeStatus();
        // Tải API biểu đồ Google
        // const script = document.createElement('script');
        // script.type = 'text/javascript';
        // script.src = 'https://www.gstatic.com/charts/loader.js';
        // script.async = true;

        // // Set up a callback for when the script is loaded
        // script.onload = () => {
        //     // Load the visualization library
        //     window.google.charts.load('current', { packages: ['corechart'] });

        //     // Set a callback to run when the Google Visualization API is loaded
        //     window.google.charts.setOnLoadCallback(drawChart);
        //     window.google.charts.load('current', { packages: ['corechart'] });

        //     // Set a callback to run when the Google Visualization API is loaded
        //     window.google.charts.setOnLoadCallback(drawChart);
        // };

        // // Append the script element to the document head
        // document.head.appendChild(script);

        // // Clean up the script element when the component is unmounted
        // return () => {
        //     document.head.removeChild(script);
        // };


    }, [month, year, startDate, endDate]);
    useEffect(() => {
        getBillStatisticsByDateRange();
        // taiAPIBieuDo();
    }, [startDate, endDate]);

    const stringStatus = (status) => {
        switch (status) {
            case 4:
                return "Chờ xác nhận";
            case 3:
                return "Đang đóng gói";
            case 2:
                return "Đang giao";
            case 1:
                return "Thành công";
            case -1:
                return "Đã hủy";
            default:
                return "Không xác định";
        }
    }

    const duLieuStatus = () => {
        let status = [
            ['Task', 'Hours per Day'],
            [stringStatus(1), thongKeStatus.ThanhCong],
            [stringStatus(-1), thongKeStatus.DaHuy],
            [stringStatus(4), thongKeStatus.ChoXacNhan],
            [stringStatus(3), thongKeStatus.DangDongGoi],
            [stringStatus(2), thongKeStatus.DangGiao],
        ];
        return status;
    };


    // const drawChart = () => {
    //     // biểu đồ trạng thái
    //     const data = window.google.visualization.arrayToDataTable(duLieuStatus());

    //     const options = {
    //         title: 'Thống kê trạng thái đơn hàng',
    //     };
    //     const chart = new window.google.visualization.PieChart(document.getElementById('chart_div'));
    //     chart.draw(data, options);

    //     // biểu đồ cột

    //     const dataChartColumn = new window.google.visualization.DataTable();
    //     dataChartColumn.addColumn('string', 'Ngày: ');
    //     dataChartColumn.addColumn('number', 'Doanh thu');
    //     listDoanhThuTrongThang.forEach(item => {
    //         dataChartColumn.addRow([item[0], item[1]]);
    //     });
    //     const optionsChartColumn = {
    //         title: 'Thống kê doanh thu trong tháng',
    //         pieHole: 0.4,
    //     };
    //     const chartColumn = new window.google.visualization.ColumnChart(document.getElementById('chart_column'));
    //     chartColumn.draw(dataChartColumn, optionsChartColumn);
    // };


    const columnProduct = [
        {
            key: 'index',
            dataIndex: 'index',
            title: 'Top',
            width: 70,
            render: (text, record, index) => {
                return <span id={record.id}>{index + 1}</span>;
            },
        },
        {
            title: 'Mã balo',
            dataIndex: 'productCode',
            key: 'productCode',
            render: (text, record, index) => {
                return <span>
                    {record[0].productCode}
                </span>;
            },
        },
        {
            title: 'Tên balo',
            dataIndex: 'productName',
            key: 'productName',
            render: (text, record, index) => {
                return <span>
                    {record[0].productName}
                </span>;
            },
        },

        {
            title: 'Thương hiệu',
            dataIndex: 'brandName',
            key: 'brandName',
            render: (text, record, index) => {
                return <span>
                    {record[0].brand.brandName}
                </span>;
            },
        },
        {
            title: 'Số lượng balo bán được',
            dataIndex: 'quantitySold',
            key: 'quantitySold',
            render: (text, record, index) => {
                return <span>
                    {record[1]}
                </span>;
            },
        },

    ];
    const columnCustomer = [
        {
            key: 'index',
            dataIndex: 'index',
            title: 'Top',
            width: 70,
            render: (text, record, index) => {
                return <span id={record.id}>{index + 1}</span>;
            },
        },
        {
            title: 'Tên',
            dataIndex: 'customerFullName',
            key: 'customerFullName',
        },
        {
            title: 'SĐT',
            dataIndex: 'customerPhoneNumber',
            key: 'customerPhoneNumber',
        },
        {
            title: 'Tổng tiền đã mua',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index) => {
                return <span> {VNDFormaterFunc(record.price)}</span>;
            },
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
                            {setTangGiamDoanhThuDenNgayHienTai()}
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row style={{ backgroundColor: '#2d73d4', height: '100%' }}>
                        <Col span={8} style={{ textAlign: 'center', margin: 'auto' }}>
                            <ShoppingCartOutlined style={{ fontSize: '60px', color: '#ffffff' }} />
                        </Col>
                        <Col span={16} style={{ backgroundColor: '#ffffff' }}>
                            <Space>
                                <Popover placement="top" content={viewSoLuongHoaDon()}>
                                    <Typography.Text>
                                        <Statistic
                                            style={{ marginLeft: '10px' }}
                                            title={<span style={{ fontSize: '23px' }}>Tổng đơn hàng</span>}
                                            value={totalBillsCount}
                                            valueStyle={{ fontSize: '30px' }}
                                        />
                                    </Typography.Text>
                                </Popover>

                            </Space>

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
                    <Row style={{ backgroundColor: 'orange', height: '100%' }}>
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

            <Row gutter={24} style={{ marginTop: '15px', marginLeft: '5px' }}>
                <Col span={6} >
                    <Row style={{ backgroundColor: '#ffffff', height: '100%' }}>
                        <Col span={24} style={{ margin: '0 10px 10px 10px' }}>
                            {setTangGiamDoanhThuCaThang()}
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row style={{ backgroundColor: 'red', height: '100%' }}>
                        <Col span={8} style={{ textAlign: 'center', margin: 'auto' }}>
                            <ShoppingCartOutlined style={{ fontSize: '60px', color: '#ffffff' }} />
                        </Col>
                        <Col span={16} style={{ backgroundColor: '#ffffff' }}>
                            <Statistic
                                style={{ marginLeft: '10px' }}
                                title={<span style={{ fontSize: '23px' }}>Tổng đơn hàng đã hủy</span>}
                                value={totalBillsFailCount}
                                valueStyle={{ fontSize: '30px' }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row style={{ backgroundColor: 'red', height: '100%' }}>
                        <Col span={8} style={{ textAlign: 'center', margin: 'auto' }}>
                            <ShoppingOutlined style={{ fontSize: '50px', color: '#ffffff' }} />
                        </Col>
                        <Col span={16} style={{ backgroundColor: '#ffffff' }}>
                            <Statistic
                                style={{ marginLeft: '10px' }}
                                title={<span style={{ fontSize: '23px' }}>Tổng sản phẩm lỗi</span>}
                                value={allProductFail}
                                valueStyle={{ fontSize: '30px' }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Statistic
                        style={{ marginLeft: '10px' }}
                        title={<span style={{ fontSize: '23px' }}>Doanh thu</span>}
                        value={VNDFormaterFunc(doanhThuTrongKhoangNgay)}
                        valueStyle={{ fontSize: '30px', color: '#3f8600' }}

                    />
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <div style={{ margin: '15px 15px 15px 15px' }}>
                        <Card style={{ borderRadius: '20px' }}>
                            <Row>
                                <Col span={3}>
                                    <FilterFilled style={{ fontSize: '25px' }} />
                                    <InputNumber
                                        min={1}
                                        max={12}
                                        value={month}
                                        placeholder='Tháng'
                                        onChange={(newValue) => {
                                            setMonth(newValue);
                                        }}
                                    />
                                </Col>
                                <Col span={3}>
                                    <InputNumber
                                        placeholder='Năm'
                                        min={2000}
                                        max={2023}
                                        value={year}
                                        onChange={(newValue) => {
                                            setYear(newValue);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <span>
                                {bieuDoTron()}
                            </span>
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ margin: '15px 15px 15px 15px' }}>
                        {/* <DoughnutController
                            data={{
                                labels: [
                                    "Africa",
                                    "Asia",
                                    "Europe",
                                    "Latin America",
                                    "North America"
                                ],
                                datasets: [
                                    {
                                        label: "Population (millions)",
                                        backgroundColor: [
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850"
                                        ],
                                        data: [2478, 5267, 734, 784, 433]
                                    }
                                ]
                            }}
                            option={{
                                title: {
                                    display: true,
                                    text: "Predicted world population (millions) in 2050"
                                }
                            }}
                        /> */}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <Card style={{ margin: '0 15px 0 ' }}   >
                        <Statistic value={' '} title={<span style={{ fontSize: '23px' }}>Top 5 sản phẩm có số lượng bán nhiều nhất </span>} />
                        <Table
                            dataSource={topProductsData}
                            columns={columnProduct}
                            rowKey={(record) => record[0].productId}
                            pagination={false}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ margin: '0 15px 0 15px' }}>
                        <Statistic value={' '} title={<span style={{ fontSize: '23px' }}>Top 5 khách hàng mua nhiều nhất </span>} />
                        <Table
                            dataSource={topCustomersData}
                            rowKey={(record) => record.customerId}
                            columns={columnCustomer}
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>
            <br></br>
        </div>
    );
}
export default ThongKeContent;
