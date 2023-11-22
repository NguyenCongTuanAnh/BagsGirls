import axiosClient from '../axiosClient';

const fullProductAPI = {
  getAll() {
    const url = 'api/all-products/';
    return axiosClient.get(url, {});
  },
  findById(id) {
    const url = `api/detail-product/${id}`;
    return axiosClient.get(url);
  },
};

export default fullProductAPI;
