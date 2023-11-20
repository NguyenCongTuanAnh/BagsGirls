package fpoly.datn.ecommerce_website.restController.auth;

import fpoly.datn.ecommerce_website.entity.Users;
import fpoly.datn.ecommerce_website.entity.base.ResponseObject;
import fpoly.datn.ecommerce_website.infrastructure.constant.Constants;
import fpoly.datn.ecommerce_website.infrastructure.constant.Message;
import fpoly.datn.ecommerce_website.infrastructure.exception.rest.InvalidTokenException;
import fpoly.datn.ecommerce_website.model.request.CreateUserRequest;
import fpoly.datn.ecommerce_website.model.request.LoginRequest;
import fpoly.datn.ecommerce_website.service.AuthService;
import fpoly.datn.ecommerce_website.service.IUserService;
import fpoly.datn.ecommerce_website.service.UserService;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private IUserService userService;

    @GetMapping("/getUserToken")
    public ResponseEntity<Users> getUserToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        System.out.println(authorizationHeader);
        System.out.println("authorizationHeader");
        String token = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
            String email = Jwts.parser()
                    .setSigningKey(Constants.JWTSECRET)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            return ResponseEntity.ok(this.userService.findByEmail(email));
        }
        return ResponseEntity.notFound().build();
    }
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

    @GetMapping("/validateToken")
    public Boolean validateToken(@RequestParam String token) {
        Boolean valid = authService.validateToken(token);
        return valid;
    }

}
