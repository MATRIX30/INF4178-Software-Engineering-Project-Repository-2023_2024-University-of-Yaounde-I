package com.actif.config.auth.controller;


import com.actif.Response;
import com.actif.config.auth.authModels.AccountSetting;
import com.actif.config.auth.services.AccountSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/account-settings")
@RequiredArgsConstructor
public class AccountSettingController {
    @Autowired
    private final AccountSettingService accountSettingService;


    @GetMapping("/{id}")
    public ResponseEntity<Response> get(@PathVariable Long id) {
        Optional<AccountSetting> setting = this.accountSettingService.getById(id);

        if (setting.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Response.builder().message("accountSetting found !").data(setting.get()).build());
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Response> update(@PathVariable Long id, @RequestBody updateSettingRequest settingRequest) {
//        Optional<AccountSetting> setting = this.accountSettingService.getById(id);
//        if (setting.isEmpty()) {
//            return ResponseEntity.badRequest().body(Response.builder().message("setting not found").data(null).build());
//        }
//        AccountSetting accountSettingUp = AccountSetting.builder().id(id).showBadge(settingRequest.getShowBadge()).autoSync(settingRequest.getAutoSync()).build();
//        AccountSetting accountSetting = this.accountSettingService.update(accountSettingUp);
//
//        return ResponseEntity.ok(Response.builder().message("accountSetting updated !").data(accountSetting).build());
//    }

}
