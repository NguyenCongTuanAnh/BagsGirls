package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.CustomerDTO;
import fpoly.datn.ecommerce_website.dto.CustomerDTO1;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.repository.ICustomerRepository;
import fpoly.datn.ecommerce_website.repository.IUserRepository;
import fpoly.datn.ecommerce_website.service.ICustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private IUserRepository userInfoRepository;


    @Override
    public Page<Customers> findAllCustomersWithUserInfoUserRole(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return customerRepository.findAllCustomersWithUsersRoles(pageable);
    }

    public Page<Customers> findAllSearch(String search, Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return customerRepository.findallSearch(search, pageable);
    }


    @Override
    public List<Customers> findAll() {
        return this.customerRepository.findAll();
    }


    @Override
    public Customers findById(String id) {
        return this.customerRepository.findById(id).get();
    }


    public Customers save(CustomerDTO1 customerDTO) {

        Customers customer = modelMapper.map(customerDTO, Customers.class);
      Users users = Users.builder()
              .account(customerDTO.getUsersAccount())
              .fullName(customerDTO.getUsersFullName())
              .password(customerDTO.getUsersPassword())
              .email(customerDTO.getUsersEmail())
              .userStatus(customerDTO.getUserStatus())
              .gender(customerDTO.getUsersGender())
              .address(customerDTO.getUsersAddress())
              .phoneNumber(customerDTO.getUsersPhoneNumber())
              .userNote(customerDTO.getUsersUserNote())
              .role(customerDTO.getUserRoleName())
              .build();
        Users savedUserInfo = userInfoRepository.save(users);
        if (savedUserInfo != null) {
            customer.setUsers(savedUserInfo);

            return customerRepository.save(customer);
        } else {
            throw new IllegalStateException("Failed to save UserInfo");
        }
    }


    public Customers update(String customerId, CustomerDTO1 customerDTO) {
        Customers customers = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        modelMapper.map(customerDTO, customers);
        Users userInfo = modelMapper.map(customerDTO, Users.class);
        Users savedUserInfo = userInfoRepository.save(userInfo);
        if (savedUserInfo != null) {
            return customerRepository.save(customers);
        } else {
            throw new IllegalStateException("Failed to save UserInfo");

        }

    }


    @Override
    public Customers updateStatus(String id, Integer status) {
        Customers customer = customerRepository.findById(id).get();
        customer.setCustomerStatus(status);
        return this.customerRepository.save(customer);
    }


    @Override
    public String delete(String id) {

        this.customerRepository.deleteById(id);
        return "Delete successfully";
    }


    @Override
    public List<CustomerDTO> findByKeyword(String keyword) {
        List<Customers> customers = this.customerRepository.findByKeyword(keyword);
        return customers.stream()
                .map(c -> modelMapper.map(c, CustomerDTO.class))
                .toList();
    }
    @Override
    public List<CustomerDTO> findCustomerByKeyword(String keyword) {
        List<Customers> customers = this.customerRepository.findCustomerByKeyword(keyword);
        return customers.stream()
                .map(c -> modelMapper.map(c, CustomerDTO.class))
                .toList();
    }
    public Customers findByEmail(String mail) {
        Customers customers = this.customerRepository.findByEmail(mail);

        return customers;
    }
}