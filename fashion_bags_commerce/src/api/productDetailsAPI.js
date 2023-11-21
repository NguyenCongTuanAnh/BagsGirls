import axiosClient from './axiosClient';

const productDetailsAPI = {
  getAll(params) {
    const url = 'api/product-details/';
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `api/product-details?id=${id}`;
    return axiosClient.get(url);
  },
  getAllByProductId(productId) {
    const url = `api/product-detail/${productId}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `api/product-details`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  update(data) {
    const url = `api/product-details?id=${data.id}`;
    return axiosClient.put(url, data);
  },
  delete(id) {
    const url = `api/product-details?id=${id}`;
    return axiosClient.delete(url);
  },
  findByKeywork(keyword) {
    const url = `api/product-details/search?keyword=${keyword}`;
    return axiosClient.get(url, { keyword });
  },
};

export default productDetailsAPI;