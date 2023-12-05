package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.BillDetailsDTO;
import fpoly.datn.ecommerce_website.dto.BillDetailsQDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.ProductDetails;
import fpoly.datn.ecommerce_website.repository.IBillDetailRepository;
import fpoly.datn.ecommerce_website.service.IBillDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillDetailsServiceImpl implements IBillDetailsService {
    @Autowired
    private IBillDetailRepository iBillDetailRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BillDetailsDTO> getAll() {
        List<BillDetails> bills = this.iBillDetailRepository.findAll();
        return bills.stream()
                .map(bill -> modelMapper.map(bill, BillDetailsDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Page<BillDetailsDTO> getPagination( int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<BillDetails> bills = this.iBillDetailRepository.findAll(pageable);
        return bills.map(bill -> modelMapper.map(bill, BillDetailsDTO.class));
    }


    @Override
    public BillDetailsDTO getOne(String id) {
        BillDetails billDetails = this.iBillDetailRepository.getReferenceById(id);
        return modelMapper.map(billDetails, BillDetailsDTO.class);
    }

    @Override
    public List<BillDetails> findAllByBillId(String billID) {
        return this.iBillDetailRepository.findAllByBillId(billID);
    }

//    @Override
//    public List<BillDetails> findAllBillProduct(String billId) {
//        return this.iBillDetailRepository.findAllBillDetailsById(billId);
//    }

    @Override
    public BillDetailsDTO save(BillDetailsDTO billDetailsDTO) {
        BillDetails billDetails = modelMapper.map(billDetailsDTO, BillDetails.class);
        System.out.println(billDetails.toString());
        return modelMapper.map(this.iBillDetailRepository.save(billDetails), BillDetailsDTO.class);
    }

    @Override
    public BillDetailsDTO update(BillDetailsDTO billDetailsDTO) {
        BillDetails billDetails = modelMapper.map(billDetailsDTO, BillDetails.class);
        return modelMapper.map(this.iBillDetailRepository.save(billDetails), BillDetailsDTO.class);
    }

    @Override
    public Boolean delete(String id) {
        BillDetails billDetails = this.iBillDetailRepository.getReferenceById(id);
        if (billDetails != null) {
            this.iBillDetailRepository.delete(billDetails);
            return true;
        }
        return false;
    }
}
