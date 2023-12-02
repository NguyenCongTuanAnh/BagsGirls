import { Button, Input, Pagination, Popconfirm, Space, Spin, Table, notification } from 'antd';
import { useEffect, useState, useContext, useRef } from 'react';
import FormProductEdit from '../../ProductEdit/FormEdit/FormProductEdit';
import FormProductViewDetails from '../../ProductViewDetails/FormViewer/FormProductViewDetails';
import Highlighter from 'react-highlight-words';
import baloAPI from '~/api/productsAPI';
import pdfMake from 'pdfmake/build/pdfmake';

import styles from './index.module.scss';
import { DeleteOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function TableContent() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesSize, setPagesSize] = useState(10);
  const [totalItem, setTotalItem] = useState();
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex, name) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    // onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilter: (value, record) => {
      const filteredData = name ? record[dataIndex][name] : record[dataIndex];
      return filteredData?.toString().toLowerCase().includes(value.toLowerCase());
    },

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleTableChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 40,
      render: (text, record, index) => <span>{(currentPage - 1) * pagesSize + index + 1}</span>,
    },
    {
      title: 'Mã Balo',
      dataIndex: 'productCode',
      width: 85,

      sorter: (a, b) => a.productCode.localeCompare(b.productCode),
      ...getColumnSearchProps('productCode'),
    },
    {
      title: 'Tên Balo',
      dataIndex: 'productName',
      width: 270,
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      ...getColumnSearchProps('productName'),
    },
    {
      title: 'Thương Hiệu',
      dataIndex: ['brand', 'brandName'],
      width: 80,
      sorter: (a, b) => a.brand.brandName.localeCompare(b.brand.brandName),
      ...getColumnSearchProps('brand', 'brandName'),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'productStatus',
      width: 80,
      render: (status) => {
        switch (status) {
          case 1:
            return 'Hoạt động';
          case 0:
            return 'Không hoạt động';
          case -1:
            return 'Trạng thái khác';
          default:
            return 'Không xác định';
        }
      },
      sorter: (a, b) => a.productStatus - b.productStatus,
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <FormProductViewDetails product={record} handleRefresh={reload} brand={record.brand} />
          <FormProductEdit product={record} brand={record.brand} handleRefresh={reload} />
          <Popconfirm
            title="Xác Nhận"
            description="Bạn Có chắc chắn muốn xóa?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              handleDeleteBalo(record.productId, -1);
              reload();
            }}
            onCancel={onCancel}
          >
            <Button type="default" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const onCancel = () => {};
  const reload = () => {
    console.log('====================================');
    console.log('ĐÃ Làm MỚI');
    console.log('====================================');
    setLoading(true);
    getAllBalo(currentPage, pagesSize);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    handleLoading();
    getAllBalo(currentPage, pagesSize);
  }, [currentPage]);

  const getAllBalo = async (pageNum, pageSize) => {
    try {
      const response = await baloAPI.getAll(pageNum, pageSize);
      const data = response.data.content;
      setTotalItem(response.data.totalElements);
      setProductList(data);
      console.log(data);
      setTimeout(() => {}, 500);
    } catch (error) {
      console.error('Đã xảy ra lỗi: ', error);
    }
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleDeleteBalo = async (id, status) => {
    try {
      await baloAPI.updateStatus(id, status);
      notification.info({
        message: 'Xóa thành Công',
        description: 'Sản Phẩm Có ID: ' + id + ' đã được xóa thành công!!!',
        duration: 2,
      });
      getAllBalo(currentPage, pagesSize);
    } catch (error) {
      console.error('Đã xảy ra lỗi khi xóa sản phẩm: ', error);
    }
  };
  const onHandleSizeChange = (current, pageSize) => {
    setCurrentPage(1);
    setPagesSize(pageSize);
    getAllBalo(current, pageSize);
    handleLoading();
  };
  const onHandlePageNum = (current, pageSize) => {
    setCurrentPage(current);
    setPagesSize(pageSize);
    getAllBalo(current, pageSize);
    handleLoading();
  };

  const handlePrint = () => {
    let newList = [];
    // let columnsName = [];
    productList.forEach((item) => {
      newList.push({
        productId: item.productId,
        productCode: item.productCode,
        productName: item.productName,
        brand: item.brand,
        productStatus: item.productStatus,
      });
    });
    // let columnsName = columns.map((e) => {
    //   const { key, title, dataIndex, width, render } = e;
    //   var listTemp = {
    //     key: key,
    //     title: title,
    //     dataIndex: dataIndex,
    //     width: width,
    //     render: render.toString(),
    //   };
    //   // listTemp.push({
    //   //   key: e.key,
    //   //   title: e.title,
    //   //   dataIndex: e.dataIndex,
    //   //   width: e.width,
    //   //   render: e.width,
    //   // });

    //   return listTemp;
    // });
    console.log(columns);
    localStorage.setItem('printList', JSON.stringify(newList));
    localStorage.setItem('columnsName', JSON.stringify(columns));
    window.open('/print-table', '_blank');
  };
  const ProductSCVData = [
    ['ID', 'Mã Balo', 'Tên Balo', 'Thương Hiệu', 'Trạng Thái'], // Header của file CSV
    ...productList.map((product) => [
      product.productId,
      product.productCode,
      product.productName,
      product.brand.brandName,
      product.productStatus,
    ]), // Dữ liệu sản phẩm
  ];
  const generatePDF = () => {
    const tableColumn = ['ID', 'Mã Balo', 'Tên Balo', 'Thương Hiệu', 'Trạng Thái'];
    const tableRows = [['ID', 'Mã Balo', 'Tên Balo', 'Thương Hiệu', 'Trạng Thái']];

    productList.forEach((product) => {
      let statusText = '';
      if (product.productStatus === 1) {
        statusText = 'Còn Hàng';
      } else if (product.productStatus === 2) {
        statusText = 'Hết Hàng';
      } else if (product.productStatus === 3) {
        statusText = 'Đã Ngừng Sản Xuất';
      } else {
        statusText = 'Trạng Thái Không Xác Định';
      }
      const productData = [
        product.productId,
        product.productCode,
        product.productName,
        product.brand.brandName,
        statusText,
      ];
      tableRows.push(productData);
    });
    const currentTime = new Date();
    const docDefinition = {
      content: [
        {
          text: 'Danh sách sản phẩm',
          fontSize: 20,
          bold: true,
          alignment: 'center', // Thêm alignment để căn giữa
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Thời Gian: ' + currentTime,
          fontSize: 10,
          bold: false,
        },
        {
          table: {
            headerRows: 1,
            widths: [90, 90, 120, 70, 90],
            body: tableRows.map((row) => row.map((cell) => ({ text: cell, alignment: 'center' }))),
            // body: tableRows,
          },
        },
      ],
    };

    const pdfDoc = pdfMake.createPdf(docDefinition); // Create the PDF
    pdfDoc.download(`danh_sach_san_pham-trang_${currentPage}.pdf`); // Initiate the download
  };

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <Button icon={<ReloadOutlined />} onClick={reload} loading={loading}>
        Làm mới
      </Button>
      <div>
        <Button type="Button" onClick={handlePrint} style={{ backgroundColor: 'gray', color: 'white' }}>
          Print
        </Button>
        <Button type="Button" onClick={() => {}} style={{ backgroundColor: 'gray', color: 'white' }}>
          Copy
        </Button>
        <Button type="Button" onClick={() => {}} style={{ backgroundColor: 'gray', color: 'white' }}>
          Excel
        </Button>
        <Button type="Button" onClick={() => {}} style={{ backgroundColor: 'gray', color: 'white' }}>
          <CSVLink data={ProductSCVData} filename={`danh_sach_san_pham-trang_${currentPage}.csv`}>
            CSV
          </CSVLink>
        </Button>
        <Button type="Button" onClick={generatePDF} style={{ backgroundColor: 'gray', color: 'white' }}>
          PDF
        </Button>
      </div>
      <Table
        id="table"
        className="table table-striped"
        scroll={{
          x: 1000,
          y: 670,
        }}
        loading={loading}
        rowKey={(record) => record.productId}
        columns={columns}
        dataSource={productList}
        onChange={handleTableChange}
        pagination={false}
      />
      <div>
        <Pagination
          className={styles.pagination}
          showSizeChanger
          pageSizeOptions={['10', '20', '30', '100']}
          onShowSizeChange={onHandleSizeChange}
          onChange={onHandlePageNum}
          defaultCurrent={1}
          total={totalItem}
        />
      </div>
    </div>
  );
}
export default TableContent;
