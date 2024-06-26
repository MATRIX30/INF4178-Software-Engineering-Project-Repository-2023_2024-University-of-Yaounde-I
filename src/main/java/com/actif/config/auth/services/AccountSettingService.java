package com.actif.config.auth.services;

import com.actif.config.auth.authModels.AccountSetting;
import com.actif.config.auth.repository.AccountSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountSettingService {
    @Autowired
    private AccountSettingRepository accountSettingRepository;


    public Optional<AccountSetting> getById(Long id){
        return accountSettingRepository.findById(id);
    }
    public AccountSetting save(AccountSetting accountSetting){
        return accountSettingRepository.save(accountSetting);
    }
    public AccountSetting update(AccountSetting accountSetting){
        return accountSettingRepository.save(accountSetting);
    }
}
