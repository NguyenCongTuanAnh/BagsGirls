import axiosClient from './axiosClient';

const customerAPI = {
  getAll(pageNum, pageSize) {
    const url = 'api/customer/pagination';
    return axiosClient.get(url, {
      params: {
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },
  getSearchPagination(
    key,
    status,
    gender,
    ranking,
    pageNum,
    pageSize,
    sortList,
    sortOrder,
    sortListPlaceHolder
  ) {
    const url = 'api/customer/search';
    return axiosClient.get(url, {
      params: {
        keyword: key,
        status: status,
        gender: gender,
        ranking: ranking,
        sortList: sortList,
        sortOrder: sortOrder,
        sortListPlaceHolder: sortListPlaceHolder,
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },

  get(id) {
    const url = `api/customer?id=${id}`;
    return axiosClient.get(url);
  },
  findByEmail(email) {
    const url = `api/customer/findByEmail?email=${email}`;
    return axiosClient.get(url);
  },
  findByPhoneNumber(phoneNumber) {
    const url = `api/customer/findByPhoneNumber?phoneNumber=${phoneNumber}`;
    return axiosClient.get(url);
  },
  getOne(id) {
    const url = `api/customer?customerId=${id}`;
    return axiosClient.get(url, { id });
  },
  add(data) {
    const url = `api/customer`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(data) {
    const url = `api/customer`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  updateStatus(id, status) {
    const url = `api/customer/update-status?id=${id}&status=${status}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  updatePassword(customerId, password) {
    const url = `api/customer/forget-password?customerId=${customerId}&password=${password}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(id) {
    const url = `api/customer?id=${id}`;
    return axiosClient.delete(url);
  },
  findByKeywork(keyword) {
    const url = `api/customer/searchByKeyword?keyword=${keyword}`;
    return axiosClient.get(url, { keyword });
  },
  findByUserId(userId) {
    const url = `api/customer/findByUserId?userId=${userId}`;
    return axiosClient.get(url);
  },
  updatePoint(customerID, totalPrice) {
    const url = `api/customer/updatePoint?customerId=${customerID}&totalPrice=${totalPrice}`;
    return axiosClient.put(url);
  },
};

export default customerAPI;
