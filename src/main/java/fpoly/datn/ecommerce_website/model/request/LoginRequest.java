package fpoly.datn.ecommerce_website.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class LoginRequest {

    @NotBlank
    @Email
    @Length(max = 50)
    private String email;

    @NotBlank
    @Length(max = 30)
    private String password;

}
