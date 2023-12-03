package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.CustomerDTO;
import fpoly.datn.ecommerce_website.dto.CustomerDTO1;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.repository.ICustomerRepository;
import fpoly.datn.ecommerce_website.service.serviceImpl.CustomerServiceImpl;
import fpoly.datn.ecommerce_website.service.serviceImpl.UserServiceImpl;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class CustomerRestController {

    @Autowired
    private CustomerServiceImpl customerService;
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private UserServiceImpl userInfoService;
    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping("/customer/")
    public ResponseEntity<List<CustomerDTO>> getAll() {
        List<Customers> list = customerService.findAll();
        return new ResponseEntity<>(
                list.stream().map(customer -> modelMapper.map(customer, CustomerDTO.class)).collect(Collectors.toList())
                , HttpStatus.OK
        );
    }

    @RequestMapping(value = "/customer/pagination", method = RequestMethod.GET)
    public ResponseEntity<?> getAllPage(
            @RequestParam(name = "page", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "15") int pageSize
    ) {
//        if(customerService.)
        Page<Customers> customerPage = customerService.findAllCustomersWithUserInfoUserRole(pageNum, pageSize);
        return new ResponseEntity<>
                (customerPage, HttpStatus.OK);
    }


    @RequestMapping(value = "/customer", method = RequestMethod.GET)
    public ResponseEntity<CustomerDTO> getOne(@RequestParam("customerId") String id) {
        return new ResponseEntity<>(
                modelMapper.map(customerService.findById(id), CustomerDTO.class)
                , HttpStatus.OK
        );

    }
    @RequestMapping(value = "/customer/findByUserId", method = RequestMethod.GET)
    public ResponseEntity<?> findByUserId(@RequestParam("userId") String userId) {
        return new ResponseEntity<>(
              this.customerRepository.findByUsersId(userId)
                , HttpStatus.OK
        );

    }

    @RequestMapping(value = "/customer", method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody CustomerDTO customerDTO) {

        return new ResponseEntity<>(this.customerService.save(customerDTO), HttpStatus.OK);

    }

    @RequestMapping(value = "/customer", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@Valid @RequestParam String id, @RequestBody CustomerDTO1 customerDTO1) {
        return new ResponseEntity<>(customerService.update(id,customerDTO1),
                HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/update-status", method = RequestMethod.PUT)
    public ResponseEntity<Customers> updateStatus(@RequestParam String id, @RequestParam int status) {
        return new ResponseEntity<>(customerService.updateStatus(id, status),
                HttpStatus.OK);
    }

    @RequestMapping(value = "/customer", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@RequestParam String id) {
        return new ResponseEntity<>(this.customerService.delete(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/search", method = RequestMethod.GET)
    public ResponseEntity<?> getAllSearch(
            @RequestParam(name = "page", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "10") int pageSize,
            @RequestParam(name ="keyword", defaultValue = "") String keyword
    ) {
        Page<Customers> customerSearchPage = customerService.findAllSearch(keyword, pageNum, pageSize);
        return new ResponseEntity<>
                (customerSearchPage, HttpStatus.OK);
    }
    @RequestMapping(value = "/customer/searchByKeyword", method = RequestMethod.GET)
    public ResponseEntity<?> findCustomerByKeyword(
            @RequestParam(name = "keyword") String keyword
    ) {
        return new ResponseEntity<>
                (this.customerService.findCustomerByKeyword(keyword), HttpStatus.OK);
    }
    @RequestMapping(value = "/customer/findByEmail", method = RequestMethod.GET)
    public ResponseEntity<?> findCustomerByEmail(
            @RequestParam(name = "email") String email
    ) {
        return new ResponseEntity<>
                (this.customerRepository.findByEmail(email), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/findByPhoneNumber", method = RequestMethod.GET)
    public ResponseEntity<?> findByPhoneNumber(
            @RequestParam(name = "phoneNumber") String phoneNumber
    ) {
        Customers customers = this.customerRepository.findByPhoneNumber(phoneNumber);
//        if (customers == null) {
//            return new ResponseEntity<>
//                    ("Không tìm thấy users", HttpStatus.NOT_FOUND);
//        }
        return new ResponseEntity<>
                (customers, HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/updatePoint", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePoint(
            @RequestParam(name = "customerId") String customerId,
            @RequestParam(name = "totalPrice") Double totalPrice
    ) {
        CustomerDTO customers = this.customerService.updatePointByTotalPrice(customerId, totalPrice);
        return new ResponseEntity<>
                (customers, HttpStatus.OK);
    }
}
