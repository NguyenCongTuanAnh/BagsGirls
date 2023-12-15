package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.CartDetails;
import fpoly.datn.ecommerce_website.entity.Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartDetailRepository extends JpaRepository<CartDetails, String> {

}
