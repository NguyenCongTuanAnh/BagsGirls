package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.StaffDTO;
import fpoly.datn.ecommerce_website.dto.StaffDTO1;
import fpoly.datn.ecommerce_website.entity.Staffs;
import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.repository.IStaffRepository;
import fpoly.datn.ecommerce_website.repository.IUserRepository;
import fpoly.datn.ecommerce_website.service.serviceImpl.CustomerServiceImpl;
import fpoly.datn.ecommerce_website.service.serviceImpl.StaffServiceImpl;
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
public class StaffRestController {

    @Autowired
    private CustomerServiceImpl customerService;
    @Autowired
    private StaffServiceImpl staffService;
    @Autowired
    private IStaffRepository staffRepository;
    @Autowired
    private IUserRepository userInfoRepository;
    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping("/staff/get-all")
    public ResponseEntity<List<StaffDTO1>> getAll() {
        List<Staffs> list = staffService.findAll();
        System.out.println(list.size());
        return new ResponseEntity<>(
                list.stream().map(staff -> modelMapper.map(staff, StaffDTO1.class))
                        .collect(Collectors.toList()),
                HttpStatus.OK);
    }

    // GetAllPage
    @RequestMapping(value = "/staff/pagination", method = RequestMethod.GET)
    public ResponseEntity<?> getAll(
            @RequestParam(name = "page", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "10") int pageSize) {
        Page<Staffs> staffPage = staffService.findAllPage(pageNum, pageSize);
        return new ResponseEntity<>(staffPage, HttpStatus.OK);
    }

    @RequestMapping(value = "/staff", method = RequestMethod.GET)
    public ResponseEntity<StaffDTO> getOne(@RequestParam("id") String id) {
        Staffs staff = staffService.findById(id);
        if (staff == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        StaffDTO staffDTO = modelMapper.map(staff, StaffDTO.class);
        Users userInfo = staff.getUsers();
        return new ResponseEntity<>(staffDTO, HttpStatus.OK);
    }
    @RequestMapping(value = "/staff/findByUserId", method = RequestMethod.GET)
    public ResponseEntity<?> findByUserId(@RequestParam("userId") String userId) {
        return new ResponseEntity<>(
                this.staffRepository.findByUsersId(userId)
                , HttpStatus.OK
        );

    }
    @RequestMapping(value = "/staff", method = RequestMethod.POST)
    public ResponseEntity<Staffs> add(@RequestBody StaffDTO1 staffDTO) {
        return new ResponseEntity<>(this.staffService.save(staffDTO), HttpStatus.OK);
    }

    @RequestMapping(value = "/staff", method = RequestMethod.PUT)
    public ResponseEntity<?> update(@Valid @RequestParam String id, @RequestBody StaffDTO1 staffDTO) {
        return new ResponseEntity<>(staffService.update(id, staffDTO),
                HttpStatus.OK);
    }

    // updateStatus
    @RequestMapping(value = "/staff/update-status", method = RequestMethod.PUT)
    public ResponseEntity<Staffs> updateStatus(@Valid @RequestParam String id, @RequestParam int status) {
        return new ResponseEntity<>(staffService.updateStatus(id, status),
                HttpStatus.OK);

    }

    @RequestMapping(value = "/staff", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@RequestParam String id) {
        this.staffService.delete(id);
        return new ResponseEntity<>("Delete Successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "/staff/search", method = RequestMethod.GET)
    public ResponseEntity<?> getAllSearch(
            @RequestParam(name = "page", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "10") int pageSize,
            @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        Page<Staffs> staffSearch = staffService.findAllSearch(keyword, pageNum, pageSize);
        return new ResponseEntity<>(staffSearch, HttpStatus.OK);
    }

}
