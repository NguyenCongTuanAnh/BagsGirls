package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.dto.BillsDTO;
import fpoly.datn.ecommerce_website.dto.BillsQDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.Bills;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bills, String> {

//    @Query(value = "SELECT b FROM Bills b WHERE " +
//            " (b.billCode LIKE %:search% " +
//            " OR b.orderPhone LIKE %:search% " +
//            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
//            " OR b.receiverName LIKE %:search% " +
//            " OR :search IS NULL ) " +
//            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
//            " AND b.staff IS NOT NULL " +
//            " AND b.staff.users.fullName LIKE %:filterStaffName% "
//            )
//    Page<Bills> findAllBillOffNotSearch(
//            @Param("startDate") Date startDate,
//            @Param("endDate") Date endDate,
//            @Param("search") String search,
//            @Param("filterStaffName") String filterStaffName,
//            Pageable pageable);

//    @Query(value = "SELECT b FROM Bills b WHERE" +
//            " ( :status IS NULL OR b.billStatus = :status ) " +
//            " AND (b.billCode LIKE %:search% " +
//            " OR b.orderPhone LIKE %:search% " +
//            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
//            " OR b.receiverName LIKE %:search% " +
//            " OR %:search% IS NULL ) " +
//            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
//            " AND b.staff IS NOT NULL " +
//            " AND b.staff.users.fullName LIKE %:filterStaffName% "
//            )
//    Page<Bills> findAllBillOffStatusNotSearch(
//            @Param("startDate") Date startDate,
//            @Param("endDate") Date endDate,
//            @Param("status") Integer status,
//            @Param("search") String search,
//            @Param("filterStaffName") String filterStaffName,
//            Pageable pageable);
//            "  (b.customer IS NULL OR b.customer IS NOT NULL) " +
//            " AND (b.staff IS NULL OR b.staff IS NOT NULL) " +
//            " AND (b.billCode LIKE %:search% " +
//            " OR b.orderPhone LIKE %:search% " +
//            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
//            " OR b.receiverName LIKE %:search% " +
//            " OR (b.customer IS NOT NULL AND b.customer.users.fullName LIKE %:search%) " +
//            " OR (b.customer IS NOT NULL AND b.customer.users.phoneNumber LIKE %:search%) " +

    @Query(value = "SELECT b FROM Bills b " +
//            " join Staffs s on b.staff.staffId = s.staffId " +
//            " join Customers c on b.customer.customerId = c.customerId " +
            " WHERE ( :status IS NULL OR b.billStatus = :status ) " +
            " AND ( b.billCreateDate BETWEEN :startDate AND :endDate ) " +
            " AND ( :billCode IS NULL OR b.billCode like %:billCode% ) " 
//            " AND ( :search IS NULL OR b.billCode like %:search% ) "
//            " OR b.orderPhone LIKE %:search% " +
//            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
//            " OR b.receiverName LIKE %:search% ) "
//            " AND ( :search IS NULL OR b.receiverName LIKE %:search% ) " +
//            " AND ( :filterStaffName IS NULL OR b.orderPhone LIKE %:filterStaffName% ) "
    )
    Page<Bills> findAllBillsOffline(
            @Param("status") Integer status,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("billCode") String billCode,
//            @Param("filterStaffName") String filterStaffName,
            Pageable pageable);




    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.staff IS NULL "
             )
    Page<Bills> findAllBillsBySearchStatus(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);


    List<Bills> findByBillCreateDateBetween(Date startDate, Date endDate);

    @Query("SELECT COALESCE(SUM(b.billTotalPrice), 0) FROM Bills b WHERE CAST(b.billCreateDate AS date) = CAST(:date AS date)")
    BigDecimal calculateTotalSalesForDate(@Param("date") LocalDate date);


//    @Query(value = " SELECT b FROM Bills b  WHERE b.billStatus = :status " +
//            " AND ( b.billCode LIKE %:search% " +
//            " OR b.orderPhone LIKE %:search% " +
//            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
//            " OR b.receiverName LIKE %:search% " +
//            " OR b.customer IS NULL " +
//            " OR (b.customer IS NOT NULL AND b.customer.users.fullName LIKE %:search%) " +
//            " OR (b.customer IS NOT NULL AND b.customer.users.phoneNumber LIKE %:search%) " +
//            " OR :search IS NULL ) " +
//            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
//            " AND b.staff IS NOT NULL " +
//            " AND b.staff.users.fullName LIKE %:filterStaffName% "
//             )
//    Page<Bills> findAllBillsOfflineStatus(
//            @Param("startDate") Date startDate,
//            @Param("endDate") Date endDate,
//            @Param("status") Integer status,
//            @Param("search") String search,
//            @Param("filterStaffName") String filterStaffName,
//            Pageable pageable);



//    @Query(value = "SELECT b FROM Bills b WHERE " +
//            " (b.billCode LIKE %:search% " +
//            " OR b.orderPhone LIKE %:search% " +
//            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
//            " OR b.receiverName LIKE %:search% " +
//            " OR :search IS NULL ) " +
//            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
//            " AND b.staff IS NULL "
//             )
//    Page<Bills> findAllBillsBySearch(
//            @Param("startDate") Date startDate,
//            @Param("endDate") Date endDate,
//            @Param("search") String search,
//            Pageable pageable);
}
