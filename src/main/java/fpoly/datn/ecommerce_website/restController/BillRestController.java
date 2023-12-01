package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.BillDetailsDTO;
import fpoly.datn.ecommerce_website.dto.BillsDTO;
import fpoly.datn.ecommerce_website.service.IBillDetailsService;
import fpoly.datn.ecommerce_website.service.IBillService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BillRestController {

    @Autowired
    private IBillService billService;
    @Autowired
    private IBillDetailsService iBillDetailsService;

    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping(value = "/bills", method = RequestMethod.GET)
    public ResponseEntity<?> getAll(
            @RequestParam(required = false) Integer pageNum,
            @RequestParam(required = false) Integer pageSize) {
        if (pageNum == null && pageSize == null) {
            return new ResponseEntity<>(this.billService.getAll(), HttpStatus.OK);
        }
        return new ResponseEntity<>(this.billService.getPagination(pageNum, pageSize), HttpStatus.OK);
    }

    @RequestMapping(value = "/bills/pagination", method = RequestMethod.GET)
    public ResponseEntity<?> getAllPagination(
            @RequestParam(name = "page", defaultValue = "0") Integer pageNum,
            @RequestParam(name = "size", defaultValue = "15") Integer pageSize,
            @RequestParam(name ="status", defaultValue = "4") Integer status,
            @RequestParam(name ="search", defaultValue = "") String search,
            @RequestParam(name ="startDate", defaultValue = "0001-01-01") String startDateStr,
            @RequestParam(name ="endDate", defaultValue = "9999-01-01") String endDateStr,
            @RequestParam(name ="filterStaffName", defaultValue = "") String filterStaffName
    ) {

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = dateFormat.parse(startDateStr);
            Date endDate = dateFormat.parse(endDateStr);
            return new ResponseEntity<>(this.billService.getAllBillsPagination(filterStaffName, startDate, endDate, status, search, pageNum, pageSize), HttpStatus.OK);
        } catch (ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Lỗi khi chuyển đổi ngày", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/bills", method = RequestMethod.POST)
    public ResponseEntity<?> save(
            @RequestBody BillsDTO billsDTO) {
        return new ResponseEntity<>(this.billService.save(billsDTO), HttpStatus.OK);
    }

//    @PostMapping("/createbill")
//    public ResponseEntity<BillsDTO> createBill(@RequestBody BillsDTO billDTO) {
//        // Tạo một Bill mới
//        BillsDTO savedBill = billService.save(billDTO);
//
//        // Kiểm tra xem Bill có được tạo thành công không
//        if (savedBill != null) {
//            // Lấy ID của Bill vừa tạo
//            String billId = savedBill.getBillId();
//
//            // Lấy danh sách chi tiết sản phẩm từ BillDTO
//            List<BillDetailsDTO> billDetails = billDTO.getBillDetailsDTOS();
//
//            // Nếu danh sách chi tiết không rỗng và Bill ID có tồn tại
//            if (billDetails != null && billId != null) {
//                // Duyệt qua từng chi tiết và tạo BillDetail liên kết với Bill mới tạo
//                for (BillDetailsDTO detail : billDetails) {
//                    detail.setBillDetailId(billId); // Liên kết BillDetail với Bill mới tạo
//                    iBillDetailsService.save(detail); // Lưu BillDetail vào cơ sở dữ liệu
//                }
//            }
//
//            return new ResponseEntity<>(savedBill, HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }
}
