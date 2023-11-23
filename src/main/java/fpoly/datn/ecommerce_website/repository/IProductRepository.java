package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Products, String> {

    @Query("SELECT b from Products b where b.productStatus <> -1")
    public Page<Products> getAllWithoutDelete(Pageable pageable);

    @Query("SELECT p FROM Products p " +
            "LEFT JOIN p.productDetails pd " +
            "LEFT JOIN p.brand b " +
            "LEFT JOIN pd.material m " +
            "LEFT JOIN pd.color c " +
            "WHERE p.productName LIKE %:keyword% " +
            "OR pd.retailPrice = :price " +
            "OR b.brandName LIKE %:keyword% " +
            "OR c.colorName LIKE %:keyword% " +
            "OR m.materialName LIKE %:keyword%")
    List<Products> searchProductsByKeywordOrPriceOrBrandOrMaterial(String keyword, BigDecimal price);



}
