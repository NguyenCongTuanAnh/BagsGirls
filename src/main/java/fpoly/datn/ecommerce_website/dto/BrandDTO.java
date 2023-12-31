package fpoly.datn.ecommerce_website.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class BrandDTO {
    private String brandId;
    @NotBlank
    private String brandCode;
    @NotBlank
    private String brandName;

    private Integer brandStatus;
}
