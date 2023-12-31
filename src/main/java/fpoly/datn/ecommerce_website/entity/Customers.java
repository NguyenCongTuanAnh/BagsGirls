package fpoly.datn.ecommerce_website.entity;

import fpoly.datn.ecommerce_website.infrastructure.constant.Ranking;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "customers")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Setter
@Getter
public class Customers {

    @Id
    @Column(name = "customer_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String customerId;

    @Column(name = "customer_status")
    private Integer customerStatus;
    @Column(name = "customer_code")
    private String customerCode;

    @Column(name = "consume_points")
    private Integer consumePoints;
    @Column(name = "ranking_points")
    private Integer rankingPoints;
    @Column(name = "customer_ranking")
    private Ranking customerRanking;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private Users users;


}
