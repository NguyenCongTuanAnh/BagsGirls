package fpoly.datn.ecommerce_website.service.serviceImpl;


import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Staffs;
import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.entity.base.PageableObject;
import fpoly.datn.ecommerce_website.infrastructure.constant.Message;
import fpoly.datn.ecommerce_website.infrastructure.constant.Role;
import fpoly.datn.ecommerce_website.infrastructure.exception.rest.RestApiException;
import fpoly.datn.ecommerce_website.model.request.CreateUserRequest;
import fpoly.datn.ecommerce_website.model.request.FindUserRequest;
import fpoly.datn.ecommerce_website.repository.ICustomerRepository;
import fpoly.datn.ecommerce_website.repository.IStaffRepository;
import fpoly.datn.ecommerce_website.repository.IUserRepository;
import fpoly.datn.ecommerce_website.service.IUserService;
import fpoly.datn.ecommerce_website.util.ConvertStringToDate;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements IUserService {


    @Autowired
    private IUserRepository userInfoRepository;
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private IStaffRepository staffRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Users> findAll() {
        return this.userInfoRepository.findAll();
    }

    @Override
    public Page<Users> findAllPhanTrang(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return this.userInfoRepository.findAllAccountPhanTrang(pageable);
    }


    @Override
    public Users findById(String id) {
        return this.userInfoRepository.findById(id).get();
    }
    @Override
    public Users findByEmail(String email) {
        return this.userInfoRepository.findByEmail(email);
    }

    @Override
    public Users save(Users users) {
        return null;
    }


    @Override
    public Users update(Users customer) {
        return this.userInfoRepository.save(customer);
    }

    @Override
    public Users updateStatus(String id, int status) {
        Users userInfo = userInfoRepository.findById(id).get();
        userInfo.setUserStatus(status);
        return userInfoRepository.save(userInfo);
    }

    @Override
    public String delete(String id) {

        this.userInfoRepository.deleteById(id);
        return "Delete successfully";
    }

    @Override
    public List<Users> searchByName(String name) {
        return null;
    }

    @Override
    public List<Users> findCustomerByKeyword(String keyword) {
        return this.userInfoRepository.findCustomerByKeyword(keyword);
    }
    @Override
    public Users create(@Valid CreateUserRequest request) {
        Users newUser = new Users();
        Users userFindByEmail = userInfoRepository.findByEmail(request.getEmail());
        if (userFindByEmail != null) {
            throw new RestApiException(Message.EMAIL_EXISTS);
        }
        newUser.setAddress(request.getAddress());
        newUser.setEmail(request.getEmail());
        Date dateOfBirth = ConvertStringToDate.convert(request.getDateOfBirth(), "yyyy-MM-dd"); // db chưa có cột ngày sinh
        newUser.setGender(request.getGender());
        newUser.setFullName(request.getFullName());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setPhoneNumber(request.getPhoneNumber());
        newUser.setRole(request.getRole());
        Users users = userInfoRepository.save(newUser);
        if (users.getRole() == Role.ROLE_CUSTOMER){
            System.out.println("TH1");
            Customers addCustomer = Customers.builder()
                    .customerStatus(1)
                    .customerPoint(0)
                    .users(users)
                    .build();
            Customers customers = this.customerRepository.save(addCustomer);
        }else {
            System.out.println("TH2");
            Staffs addStaff = Staffs.builder()
                    .staffStatus(1)
                    .users(users)
                    .build();
            Staffs staff = this.staffRepository.save(addStaff);
        }
        return users;
    }
    @Override
    public PageableObject<Users> findUser(final FindUserRequest request) {
        PageRequest pageRequest = PageRequest.of(request.getPage(), request.getSize());
        return new PageableObject<>(userInfoRepository.findAll(pageRequest));
    }

}
