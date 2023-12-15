import axiosClient from './axiosClient';

const billDetailsAPI = {
  getAll(pageNum, pageSize) {
    const url = 'api/bill-details/';
    return axiosClient.get(url, {
      params: {
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },
  get(id) {
    const url = `api/billDetails?id=${id}`;
    return axiosClient.get(url);
  },
  getAllByBillId(billId, status) {
    const url = `api/bill-detail/getBillDetailsByBillId?billId=${billId}&status=${status}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `api/bill-details`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(data) {
    const url = `api/billDetails?id=${data.id}`;
    return axiosClient.put(url, data);
  },
  updateAmountProductDetail(billDetailId, amount) {
    const url = `api/bill-detail/update-amount-product-detail?billDetailId=${billDetailId}&amount=${amount}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  updateStatus(billDetailsID, status) {
    const url = `api/billDetails/update-status?billDetailsID=${billDetailsID}&status=${status}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(id) {
    const url = `api/billDetails?id=${id}`;
    return axiosClient.delete(url);
  },
};

export default billDetailsAPI;
