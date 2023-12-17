package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.dto.TopProductsDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.BillDetails_ChiTiet;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBillDetailRepository extends JpaRepository<BillDetails, String> {
    @Query("SELECT bd FROM  BillDetails_ChiTiet bd " +
            "where bd.bills.billId = :billID " +
            " AND ( :status IS NULL OR bd.billDetailStatus != :status ) " )
    List<BillDetails_ChiTiet> findAllByBillId(@Param("billID") String billID, Integer status);

    @Query("SELECT bd FROM  BillDetails_ChiTiet bd " +
            "where bd.billDetailId = :billDetailId " )
    BillDetails_ChiTiet findBillDetailsById(@Param("billDetailId") String billDetailId);

//    @Query("SELECT bd FROM  BillDetails bd join ProductDetails pd" +
//            "  on bd.productDetails.productDetailId = pd.productDetailId" +
//            " join Products p on pd.product.productId = p.productId where bd.bills.billId = :billID")
//    List<BillDetails> findAllBillDetailsById(@Param("billID") String billID);

    @Query("SELECT NEW fpoly.datn.ecommerce_website.dto.TopProductsDTO( " +
            " product.images, product.productCode, product.productName, productDetails.retailPrice, SUM(billDetail.amount)) " +
            " FROM BillDetails_ChiTiet billDetail " +
            " JOIN billDetail.productDetails productDetails " +
            " JOIN productDetails.product product " +
            " WHERE billDetail.billDetailStatus <> -1 " + // Sử dụng <> thay vì !=
            " GROUP BY product.productCode, product.productName " +
            " ORDER BY SUM(billDetail.amount) DESC ")
    List<TopProductsDTO> findTopProductsByTotalAmount(Pageable pageable);
}
