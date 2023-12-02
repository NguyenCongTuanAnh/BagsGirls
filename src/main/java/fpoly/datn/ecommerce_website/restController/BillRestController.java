package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.BillsDTO;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.service.IBillService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class BillRestController {

    @Autowired
    private IBillService billService;
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
            @RequestParam(name ="status", defaultValue = "") Integer status,
            @RequestParam(name ="search", defaultValue = "") String search,
            @RequestParam(name ="startDate", defaultValue = "0001-01-01") String startDateStr,
            @RequestParam(name ="endDate", defaultValue = "9999-01-01") String endDateStr
    ) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = dateFormat.parse(startDateStr);
            Date endDate = dateFormat.parse(endDateStr);
            return new ResponseEntity<>(this.billService.getAllBillsPagination( startDate, endDate, status, search, pageNum, pageSize), HttpStatus.OK);
        } catch (ParseException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Lỗi khi chuyển đổi ngày", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/bills/update-status", method = RequestMethod.PUT)
    public ResponseEntity<Bills> updateStatus(@RequestParam String id, @RequestParam int status) {
        return new ResponseEntity<>(billService.updateStatus(id, status),
                HttpStatus.OK);
    }

    @RequestMapping(value = "/bills", method = RequestMethod.POST)
    public ResponseEntity<?> save(
            @RequestBody BillsDTO billsDTO) {
        return new ResponseEntity<>(this.billService.save(billsDTO), HttpStatus.OK);
    }
}