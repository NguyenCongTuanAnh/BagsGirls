package fpoly.datn.ecommerce_website.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.entity.ProductDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Setter
@Getter
public class BillDetailsQDTO {
    private String billDetailId;

    private String billCode;

    private String customerName;

    private String staffName;

    private String orderName;

    private String customerPhoneNumber;

    private Double billTotalPrice;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date billCreateDate;

    private ProductDetails productDetails;

    private Integer amount;

    private Double price;
}
