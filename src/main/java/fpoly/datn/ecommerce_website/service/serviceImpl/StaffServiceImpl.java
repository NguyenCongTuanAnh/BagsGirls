package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.StaffDTO1;
import fpoly.datn.ecommerce_website.entity.Staffs;
import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.repository.IStaffRepository;
import fpoly.datn.ecommerce_website.repository.IUserRepository;
import fpoly.datn.ecommerce_website.service.IStaffService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffServiceImpl implements IStaffService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IStaffRepository staffRepository;
    @Autowired
    private IUserRepository userInfoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

   
    @Override
    public List<Staffs> findAll() {
        return this.staffRepository.findAll();
    }

    @Override
    public Page<Staffs> findAllPage(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return staffRepository.getAllPage(pageable);
    }

    @Override
    public Page<Staffs> findAllSearch(String search, Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return staffRepository.findallSearch(search, pageable);
    }



    @Override
    public Staffs findById(String id) {
        Optional<Staffs> optional = staffRepository.findById(id);
        return optional.get();
    }


    @Override
    public Staffs save(StaffDTO1 staffDTO) {
        Staffs staff = modelMapper.map(staffDTO, Staffs.class);
        staff.setStaffStatus(1);
        Users userInfo = modelMapper.map(staffDTO, Users.class);
        userInfo.setRole(staffDTO.getUsersRolesRoleName());
        userInfo.setPassword(passwordEncoder.encode(staffDTO.getUsersPassword()));
        Users savedUserInfo = userInfoRepository.save(userInfo);
        if (savedUserInfo != null) {
            staff.setUsers(savedUserInfo);

            return staffRepository.save(staff);
        } else {
            throw new IllegalStateException("Failed to save UserInfo");
        }
    }

    @Override
    public Staffs findByEmail(String mail) {
        Staffs customers = this.staffRepository.findByEmail(mail);

        return customers;
    }

    @Override
    public Staffs update(String staffId, StaffDTO1 staffDTO) {
        Staffs staffs = staffRepository.findById(staffId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        modelMapper.map(staffDTO, staffs);
        Users userInfo = modelMapper.map(staffDTO, Users.class);
        Users savedUserInfo = userInfoRepository.save(userInfo);
        if (savedUserInfo != null) {
            return staffRepository.save(staffs);
        } else {
            throw new IllegalStateException("Failed to save UserInfo");

        }

    }

    @Override
    public Staffs updateStatus(String id, Integer status){
        Staffs staff = staffRepository.findById(id).get();
        staff.setStaffStatus(status);
        return staffRepository.save(staff);
    }
    
    @Override
    public String delete(String id) {

        this.staffRepository.deleteById(id);
        return "Delete successfully";
    }

    
    @Override
    public List<Staffs> searchByName(String name) {
        return null;
    }
}
