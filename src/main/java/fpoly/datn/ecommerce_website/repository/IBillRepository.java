package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.dto.BillsDTO;
import fpoly.datn.ecommerce_website.dto.BillsQDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.infrastructure.constant.Ranking;
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

    // Tất cả hóa đơn
    @Query(value = "SELECT b FROM Bills b " +
            " WHERE ( :status IS NULL OR b.billStatus = :status ) " +
            " AND ( b.billCreateDate BETWEEN :startDate AND :endDate ) " +
            " AND ( :search IS NULL OR b.billCode like %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% ) "
    )
    Page<Bills> findAllBillsOffline(
            @Param("search") String search,
            @Param("status") Integer status,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);

    // Tất cả hóa đơn với trường hợp có nhân viên
    @Query(value = "SELECT b FROM Bills b " +
            " WHERE ( :status IS NULL OR b.billStatus = :status ) " +
            " AND ( b.billCreateDate BETWEEN :startDate AND :endDate ) " +
            " AND ( :search IS NULL OR b.billCode like %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR b.staff.staffCode LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% ) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode like %:staffCode% ) "
    )
    Page<Bills> findAllBillsOfflineOfStaff(
            @Param("search") String search,
            @Param("status") Integer status,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("staffCode") String staffCode,
            Pageable pageable);

//     Tất cả hóa đơn với trường hợp có nhân viên và có khách hàng
    @Query(value = "SELECT b FROM Bills b " +
            " WHERE ( :status IS NULL OR b.billStatus = :status ) " +
            " AND ( b.billCreateDate BETWEEN :startDate AND :endDate ) " +
            " AND ( :search IS NULL OR b.billCode like %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR b.customer.customerCode LIKE %:search% " +
            " OR b.customer.users.phoneNumber LIKE %:search% " +
            " OR b.customer.users.email LIKE %:search% " +
            " OR b.staff.staffCode LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% ) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode like %:staffCode% ) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) "
    )
    Page<Bills> findAllBillsOfflineOfStaffOfCustomer(
            @Param("search") String search,
            @Param("status") Integer status,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("staffCode") String staffCode,
            @Param("customerRanking") Ranking customerRanking,
            Pageable pageable);

    //     Tất cả hóa đơn với trường hợp có khách hàng nhưng không có nhân viên
    @Query(value = "SELECT b FROM Bills b " +
            " WHERE ( :status IS NULL OR b.billStatus = :status ) " +
            " AND ( b.billCreateDate BETWEEN :startDate AND :endDate ) " +
            " AND ( :search IS NULL OR b.billCode like %:search% " +
            " OR b.customer.customerCode LIKE %:search% " +
            " OR b.customer.users.phoneNumber LIKE %:search% " +
            " OR b.customer.users.email LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% ) "
    )
    Page<Bills> findAllBillsOfflineOfCustomer(
            @Param("search") String search,
            @Param("status") Integer status,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);


    // getAll bill online với tất cả đơn hàng
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
    Page<Bills> findAllBillsOnline(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill online với tất cả đơn hàng của customerId
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) " +
            " AND b.staff IS NULL "
    )
    Page<Bills> findAllBillsOnlineCustomerId(
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill online với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) " +
            " AND b.staff IS NULL "
    )
    Page<Bills> findAllBillsOnlineCustomerRanking(
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill online với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) " +
            " AND b.staff IS NULL "
    )
    Page<Bills> findAllBillsOnlineCustomerRankingAndCustomerId(
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill online với hạng khách hàng lẻ
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.customer IS NULL " +
            " AND b.staff IS NULL "
    )
    Page<Bills> findAllBillsOnlineKhachHangLe(
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
