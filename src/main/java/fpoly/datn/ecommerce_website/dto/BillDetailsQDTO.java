package fpoly.datn.ecommerce_website.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.entity.ProductDetails;
import fpoly.datn.ecommerce_website.entity.ProductDetails_BillDetails;
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

    private String billId;

    private ProductDetails_BillDetails productDetails;

    private Integer amount;

    private Double price;

    private Integer billDetailStatus;

    private String billDetailNote;
}
