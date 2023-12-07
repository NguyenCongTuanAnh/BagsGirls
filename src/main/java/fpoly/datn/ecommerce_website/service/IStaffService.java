package fpoly.datn.ecommerce_website.service;

import fpoly.datn.ecommerce_website.dto.CustomerDTO;
import fpoly.datn.ecommerce_website.dto.StaffDTO1;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Staffs;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IStaffService {

    List<Staffs> findAll();

    Page<Staffs> findAllPage(Integer page, Integer size);

    Page<Staffs> findAllSearch(String search, Integer page, Integer size);

    Staffs findById(String id);

    Staffs save(StaffDTO1 staffDTO);

    Staffs findByEmail(String mail);

    Staffs update(String staffId, StaffDTO1 staffDTO);

    Staffs updateStatus(String id, Integer status);

    String delete(String id);

    List<Staffs> searchByName(String name);
}
