package fpoly.datn.ecommerce_website.dto;

import fpoly.datn.ecommerce_website.entity.Customers;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

    private String cartId;

    private String cartCode;

    private Date createTime;

    private Date paymentTime;

    private String cartNote;

    private Integer cartStatus;

    private Customers customers;

}
