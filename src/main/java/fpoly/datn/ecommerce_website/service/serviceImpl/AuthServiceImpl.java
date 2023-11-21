package fpoly.datn.ecommerce_website.service.serviceImpl;


import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.entity.Staffs;
import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.infrastructure.constant.Message;
import fpoly.datn.ecommerce_website.infrastructure.exception.rest.RestApiException;
import fpoly.datn.ecommerce_website.infrastructure.security.JwtTokenProvider;
import fpoly.datn.ecommerce_website.model.request.LoginRequest;
import fpoly.datn.ecommerce_website.model.response.JwtResponse;
import fpoly.datn.ecommerce_website.repository.ICustomerRepository;
import fpoly.datn.ecommerce_website.repository.IStaffRepository;
import fpoly.datn.ecommerce_website.repository.IUserRepository;
import fpoly.datn.ecommerce_website.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Validated
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IStaffRepository iStaffRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public JwtResponse loginGoogle(String tokenId) {
//        Users userVerify = GoogleTokenVerifier.verifyToken(tokenId);
//        Users userFind = userRepository.findByEmail(userVerify.getEmail());
//        if (userFind == null) {
//            throw new RestApiException(Message.USER_NOT_EXISTS);
//        }
//        String jwtToken = jwtTokenProvider.generateTokenUser(c);
        JwtResponse jwtResponse = new JwtResponse();
//        jwtResponse.setToken(jwtToken);
        return jwtResponse;
    }

    @Override
    public JwtResponse loginBasic(@RequestBody LoginRequest loginRequest) {

       Staffs staffs = this.iStaffRepository.findByEmail(loginRequest.getEmail());
        System.out.println("ạbncjidnbjcnbd");
        System.out.println(staffs);
        if (staffs == null) {
            throw new RestApiException(Message.EMAIL_OR_PASSWORD_INCORRECT);
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), staffs.getUsers().getPassword())) {
            throw new RestApiException(Message.EMAIL_OR_PASSWORD_INCORRECT);
        }
        String jwtToken = jwtTokenProvider.generateTokenUser(staffs);
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setToken(jwtToken);
        jwtResponse.setStaffs(staffs);
        return jwtResponse;
    }

    @Override
    public Boolean validateToken(String jwtToken) {
        return this.jwtTokenProvider.validateToken(jwtToken);

    }
}
