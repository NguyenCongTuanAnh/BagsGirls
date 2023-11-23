package fpoly.datn.ecommerce_website.restController;

import fpoly.datn.ecommerce_website.dto.ProductDetailDTO;
import fpoly.datn.ecommerce_website.service.serviceImpl.ProductDetailServiceImpl;
import jakarta.validation.Valid;
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
public class ProductDetailRestController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductDetailServiceImpl productDetailService;

    //getOne
    @RequestMapping(value = "/product-details/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getOne(@PathVariable String id) {
        return new ResponseEntity<>(
                modelMapper.map(this.productDetailService.findById(id), ProductDetailDTO.class)
                , HttpStatus.OK);
    }

    @RequestMapping(value = "/product-details/", method = RequestMethod.GET)
    public ResponseEntity<?> findAll() {

        return new ResponseEntity<>(
                this.productDetailService.findAll().stream()
                        .map(p -> modelMapper.map(p, ProductDetailDTO.class)).toList()
                , HttpStatus.OK);
    }

    //add
    @RequestMapping(value = "/product-details", method = RequestMethod.POST)
    public ResponseEntity<?> save(@Valid @RequestBody ProductDetailDTO productDetailDTO) {
        System.out.println(productDetailDTO);
        return new ResponseEntity<>(
                productDetailService.save(productDetailDTO)
                , HttpStatus.OK);
    }

//    //update
//    @RequestMapping(value = "/product-details", method = RequestMethod.PUT)
//    public ResponseEntity<?> update(@Valid @RequestBody Product_ProductDetailDTO balo_baloDetailDTO) {
//        return new ResponseEntity<>(
//                productDetailService.save(modelMapper.map(balo_baloDetailDTO, ProductDetails.class))
//                , HttpStatus.OK);
//    }
//
//    //delete
    @RequestMapping(value = "/product-detail", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@RequestParam String productDetailId) {
        productDetailService.delete(productDetailId);
        return new ResponseEntity<>("Delete successfully!", HttpStatus.OK);
    }
//
    @RequestMapping(value = "product-detail/{productCode}", method = RequestMethod.GET)
    public ResponseEntity<?> getAllbyproduct(@PathVariable String productCode) {
        return new ResponseEntity<>(
                this.productDetailService.findAllByProductId(productCode)
                        .stream()
                        .map(productDetail -> modelMapper.map(productDetail, ProductDetailDTO.class))
                        .collect(Collectors.toList())
                , HttpStatus.OK
        );

    }
//
//

    @RequestMapping(value = "/product-details/search", method = RequestMethod.GET)
    public ResponseEntity<?> findByKeyword(@RequestParam String keyword) {
        return new ResponseEntity<>(
                this.productDetailService.findByKeyword(keyword).stream()
                        .map(productDetail -> modelMapper.map(productDetail, ProductDetailDTO.class))
                        .collect(Collectors.toList())
                , HttpStatus.OK);
    }
//
//
//    @RequestMapping(value = "/product-detail/amount", method = RequestMethod.GET)
//    public ResponseEntity<?> updateAmount(
//            @RequestParam @NotNull String productDetailId,
//            @RequestParam @NotNull Integer amount) {
//        ProductDetails productDetails = this.productDetailService.findById(productDetailId);
//        productDetails.setProductDetailAmount(amount);
//
//        return new ResponseEntity<>(
//                modelMapper.map(this.productDetailService.save(productDetails), ProductDetailDTO.class)
//                , HttpStatus.OK);
//    }
}
