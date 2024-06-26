package com.actif.config.auth.authModels;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Data
@Builder
@Node
public class Token {

    @Id
    @GeneratedValue
    public Long id;

    //@Column(unique = true)
    public String token;

   // @Enumerated(EnumType.STRING)
    public TokenType tokenType = TokenType.BEARER;

    public boolean revoked;

    public boolean expired;


    @Relationship(type = "TOKEN_FOR" )
    public User account;
}