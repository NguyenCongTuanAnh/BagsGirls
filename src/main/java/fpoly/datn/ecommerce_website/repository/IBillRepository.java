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

    // getAll bill  với tất cả đơn hàng
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) "
    )
    Page<Bills> findAllBills(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với tất cả đơn hàng của customerId
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) "

    )
    Page<Bills> findAllBillsCustomerId(
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) "

    )
    Page<Bills> findAllBillsCustomerRanking(
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) "
    )
    Page<Bills> findAllBillsCustomerRankingAndCustomerId(
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với hạng khách hàng lẻ
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.customer IS NULL "
    )
    Page<Bills> findAllBillsKhachHangLe(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // getAll bill khi lọc cả nhân viên

    // Tất cả hóa đơn
    // getAll bill  với tất cả đơn hàng
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) "
    )
    Page<Bills> findAllBillsOfStaff(
            @Param("staffCode") String staffCode,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với tất cả đơn hàng của customerId
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) "

    )
    Page<Bills> findAllBillsCustomerIdOfStaff(
            @Param("staffCode") String staffCode,
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) "

    )
    Page<Bills> findAllBillsCustomerRankingOfStaff(
            @Param("staffCode") String staffCode,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
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
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) "
    )
    Page<Bills> findAllBillsCustomerRankingAndCustomerIdOfStaff(
            @Param("staffCode") String staffCode,
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với hạng khách hàng lẻ
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.customer IS NULL " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) "
    )
    Page<Bills> findAllBillsKhachHangLeOfStaff(
            @Param("staffCode") String staffCode,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);





    ///////////////////////////////////////////////////// Hóa đơn online


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


    ////////////////////////////////////////////////////////////////////// Get bill offline

    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.staff IS NOT NULL "
    )
    Page<Bills> findAllBillsOffline(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với tất cả đơn hàng của customerId
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) " +
            " AND b.staff IS NOT NULL "

    )
    Page<Bills> findAllBillsCustomerIdOffline(
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) " +
            " AND b.staff IS NOT NULL "

    )
    Page<Bills> findAllBillsCustomerRankingOffline(
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
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
            " AND b.staff IS NOT NULL "
    )
    Page<Bills> findAllBillsCustomerRankingAndCustomerIdOffline(
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với hạng khách hàng lẻ
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.customer IS NULL " +
            " AND b.staff IS NOT NULL "
    )
    Page<Bills> findAllBillsKhachHangLeOffline(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // Tất cả hóa đơn
    // getAll bill  với tất cả đơn hàng
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) " +
            " AND b.staff IS NOT NULL "
    )
    Page<Bills> findAllBillsOfStaffOffline(
            @Param("staffCode") String staffCode,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với tất cả đơn hàng của customerId
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerPhoneNumber IS NULL OR b.customer.users.phoneNumber = :customerPhoneNumber ) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) " +
            " AND b.staff IS NOT NULL "

    )
    Page<Bills> findAllBillsCustomerIdOfStaffOffline(
            @Param("staffCode") String staffCode,
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND ( :customerRanking IS NULL OR b.customer.customerRanking = :customerRanking ) " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) " +
            " AND b.staff IS NOT NULL "

    )
    Page<Bills> findAllBillsCustomerRankingOfStaffOffline(
            @Param("staffCode") String staffCode,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với khách hàng đã đăng nhập
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
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) " +
            " AND b.staff IS NOT NULL "
    )
    Page<Bills> findAllBillsCustomerRankingAndCustomerIdOfStaffOffline(
            @Param("staffCode") String staffCode,
            @Param("customerPhoneNumber") String customerPhoneNumber,
            @Param("customerRanking") Ranking customerRanking,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

    // getAll bill với hạng khách hàng lẻ
    @Query(value = " SELECT b FROM Bills b WHERE " +
            " ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billPriceAfterVoucher AS string) like %:search% " +
            " OR b.receiverName LIKE %:search% " +
            " or :search IS NULL ) " +
            " AND ( :status IS NULL OR b.billStatus = :status ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.customer IS NULL " +
            " AND ( :staffCode IS NULL OR b.staff.staffCode = :staffCode ) " +
            " AND b.staff IS NOT NULL "
    )
    Page<Bills> findAllBillsKhachHangLeOfStaffOffline(
            @Param("staffCode") String staffCode,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);



    List<Bills> findByBillCreateDateBetween(Date startDate, Date endDate);

    @Query("SELECT COALESCE(SUM(b.billTotalPrice), 0) FROM Bills b WHERE CAST(b.billCreateDate AS date) = CAST(:date AS date)")
    BigDecimal calculateTotalSalesForDate(@Param("date") LocalDate date);


}
