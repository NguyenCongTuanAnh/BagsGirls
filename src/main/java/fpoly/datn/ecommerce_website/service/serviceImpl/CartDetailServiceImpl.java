package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.BillDetailsDTO;
import fpoly.datn.ecommerce_website.dto.CartDetailDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.CartDetails;
import fpoly.datn.ecommerce_website.repository.ICartDetailRepository;
import fpoly.datn.ecommerce_website.service.CartDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private ICartDetailRepository iCartDetailRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CartDetails> getAll(){
        List<CartDetails> list = iCartDetailRepository.findAll();
        return list;
    }


    @Override
    public CartDetailDTO addToCart(CartDetailDTO cartDetailDTO) {
        CartDetails cartDetails = modelMapper.map(cartDetailDTO, CartDetails.class);
        CartDetails savedCartDetails = iCartDetailRepository.save(cartDetails);
        return modelMapper.map(savedCartDetails, CartDetailDTO.class);
    }
}
