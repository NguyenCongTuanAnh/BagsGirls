package fpoly.datn.ecommerce_website.service.serviceImpl;


import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.infrastructure.constant.Message;
import fpoly.datn.ecommerce_website.infrastructure.exception.rest.RestApiException;
import fpoly.datn.ecommerce_website.infrastructure.security.JwtTokenProvider;
import fpoly.datn.ecommerce_website.model.request.LoginRequest;
import fpoly.datn.ecommerce_website.model.response.JwtResponse;
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
    private PasswordEncoder passwordEncoder;

    @Override
    public JwtResponse loginGoogle(String tokenId) {
        Users userVerify = GoogleTokenVerifier.verifyToken(tokenId);
        Users userFind = userRepository.findByEmail(userVerify.getEmail());
        if (userFind == null) {
            throw new RestApiException(Message.USER_NOT_EXISTS);
        }
        String jwtToken = jwtTokenProvider.generateTokenUser(userFind);
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setToken(jwtToken);
        return jwtResponse;
    }

    @Override
    public JwtResponse loginBasic(@RequestBody LoginRequest loginRequest) {

        Users userFind = userRepository.findByEmail(loginRequest.getEmail());
        if (userFind == null) {
            throw new RestApiException(Message.EMAIL_OR_PASSWORD_INCORRECT);
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), userFind.getPassword())) {
            throw new RestApiException(Message.EMAIL_OR_PASSWORD_INCORRECT);
        }
        String jwtToken = jwtTokenProvider.generateTokenUser(userFind);
        JwtResponse jwtResponse = new JwtResponse();
        jwtResponse.setToken(jwtToken);
        jwtResponse.setUsers(userFind);
        return jwtResponse;
    }


}
