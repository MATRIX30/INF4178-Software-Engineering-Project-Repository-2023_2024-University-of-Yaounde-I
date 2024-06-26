package com.actif.config.auth.authModels;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;

@Data
@Builder
@Node
public class AccountSetting {
    @Id
    @GeneratedValue
    private Long id;



}
