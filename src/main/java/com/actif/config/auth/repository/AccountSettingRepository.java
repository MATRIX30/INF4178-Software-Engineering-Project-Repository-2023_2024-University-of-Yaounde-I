package com.actif.config.auth.repository;


import com.actif.config.auth.authModels.AccountSetting;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface AccountSettingRepository extends Neo4jRepository<AccountSetting,Long> {
}
