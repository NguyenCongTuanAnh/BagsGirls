package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.ImageDTO;
import fpoly.datn.ecommerce_website.dto.ProductDetailDTO;
import fpoly.datn.ecommerce_website.entity.ProductDetails;
import fpoly.datn.ecommerce_website.repository.IProductDetailRepository;
import fpoly.datn.ecommerce_website.service.IProductDetalisService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements IProductDetalisService {

    @Autowired
    private IProductDetailRepository iProductDetailRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<ProductDetailDTO> findAll() {
        return this.iProductDetailRepository.findAll().stream()
                .map(productDetails -> modelMapper.map(productDetails, ProductDetailDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDetails> findAllByProductCode(String productCode) {
        return this.iProductDetailRepository.findAllByProductCode(productCode);
    }

    public List<ProductDetails> findAllByProductId(String productId) {
        return this.iProductDetailRepository.findAllByProductId(productId);
    }
    @Override
    public ProductDetails findById(String id) {
        Optional<ProductDetails> optional = iProductDetailRepository.findById(id);
        return optional.get();
    }


    @Override
    public ProductDetailDTO save(ProductDetailDTO entity) {
        ProductDetails productDetails = iProductDetailRepository.save(modelMapper.map(entity, ProductDetails.class));
        return modelMapper.map(productDetails, ProductDetailDTO.class);
    }


    @Override
    public ProductDetails update(ProductDetails entity) {
        return iProductDetailRepository.save(entity);
    }


    @Override
    public String delete(String id) {
        iProductDetailRepository.deleteById(id);
        return "Delete successfully";
    }


    @Override
    public List<ProductDetails> searchByName(String name) {
        return null;
    }

    @Override
    public List<ProductDetails> findByKeyword(String keyword) {

        return this.iProductDetailRepository.findByKeyword(keyword);
    }
}
