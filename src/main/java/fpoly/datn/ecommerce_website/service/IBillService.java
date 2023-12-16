package fpoly.datn.ecommerce_website.service;

import fpoly.datn.ecommerce_website.dto.BillsDTO;
import fpoly.datn.ecommerce_website.dto.BillsQDTO;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.infrastructure.constant.Ranking;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;


public interface IBillService {
    List<BillsDTO> getAll();

    Page<BillsDTO> getPagination(int pageNum, int pageSize);

    Page<BillsDTO> getAllBillsOnline(String customerPhoneNumber, String customerRanking, Date startDate, Date endDate, Integer status, String search, int pageNum, int pageSize, List<String> sortList,
                                     String sortOrder);

    Page<BillsDTO> getAllBillsOffline(
            String seacrh,
            Integer status,
            Date startDate,
            Date endDate,
            int pageNum,
            int pageSize,
            List<String> sortList,
            String sortOrder
    );
    Page<BillsDTO> getAllBillsOfflineOfStaff(
            String seacrh,
            Integer status,
            Date startDate,
            Date endDate,
            String staffId,
            int pageNum,
            int pageSize,
            List<String> sortList,
            String sortOrder
    );
    Page<BillsDTO> getAllBillsOfflineOfStaffOfCustomer(
            String seacrh,
            Integer status,
            Date startDate,
            Date endDate,
            String staffId,
            Ranking customerRanking,
            int pageNum,
            int pageSize,
            List<String> sortList,
            String sortOrder
    );

    Page<BillsDTO> getAllBillsOfflineOfCustomer(
            String seacrh,
            Integer status,
            Date startDate,
            Date endDate,
            int pageNum,
            int pageSize,
            List<String> sortList,
            String sortOrder
    );


    Bills updateStatus(String id, Integer status);

    BillsDTO save(BillsDTO billsDTO);

    BillsDTO getOne(String id);

    BillsDTO update(BillsDTO billsDTO);

    Boolean delete(String id);

    BigDecimal calculateTotalSalesByTimePeriod(Date startDate, Date endDate);

    Map<LocalDate, BigDecimal> getSalesForLast30Days();
}
