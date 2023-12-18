package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.CartDetails;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartDetailRepository extends JpaRepository<CartDetails, String> {

    @Query("select cdt from CartDetails  cdt " +
            "where cdt.carts.cartId=:carts.ca")
    List<CartDetails> findByCartId(String cartId);

}
