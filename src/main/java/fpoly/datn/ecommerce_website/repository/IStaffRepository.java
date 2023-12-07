package fpoly.datn.ecommerce_website.repository;

import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Staffs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IStaffRepository extends JpaRepository<Staffs, String> {
    @Query(value = "select s from Staffs s")
    Page<Staffs> getAllPage(Pageable pageable);

    @Query(value = " SELECT c FROM Customers c " +
            " where c.users.account like %:keyword% " +
            " or c.users.address like %:keyword% " +
            " or c.users.fullName like %:keyword% " +
            " or c.users.phoneNumber like %:keyword% " +
            " or c.users.address like %:keyword% "
    )
    Page<Staffs> findallSearch(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT s, u FROM Staffs s join Users u on s.users.userId = u.userId " +
            "where u.email = :email ")
    Staffs findByEmail(@Param("email") String email);
    @Query("SELECT s, u FROM Staffs s join Users u on s.users.userId = u.userId " +
            "where u.userId = :userId ")
    Staffs findByUsersId(@Param("userId") String userId);
//    @Query("SELECT s, u FROM Staffs s join Users u on s.users.userId = u.userId " +
//            "where u.email = :email ")
//    Staffs findByEmail(@Param("email") String email);
}
