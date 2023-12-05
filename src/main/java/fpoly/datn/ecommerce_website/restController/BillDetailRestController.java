package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.BillDetailsDTO;
import fpoly.datn.ecommerce_website.dto.ProductDetailDTO;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.service.IBillDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class BillDetailRestController {

    @Autowired
    private IBillDetailsService iBillDetailsService;
    @Autowired
    private ModelMapper modelMapper;

    @RequestMapping(value = "/bill-details/", method = RequestMethod.GET)
    public ResponseEntity<?> getAll(
            @RequestParam(required = false) Integer pageNum,
            @RequestParam(required = false) Integer pageSize) {
        if (pageNum == null && pageSize == null) {
            return new ResponseEntity<>(this.iBillDetailsService.getAll(), HttpStatus.OK);
        }
        return new ResponseEntity<>(this.iBillDetailsService.getPagination(pageNum, pageSize), HttpStatus.OK);
    }

    @RequestMapping(value = "/bill-details", method = RequestMethod.POST)
    public ResponseEntity<?> save(
            @RequestBody BillDetailsDTO billDetailsDTO) {
        System.out.println("billDetailsDTO.toString()");
        System.out.println(billDetailsDTO.toString());
        return new ResponseEntity<>(this.iBillDetailsService.save(billDetailsDTO), HttpStatus.OK);
    }

    @RequestMapping(value = "bill-detail/getBillDetailsByBillId", method = RequestMethod.GET)
    public ResponseEntity<?> getAllbyBillId(@RequestParam (name ="billId") String billId) {
        return new ResponseEntity<>(
                this.iBillDetailsService.findAllByBillId(billId)
                        .stream()
                        .map(billDetails -> modelMapper.map(billDetails, BillDetailsDTO.class))
                        .collect(Collectors.toList())
                , HttpStatus.OK
        );

    }

//    @RequestMapping(value = "bill-detail/getBillDetailsProductsById", method = RequestMethod.GET)
//    public ResponseEntity<?> getAllBillDetailProductsById(@RequestParam (name ="billId") String billId) {
//        return new ResponseEntity<>(
//                this.iBillDetailsService.findAllBillProduct(billId)
//                        .stream()
//                        .map(billDetails -> modelMapper.map(billDetails, BillDetailsDTO.class))
//                        .collect(Collectors.toList())
//                , HttpStatus.OK
//        );
//
//    }
}