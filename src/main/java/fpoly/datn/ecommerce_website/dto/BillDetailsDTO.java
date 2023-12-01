    package fpoly.datn.ecommerce_website.dto;

    import fpoly.datn.ecommerce_website.entity.Bills;
    import fpoly.datn.ecommerce_website.entity.ProductDetails;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.ToString;

    import java.util.List;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    @Setter
    @Getter
    public class BillDetailsDTO {

        private String billDetailId;

        private String billId;

        private List<ProductDetails> productDetails;

        private Bills bills;

    //    private ProductDetails productDetails;

        private Integer amount;

        private Double price;
    }
