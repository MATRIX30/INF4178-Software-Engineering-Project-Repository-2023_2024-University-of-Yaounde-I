package com.actif.config.auth.authModels;

import lombok.*;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Data
@Builder
@Node
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue()
    private Long id;

   // @Column(nullable = false, unique = true)
    private String name;

    @Relationship(type = "HAS_PERMISSIONS" )
    private  Set<Permission> permissions = new HashSet<>();

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions().stream().map(permission -> new SimpleGrantedAuthority(permission.getName())).collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.getName()));
        return authorities;
    }

}
