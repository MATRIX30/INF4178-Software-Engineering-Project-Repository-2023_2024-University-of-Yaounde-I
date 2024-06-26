package com.actif.config.auth.authModels;

import lombok.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Data
@Builder
@Node
public class Permission {
    @Id
    @GeneratedValue
    private Long id;


    private String name;
}
