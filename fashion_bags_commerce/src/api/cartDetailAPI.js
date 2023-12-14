import axiosClient from './axiosClient';

const cartDetailAPI = {
  getAll() {
    const url = 'api/cart-detail/';
    return axiosClient.get(url);
  },


    save(data) {
        const url = `api/cart-detail`;
        return axiosClient.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },


}

export default cartDetailAPI;
