package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.BillsDTO;
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

import java.text.DateFormat;
import java.time.LocalDate;
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
            @RequestParam(name ="startDate", defaultValue = "0001/01/01") Date startDate,
            @RequestParam(name ="endDate", defaultValue = "9999/01/01") Date endDate){
        return new ResponseEntity<>(this.billService.getAllBillsPagination(startDate, endDate, status, search, pageNum, pageSize), HttpStatus.OK);
    }

    @RequestMapping(value = "/bills", method = RequestMethod.POST)
    public ResponseEntity<?> save(
            @RequestBody BillsDTO billsDTO) {
        return new ResponseEntity<>(this.billService.save(billsDTO), HttpStatus.OK);
    }
}
