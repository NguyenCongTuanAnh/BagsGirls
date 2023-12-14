package fpoly.datn.ecommerce_website.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Setter
@Getter
public class Carts {
    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String cartId;

    @Column(name = "cart_code")
    private String cartCode;

    @Column(name = "cart_create_time")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date cartCreatTime;

    @Column(name = "cart_payment_time")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date cartPaymentTime;

    @Column(name = "cart_note")
    private String cartNote;

    @Column(name = "cart_status")
    private Integer cartStatus;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customers customers;

    @OneToMany(mappedBy = "carts", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("carts")
    private List<CartDetails> cartDetailsList = new ArrayList<>();

}
