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
            "LEFT JOIN p.brand brand " +
            "LEFT JOIN pd.material material " +
            "LEFT JOIN pd.color color " +
            "LEFT JOIN pd.size sizes " +
            "LEFT JOIN pd.type types " +
            "LEFT JOIN pd.producer producer " +
            "LEFT JOIN pd.compartment compartment " +
            "LEFT JOIN pd.buckleType buckleType " +
            "WHERE p.productName LIKE %:keyword% " +
            "OR p.productCode LIKE %:keyword% " +
            "OR brand.brandName LIKE %:keyword% " +
            "OR color.colorName LIKE %:keyword% " +
            "OR material.materialName LIKE %:keyword% " +
            "OR sizes.sizeName LIKE %:keyword% " +
            "OR types.typeName LIKE %:keyword% " +
            "OR producer.producerName LIKE %:keyword% " +
            "OR compartment.compartmentName LIKE %:keyword% " +
            "OR buckleType.buckleTypeName LIKE %:keyword%"
    )
    List<Products> searchProductsByKeywordOrBrandOrMaterial(String keyword);


}
