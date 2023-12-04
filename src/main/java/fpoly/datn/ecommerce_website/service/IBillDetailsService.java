package fpoly.datn.ecommerce_website.service;

import fpoly.datn.ecommerce_website.dto.BillDetailsDTO;
import fpoly.datn.ecommerce_website.dto.BillDetailsQDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.ProductDetails;
import org.springframework.data.domain.Page;

import java.util.List;


public interface IBillDetailsService {
    List<BillDetailsDTO> getAll();

    Page<BillDetailsDTO> getPagination(int pageNum, int pageSize);

    BillDetailsDTO getOne(String id);

    List<BillDetails> findAllByBillId(String billID) ;


    BillDetailsDTO save(BillDetailsDTO billDetailsDTO);

    BillDetailsDTO update(BillDetailsDTO billDetailsDTO);

    Boolean delete(String id);
}
