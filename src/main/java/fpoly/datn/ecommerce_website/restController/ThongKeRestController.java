package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.TopCustomersDTO;
import fpoly.datn.ecommerce_website.dto.TopProductsDTO;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.service.IThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class ThongKeRestController {

    @Autowired
    private IThongKeService thongKeService;

    @GetMapping("/thong-ke/amount-bill-amount-product")
    public Map<String, BigDecimal> getBillStatisticsByDateRange(
            @RequestParam(name ="startDate", defaultValue = "0001-01-01") String startDateStr,
            @RequestParam(name ="endDate", defaultValue = "9999-01-01") String endDateStr){
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = dateFormat.parse(startDateStr);
            Date endDate = dateFormat.parse(endDateStr);
            List<Bills> bills = thongKeService.getBillsByDateRange(startDate, endDate);
            int totalProductAmount = thongKeService.sumProductAmountByDateRange(startDate, endDate);
            int totalBillCount = bills.size();
            int totalStaffs = thongKeService.countStaffs();
            BigDecimal priceThisMonth = thongKeService.calculateTotalPriceThisMonth();
            BigDecimal priceLastMonth = thongKeService.calculateTotalPriceLastMonth();

            BigDecimal tiLeDoanhThu = BigDecimal.ZERO;
            if (priceLastMonth.compareTo(BigDecimal.ZERO) != 0) {
                tiLeDoanhThu = priceThisMonth.divide(priceLastMonth, 5, RoundingMode.HALF_UP)
                        .subtract(BigDecimal.ONE)
                        .multiply(new BigDecimal(100));
            }

            Map<String, BigDecimal> response = new HashMap<>();
            response.put("totalBillsCount", BigDecimal.valueOf(totalBillCount));
            response.put("totalStaffsCount", BigDecimal.valueOf(totalStaffs));
            response.put("totalProductAmount", BigDecimal.valueOf(totalProductAmount));
            response.put("doanhThuSoVoiThangTruoc", tiLeDoanhThu);
            return response;
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/thong-ke/total-prices-by-day")
    public List<Object[]> getTotalPricesByDay(
            @RequestParam(name ="month", defaultValue = "") String month,
            @RequestParam(name ="year", defaultValue = "") String year) {
        return thongKeService.findTotalPricesByDay(month, year);
    }

    @GetMapping("/thong-ke/top-customer")
    public ResponseEntity<List<TopCustomersDTO>> getTopStaffsByTotalPrice() {
        List<TopCustomersDTO> topCustomers = thongKeService.getTopCustomersByTotalPrice();
        return new ResponseEntity<>(topCustomers, HttpStatus.OK);
    }

    @GetMapping("/thong-ke/top-product")
    public ResponseEntity<List<TopProductsDTO>> getTopProduct() {
        List<TopProductsDTO> topProduct = thongKeService.findTopProductsByTotalAmount();
        return new ResponseEntity<>(topProduct, HttpStatus.OK);
    }


}