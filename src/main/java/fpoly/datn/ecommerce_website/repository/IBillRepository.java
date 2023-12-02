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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface IBillRepository extends JpaRepository<Bills, String> {
//    @Query(value = "select b from ProductDetails p join BillDetails b " +
//            "on p.productDetailId = b.productDetails.productDetailId " +
//            "join Bills c on b.bills.billId = c.billId where b.bills.billStatus LIKE %:status% " +
//            "AND ( c.billCode like %:search%" +
//            "or c.staff.users.fullName like %:search%" +
//            "or c.customer.users.fullName like %:search%" +
//            "or c.customer.users.phoneNumber like %:search%)")
//    Page<BillsQDTO> findAllBills(@Param("search") String search, @Param("status") String status, Pageable pageable);

    @Query(value = "SELECT b FROM Bills b WHERE " +
            " (b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billTotalPrice AS string) like %:search% OR :search IS NULL ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.staff IS NULL " +
            "ORDER BY b.billCreateDate DESC" )
    Page<Bills> findAllBillsBySearch(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("search") String search,
            Pageable pageable);

    @Query(value = " SELECT b FROM Bills b WHERE b.billStatus = :status " +
            " AND ( b.billCode LIKE %:search% " +
            " OR b.orderPhone LIKE %:search% " +
            " OR CAST(b.billTotalPrice AS string) like %:search% OR :search IS NULL ) " +
            " AND (b.billCreateDate BETWEEN :startDate AND :endDate) " +
            " AND b.staff IS NULL " +
            "ORDER BY b.billCreateDate DESC" )
    Page<Bills> findAllBillsBySearchStatus(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("status") Integer status,
            @Param("search") String search,
            Pageable pageable);

//    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.bill.BillManagementResponse(b.id, b.billCode, COUNT(bd.id)," +
//            "   b.price, dn.name, dn.phoneNumber, b.createdAt, b.billType, b.symbol, b.status, dn.shipPrice," +
//            "   b.priceReduce, b.createdBy, a.fullName, a.numberPhone) " +
//            "FROM Bill b LEFT JOIN Account a ON a.username = b.account.username " +
//            "   LEFT JOIN BillDetails bd ON b.id = bd.bills.billId " +
//            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id " +
//            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
//            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
//            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
//            "   AND (:status IS NULL OR b.status LIKE :status) " +
//            "   AND (:createdBy IS NULL OR b.createdBy LIKE :createdBy AND b.status not like 'Cancel') " +
//            "GROUP BY b.id, b.billCode, b.price, b.createdAt, b.billType, b.status, " +
//            "    b.symbol, dn.shipPrice, b.priceReduce, dn.name, dn.phoneNumber, b.createdBy, " +
//            "    a.fullName, a.numberPhone " +
//            "   having (:symbol IS NULL OR (b.symbol like :symbol and b.status not like 'Cancel' " +
//            "       AND (:count IS NULL OR COUNT(tl.id) = :count))) " +
//            "ORDER BY b.createdAt DESC ")
//    List<BillsQDTO> getAllBillManagement(
//            @Param("billCode") String billCode,
//            @Param("startDate") LocalDateTime startDate,
//            @Param("endDate") LocalDateTime endDate,
//            @Param("status") String status,
//            @Param("symbol") String symbol,
//            @Param("count") Integer count,
//            @Param("createdBy") String createdBy);
}
