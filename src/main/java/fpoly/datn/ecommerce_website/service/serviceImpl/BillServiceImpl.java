package fpoly.datn.ecommerce_website.service.serviceImpl;

import fpoly.datn.ecommerce_website.dto.BillsDTO;
import fpoly.datn.ecommerce_website.dto.BillsQDTO;
import fpoly.datn.ecommerce_website.entity.BillDetails;
import fpoly.datn.ecommerce_website.entity.Bills;
import fpoly.datn.ecommerce_website.entity.Customers;
import fpoly.datn.ecommerce_website.repository.IBillRepository;
import fpoly.datn.ecommerce_website.service.IBillService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements IBillService {
    @Autowired
    private IBillRepository iBillRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BillsDTO> getAll() {
        List<Bills> bills = this.iBillRepository.findAll();

        return bills.stream()
                .map(b -> modelMapper.map(b, BillsDTO.class))
                .toList();
//        return bills;
    }

    @Override
    public Page<BillsDTO> getPagination(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Bills> bills = this.iBillRepository.findAll(pageable);
        return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
    }

    @Override
    public Page<BillsDTO> getAllBillsPagination( Date startDate, Date endDate, Integer status, String search, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        if(status == 0){
            Page<Bills> bills = this.iBillRepository.findAllBillsBySearch(startDate, endDate, search, pageable);

            return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
        }else {
            Page<Bills> bills = this.iBillRepository.findAllBillsBySearchStatus(startDate, endDate, status, search, pageable);

            return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
        }
    }

    @Override
    public Page<BillsDTO> getAllBillsOffline(String filterStaffName, Date startDate, Date endDate, Integer status, String search, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        if(status == 0){
            if(search.trim().length()==0){
                Page<Bills> bills = this.iBillRepository.findAllBillOffNotSearch( startDate, endDate, search, filterStaffName, pageable);

                return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
            }else{
                Page<Bills> bills = this.iBillRepository.findAllBillsOffline( startDate, endDate, search, filterStaffName, pageable);

                return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
            }

        }else {
            if(search.trim().length()==0){
                Page<Bills> bills = this.iBillRepository.findAllBillOffStatusNotSearch( startDate, endDate, status, search, filterStaffName, pageable);

                return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
            }
            Page<Bills> bills = this.iBillRepository.findAllBillsOfflineStatus( startDate, endDate, status, search, filterStaffName, pageable);

            return bills.map(bill -> modelMapper.map(bill, BillsDTO.class));
        }
    }

    @Override
    public Bills updateStatus(String id, Integer status) {
        Bills bill = iBillRepository.findById(id).get();
        bill.setBillStatus(status);
        return this.iBillRepository.save(bill);
    }

    ;


    @Override
    public BillsDTO save(BillsDTO billsDTO) {
        Bills bills1 = this.iBillRepository.save(modelMapper.map(billsDTO, Bills.class));
        return modelMapper.map(bills1, BillsDTO.class);
    }

    @Override
    public BillsDTO getOne(String id) {
        Bills bills = this.iBillRepository.getReferenceById(id);
        if (bills == null) {
            return null;
        }
        return modelMapper.map(bills, BillsDTO.class);
    }

    @Override
    public BillsDTO update(BillsDTO billsDTO) {
        Bills bills = modelMapper.map(billsDTO, Bills.class);
        return modelMapper.map(this.iBillRepository.save(bills), BillsDTO.class);
    }

    @Override
    public Boolean delete(String id) {
        Bills bills = this.iBillRepository.getReferenceById(id);
        if (bills != null) {
            this.iBillRepository.delete(bills);
            return true;
        }
        return false;
    }
}
