package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.CustomerDTO;
import fpoly.datn.ecommerce_website.dto.CustomerDTO1;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.infrastructure.constant.Constants;
import fpoly.datn.ecommerce_website.infrastructure.constant.Ranking;
import fpoly.datn.ecommerce_website.repository.ICustomerRepository;
import fpoly.datn.ecommerce_website.repository.IUserRepository;
import fpoly.datn.ecommerce_website.service.ICustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
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


    @Override
    public Customers save(CustomerDTO customerDTO) {


      Users users = Users.builder()
              .account(customerDTO.getUsers().getAccount())
              .fullName(customerDTO.getUsers().getFullName())
              .password(passwordEncoder.encode(customerDTO.getUsers().getPassword()))
              .email(customerDTO.getUsers().getEmail())
              .userStatus(customerDTO.getUsers().getUserStatus())
              .gender(customerDTO.getUsers().getGender())
              .address(customerDTO.getUsers().getAddress())
              .phoneNumber(customerDTO.getUsers().getPhoneNumber())
              .birthDay(customerDTO.getUsers().getBirthDay())
              .userNote(customerDTO.getUsers().getUserNote())
              .role(customerDTO.getUsers().getRole())
              .build();
        Users savedUserInfo = userInfoRepository.save(users);
        if (savedUserInfo != null) {
            Customers customer = Customers.builder()
                    .consumePoints(customerDTO.getConsumePoints())
                    .customerStatus(customerDTO.getCustomerStatus())
                    .rankingPoints(1)
                    .customerRanking(Ranking.KH_TIEMNANG)
                    .users(savedUserInfo)
                    .build();
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
    public CustomerDTO updatePointByTotalPrice(String customerId, Double totalPrice) {
        Customers customers = this.customerRepository.findById(customerId).get();

        int addPoint = 0;
       if (totalPrice >= Constants.TOTALPRICE_TO_ADD_20POINT){
           addPoint = 20;
       }else if (totalPrice >= Constants.TOTALPRICE_TO_ADD_10POINT){
           addPoint = 10;
       }else if (totalPrice >= Constants.TOTALPRICE_TO_ADD_1POINT){
           addPoint = 5;
       }else{
           addPoint = 1;
       }
       customers.setRankingPoints(addPoint + customers.getRankingPoints());

        if ( customers.getRankingPoints() >= Constants.POINTS_TO_UP_KHKC){
         customers.setCustomerRanking(Ranking.KH_KIMCUONG);
        }else if ( customers.getRankingPoints() >= Constants.POINTS_TO_UP_KHV){
           customers.setCustomerRanking(Ranking.KH_VANG);
        }else if ( customers.getRankingPoints() >= Constants.POINTS_TO_UP_KHB){
          customers.setCustomerRanking(Ranking.KH_BAC);
        }else if ( customers.getRankingPoints() >= Constants.POINTS_TO_UP_KHTT){
          customers.setCustomerRanking(Ranking.KH_THANTHIET);
        }else{
            customers.setCustomerRanking(Ranking.KH_TIEMNANG);
        }

        return modelMapper.map(this.customerRepository.save(customers), CustomerDTO.class);
    }
}