import axiosClient from './axiosClient';

const staffAPI = {
  getAll(pageNum, pageSize) {
    const url = 'api/staff/pagination';
    return axiosClient.get(url, {
      params: {
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },

  getAllStaff() {
    const url = 'api/staff/';
    return axiosClient.get(url, {

    });
  },

  getSearchPagination(key, pageNum, pageSize) {
    const url = 'api/staff/search';
    return axiosClient.get(url, {
      params: {
        keyword: key,
        page: pageNum - 1,
        size: pageSize,
      },
    });
  },

  getRoles(params) {
    const url = 'api/role/';
    return axiosClient.get(url, { params });
  },
  get(id, data) {
    const url = `api/staff?id=${id}`;
    return axiosClient.get(url, data);
  },
  getOne(id, data) {
    const url = `api/staff?id=${id}`;
    return axiosClient.get(url, data);
  },
  add(data) {
    const url = `api/staff`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(id, data) {
    const url = `api/staff?id=${id}`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  updateStatus(id, status) {
    const url = `api/staff/update-status?id=${id}&status=${status}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(id) {
    const url = `api/staff?id=${id}`;
    return axiosClient.delete(url);
  },
  findByUserId(userId) {
    const url = `api/staff/findByUserId?userId=${userId}`;
    return axiosClient.get(url);
  },
};

export default staffAPI;
