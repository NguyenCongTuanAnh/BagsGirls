package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface ICustomerRepository extends JpaRepository<Customers, String> {

        @Query(value = "SELECT c FROM  Customers  c")
        Page<Customers> findAllCustomersWithUsersRoles(Pageable pageable);

    @Query (value = "SELECT c FROM Customers c join Users i on c.users.userId = i.userId " +
            "where i.account like %:keyword% " +
            "or i.address like %:keyword% " +
            " or i.fullName like %:keyword% " +
            "or i.phoneNumber like %:keyword%"
            )
    Page<Customers> findallSearch(@Param("keyword") String keyword, Pageable pageable);
//    @Query("SELECT c FROM Customers c join Users u on c.users.userId = u.userId " +
//            "where c.customerId LIKE %:keyword%" +
//            "or  u.userId LIKE %:keyword%" +
//            "or u.fullName LIKE %:keyword%" +
//            "or u.account LIKE %:keyword%" +
//            "or u.email LIKE %:keyword%" +
//            "or u.phoneNumber LIKE %:keyword%")
//    List<Customers> findByKeyword(String keyword);
@Query("SELECT c FROM Customers c join Users u on c.users.userId = u.userId ")
List<Customers> findByKeyword(String keyword);
    @Query("SELECT c FROM Customers c join Users u on c.users.userId = u.userId " +
            "where u.fullName LIKE %:keyword% " +
            "OR u.phoneNumber LIKE %:keyword% " +
            "OR u.email LIKE %:keyword% ")
    List<Customers> findCustomerByKeyword(@Param("keyword") String keyword);

    @Query("SELECT c, u FROM Customers c join Users u on c.users.userId = u.userId " +
            "where u.email = :email ")
    Customers findByEmail(@Param("email") String email);

    @Query("SELECT c, u FROM Customers c join Users u on c.users.userId = u.userId " +
            "where u.phoneNumber = :phoneNumber ")
    Customers findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query("SELECT c, u FROM Customers c join Users u on c.users.userId = u.userId " +
            "where u.userId = :userId ")
    Customers findByUsersId(@Param("userId") String userId);
}
