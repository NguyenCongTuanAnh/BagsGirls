package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBillDetailRepository extends JpaRepository<BillDetails, String> {
    @Query("SELECT bd FROM  BillDetails bd " +
            "where bd.bills.billId = :billID")
    List<BillDetails> findAllByBillId(@Param("billID") String billID);

//    @Query("SELECT bd FROM  BillDetails bd join ProductDetails pd" +
//            "  on bd.productDetails.productDetailId = pd.productDetailId" +
//            " join Products p on pd.product.productId = p.productId where bd.bills.billId = :billID")
//    List<BillDetails> findAllBillDetailsById(@Param("billID") String billID);
}
