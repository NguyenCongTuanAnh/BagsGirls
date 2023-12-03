import axiosClient from './axiosClient';

const MaillingAPI = {
  notificationCreateCustomer(data) {
    const url = '/send-mail';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default MaillingAPI;
