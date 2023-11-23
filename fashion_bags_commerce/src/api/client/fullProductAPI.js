import axiosClient from '../axiosClient';

const fullProductAPI = {
  // getAll() {
  //   const url = 'api/all-products/';
  //   return axiosClient.get(url, {});
  // },
  getAll() {
    const url = 'api/products/getall';
    return axiosClient.get(url, {});
  },
  findById(id) {
    const url = `api/detail-product/${id}`;
    return axiosClient.get(url);
  },

  searchByKeyword(keyword) {
    const url = 'api/products/search';
    return axiosClient.get(url, {
      params: {
        keyword: keyword,
      },
    });
  },
};

export default fullProductAPI;
