import axiosClient from './axiosClient';

const ThongKeAPI = {

    getBillStatisticsByDateRange(startDate, endDate) {
        const url = 'api/thong-ke/amount-bill-amount-product';
        return axiosClient.get(url, {
            params: {
                startDate: startDate,
                endDate: endDate,
            },
        });
    },
    getTotalPricesByDay(month, year) {
        const url = 'api/thong-ke/total-prices-by-day';
        return axiosClient.get(url, {
            params: {
                month: month,
                year: year,
            },
        });
    },

};

export default ThongKeAPI;
