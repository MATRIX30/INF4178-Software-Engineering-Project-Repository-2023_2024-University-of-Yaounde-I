package com.actif.customer;


import com.actif.config.auth.authModels.AccountSetting;
import com.actif.config.auth.services.AccountSettingService;
import com.actif.constains.ENTITY_STATUS;
import com.actif.customer.Dtos.CreateCustomerDto;
import com.actif.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
     PasswordEncoder passwordEncoder;


    @Autowired
    AccountSettingService accountSettingService;
    public Customer create(CreateCustomerDto request){
        var acc = AccountSetting.builder().build();
        AccountSetting accountSettingCreated = this.accountSettingService.save(acc);


        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setMail(request.getEmail());
        customer.setPhone(request.getPhone());
        //user.setRoles(rolesHashSet);
        customer.setStatus(ENTITY_STATUS.CREATED);
        customer.setVerificationCode(Utils.generatedRamdomCode(4));
        customer.setPassword(passwordEncoder.encode(request.getPassword() !=null ? request.getPassword() : request.getPhone()));
        customer.setRegion(request.getRegion());
        customer.setTown(request.getTown());
        customer.setCreatedAt(LocalDateTime.now());
        customer.setLastUpdatedOn(LocalDateTime.now());
        customer.setAccountSetting(accountSettingCreated);

        return this.customerRepository.save(customer);
    }

    public Page<Customer> getAll(int page, int size){
        return this.customerRepository.findAll(PageRequest.of(page, size));
    }

    public Optional<Customer> getById(Long id){
        return this.customerRepository.findById(id);
    }
    public Optional<Customer> getByPhone(String phone){
        return this.customerRepository.findOneByPhone(phone);
    }
}
