package fpoly.datn.ecommerce_website.service;

import fpoly.datn.ecommerce_website.dto.Product_ProductDetailDTO;
import fpoly.datn.ecommerce_website.entity.ProductDetails;

import java.util.List;

public interface IProductDetalisService {
    List<ProductDetails> findAll();

    List<ProductDetails> findAllByProductId(String baloID);

    ProductDetails findById(String id);

    Product_ProductDetailDTO save(Product_ProductDetailDTO entity);

    ProductDetails update(ProductDetails entity);

    String delete(String id);

    List<ProductDetails> searchByName(String name);

    List<ProductDetails> findByKeyword(String keyword);
}
