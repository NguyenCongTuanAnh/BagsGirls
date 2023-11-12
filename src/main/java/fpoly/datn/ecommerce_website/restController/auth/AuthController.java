package fpoly.datn.ecommerce_website.restController.auth;

import fpoly.datn.ecommerce_website.entity.base.ResponseObject;
import fpoly.datn.ecommerce_website.model.request.CreateUserRequest;
import fpoly.datn.ecommerce_website.model.request.LoginRequest;
import fpoly.datn.ecommerce_website.service.AuthService;
import fpoly.datn.ecommerce_website.service.IUserService;
import fpoly.datn.ecommerce_website.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private IUserService userService;

    @PostMapping("/login-google/{tokenId}")
    public ResponseObject loginGoogle(@PathVariable("tokenId") String tokenId) {
        return new ResponseObject(authService.loginGoogle(tokenId));
    }

    @PostMapping("/login-basic")
    public ResponseObject loginBasic(@RequestBody LoginRequest request) {
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        return new ResponseObject(authService.loginBasic(request));
    }

    @PostMapping("/register")
    public ResponseObject register(@RequestBody CreateUserRequest request) {
        return new ResponseObject(userService.create(request));
    }

    @GetMapping("/logout")
    public String logout() {
        return "Logout";
    }

}
