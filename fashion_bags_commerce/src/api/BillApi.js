import axiosClient from './axiosClient';

const billsAPI = {
  getAll(pageNum, pageSize) {
    const url = 'api/bills/';
    return axiosClient.get(url, {
      params: {
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },
  getAllSearchPagination(filterStaffName, startDate, endDate, status, search, pageNum, pageSize) {
    const url = 'api/bills/pagination';
    return axiosClient.get(url, {
      params: {
        filterStaffName: filterStaffName,
        startDate: startDate,
        endDate: endDate,
        search: search,
        status: status,
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },
  get(id) {
    const url = `api/bills?id=${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `api/bills`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(data) {
    const url = `api/bills?id=${data.id}`;
    return axiosClient.put(url, data);
  },
  updateStatus(billsID, status) {
    const url = `api/bills/update-status?billsID=${billsID}&status=${status}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(id) {
    const url = `api/bills?id=${id}`;
    return axiosClient.delete(url);
  },
};

export default billsAPI;
