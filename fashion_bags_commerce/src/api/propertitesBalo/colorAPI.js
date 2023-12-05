import axiosClient from '../axiosClient';

const colorAPI = {
  getAllPagination(pageNum, pageSize) {
    const url = 'api/color/pagination';
    return axiosClient.get(url, {
      params: {
        page: pageNum -1,
        size: pageSize,
      },
    });
  },
  getAll() {
    const url = 'api/color/';
    return axiosClient.get(url);
  },
  get(id) {
    const url = `api/color?id=${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `api/color`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(id, data) {
    const url = `api/color?id=${id}`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  updateStatus(id, status) {
    const url = `api/color/update-status?id=${id}&status=${status}`;
    return axiosClient.put(url, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(id) {
    const url = `api/color?id=${id}`;
    return axiosClient.delete(url);
  },
};

export default colorAPI;
