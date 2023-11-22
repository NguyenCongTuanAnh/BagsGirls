package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Products, String> {

    @Query("SELECT b from Products b where b.productStatus <> -1")
    public Page<Products> getAllWithoutDelete(Pageable pageable);

//    @Query("SELECT * \n" +
//            "FROM products\n" +
//            "INNER JOIN images ON products.id = images.product_id\n" +
//            "INNER JOIN productDetails ON products.id = productDetails.product_id")
//    List<Products> fullProduct();

}
