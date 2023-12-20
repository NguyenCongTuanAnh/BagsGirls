package fpoly.datn.ecommerce_website.service;

import fpoly.datn.ecommerce_website.dto.TopCustomersDTO;
import fpoly.datn.ecommerce_website.dto.TopProductsDTO;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.entity.Staffs;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IThongKeService {

    List<Bills> getBillsByDateRange(Date startDate, Date endDate);
        int sumProductAmountByDateRange(Date startDate, Date endDate);

    List<Staffs> getAllStaffs() ;
        int countStaffs() ;

    BigDecimal calculateTotalPriceThisMonth();

    BigDecimal calculateTotalPriceLastMonth();

    // biểu đồ cột
    List<Object[]> findTotalPricesByDay(String month, String year);

    List<TopCustomersDTO> getTopCustomersByTotalPrice(Date startDate, Date endDate);

    List<TopProductsDTO> findTopProductsByTotalAmount();

     List<Object[]> findTopProductsSold(Date startDate, Date endDate);

     Map<String, Double> findByBillCreateDateBetween(Date startDate, Date endDate);






    }
