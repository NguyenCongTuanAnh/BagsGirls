import axiosClient from './axiosClient';

const cartAPI = {
    getAll(pageNum, pageSize) {
      const url = '/api/cart/pagination';
      return axiosClient.get(url, {
        params: {
          page: pageNum - 1,
          size: pageSize,
        },
      });
    },


    save(data) {
        const url = `api/cart`;
        return axiosClient.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },


}

export default cartAPI;
