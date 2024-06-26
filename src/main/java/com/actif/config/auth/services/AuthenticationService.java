package com.actif.config.auth.services;


import com.actif.POC.POC;
import com.actif.POC.POCService;
import com.actif.config.auth.JwtService;
import com.actif.config.auth.authModels.*;
import com.actif.config.auth.payload.request.*;
import com.actif.config.auth.repository.RoleRepository;
import com.actif.config.auth.repository.TokenRepository;
import com.actif.config.auth.repository.UserRepository;
import com.actif.constains.ENTITY_STATUS;
import com.actif.customer.Customer;
import com.actif.customer.CustomerService;
import com.actif.customer.Dtos.CreateCustomerDto;
import com.actif.livreur.Livreur;
import com.actif.livreur.LivreurService;
import com.actif.utils.Utils;
import com.google.common.net.HttpHeaders;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final TokenRepository tokenRepository;

    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final AccountSettingService accountSettingService;

    @Autowired
    private final LivreurService livreurService;
    @Autowired
    private final POCService pocService;

    @Autowired
    private final CustomerService customerService;

    public User setRole(Long id, Set<Role> roles) {

        Optional<User> user = userService.findById(id);
        if (user.isEmpty()) {
            return null;
        }
        //  user.get().setRoles((List<Role>) roles);

        return userService.save(user.get());
    }


    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println("request" + request);
        Optional<User> userFoundMail = this.userRepository.findByMailOrPhone(request.getEmail(), request.getPhone());
        List<Role> roles = new ArrayList<>();
        if (userFoundMail.isPresent()) {
            return AuthenticationResponse.builder().status(400L).message("Email or phone already used").build();
        }
        for (int i = 0; i < request.getRoles().size(); i++) {
            Optional<Role> roleGetByName = roleRepository.findByName(request.getRoles().get(i));
            if (roleGetByName.isPresent()) {
                if (!roles.contains(roleGetByName.get())) {
                    roles.add(roleGetByName.get());
                }
            } else {
                Role newRole = Role.builder().build();
                newRole.setName(request.getRoles().get(i));
                Role roleCreated = roleRepository.save(newRole);
                if (!roles.contains(roleCreated)) {
                    roles.add(roleCreated);
                }
            }
        }
        List<Role> rolesHashSet = new ArrayList<>();


        String rstr = Utils.generateRandomString(7);
        Optional<User> userFound = this.userRepository.findByUserId(rstr);
        if (userFound.isPresent()) {
            return AuthenticationResponse.builder().status(400L).message("Already userID").build();
        }
        var acc = AccountSetting.builder().build();
        AccountSetting accountSettingCreated = this.accountSettingService.save(acc);
        User user = new User();
        user.setFirstName(request.getFirstname());
        user.setLastName(request.getLastname());
        user.setMail(request.getEmail());
        user.setPhone(request.getPhone());
        // user.setRoles(rolesHashSet);
        user.setStatus(ENTITY_STATUS.CREATED);
        user.setVerificationCode(Utils.generatedRamdomCode(4));
        user.setUserId(rstr);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        var user = Account.builder()
//                .firstName(request.getFirstname())
//                .lastName(request.getLastname())
//                .mail(request.getEmail())
//                .phone(request.getPhone())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .roles(rolesHashSet)
//                .status(ENTITY_STATUS.CREATED)
//                .userId(rstr)
//                .code(Utils.generatedRamdomCode(4))
//                //.accountSetting(accountSettingCreated)
//              //  .synchro(synchroCreated)
//                .build();


        var savedUser = userService.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        //System.out.println("Token" +jwtToken);
        return AuthenticationResponse.builder()
                //.acc(savedUser)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .status(201L)
                .build();
    }

    public AuthenticationResponse registerLivreur(RegisterLivreurRequest request) {
        System.out.println("request" + request);
        Optional<User> userFoundMail = this.userRepository.findByMailOrPhone(request.getEmail(), request.getPhone());
        List<Role> roles = new ArrayList<>();
        if (userFoundMail.isPresent()) {
            return AuthenticationResponse.builder().status(400L).message("Email or phone already used").build();
        }
        Optional<Role> roleGetByName = roleRepository.findByName(request.getRole());
        if (roleGetByName.isPresent()) {
            if (!roles.contains(roleGetByName.get())) {
                roles.add(roleGetByName.get());
            }
        }
        //List<Role> rolesHashSet = new ArrayList<>();


        String rstr = Utils.generateRandomString(7);
        Optional<User> userFound = this.userRepository.findByUserId(rstr);
        if (userFound.isPresent()) {

            return AuthenticationResponse.builder().status(400L).message("Already userID").build();
        }
        var acc = AccountSetting.builder().build();
        AccountSetting accountSettingCreated = this.accountSettingService.save(acc);

        Livreur livreur = new Livreur();
        livreur.setFirstName(request.getFirstname());
        livreur.setLastName(request.getLastname());
        livreur.setMail(request.getEmail());
        livreur.setPhone(request.getPhone());
        //user.setRoles(rolesHashSet);
        livreur.setStatus(ENTITY_STATUS.CREATED);
        livreur.setVerificationCode(Utils.generatedRamdomCode(4));
        livreur.setUserId(rstr);
        livreur.setPassword(passwordEncoder.encode(request.getPhone()));
        livreur.setRegion(request.getRegion());
        livreur.setTown(request.getTown());
        livreur.setLat(request.getLat());
        livreur.setLng(request.getLng());
        livreur.setCode(Utils.generatedRamdomCode(4));
        livreur.setCreatedAt(LocalDateTime.now());
        livreur.setLastUpdatedOn(LocalDateTime.now());
        livreur.setAccountSetting(accountSettingCreated);

//        var user = User.builder()
//                .firstName(request.getFirstname())
//                .lastName(request.getLastname())
//                .mail(request.getEmail())
//                .phone(request.getPhone())
//                .password(passwordEncoder.encode(request.getPhone()))
//                .roles(roles)
//                .status(ENTITY_STATUS.CREATED)
//                .userId(rstr)
//                .code(Utils.generatedRamdomCode(4))
//                //.accountSetting(accountSettingCreated)
//                //  .synchro(synchroCreated)
//                .build();


//        var savedUser = userService.save(user);
//        Livreur livreur = Livreur.builder().lat(request.getLat())
//                .lng(request.getLng())
//                .town(request.getTown())
//                .region(request.getRegion())
//                //.account(savedUser)
//                .code(Utils.generatedRamdomCode(10))
//                .build();
        //Livreur livreur1 = new Livreur().set;
        var livreurSaved = livreurService.create(livreur);

        var jwtToken = jwtService.generateToken(livreur);
        var refreshToken = jwtService.generateRefreshToken(livreur);
        saveUserToken(livreur, jwtToken);
        //System.out.println("Token" +jwtToken);
        return AuthenticationResponse.builder()
                .user(livreur)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .status(201L)
                .message("New Carrier created")
                .build();
    }


    public AuthenticationResponse registerPoc(RegisterPocRequest request) {
        System.out.println("request" + request);
        Optional<User> userFoundMail = this.userRepository.findByMailOrPhone(request.getEmail(), request.getPhone());
        List<Role> roles = new ArrayList<>();
        if (userFoundMail.isPresent()) {
            return AuthenticationResponse.builder().status(400L).message("Email or phone already used").build();
        }
//        Optional<Role> roleGetByName = roleRepository.findByName(request.getRole());
//        if(roleGetByName.isPresent()) {
//            if(!roles.contains(roleGetByName.get())) {
//                roles.add(roleGetByName.get());
//            }
//        }
        //List<Role> rolesHashSet = new ArrayList<>();


        String rstr = Utils.generateRandomString(7);
        Optional<User> userFound = this.userRepository.findByUserId(rstr);
        if (userFound.isPresent()) {

            return AuthenticationResponse.builder().status(400L).message("Already userID").build();
        }
        var acc = AccountSetting.builder().build();
        AccountSetting accountSettingCreated = this.accountSettingService.save(acc);

        POC poc = new POC();
        poc.setFirstName(request.getFirstname());
        poc.setLastName(request.getLastname());
        poc.setMail(request.getEmail());
        poc.setPhone(request.getPhone());
        //user.setRoles(rolesHashSet);
        poc.setStatus(ENTITY_STATUS.CREATED);
        poc.setVerificationCode(Utils.generatedRamdomCode(4));
        poc.setUserId(rstr);
        poc.setPassword(passwordEncoder.encode(request.getPassword()));
        poc.setRegion(request.getRegion());
        poc.setTown(request.getTown());
        poc.setLat(request.getLat());
        poc.setLng(request.getLng());
        poc.setPocPhones(request.getPocPhones());
        poc.setCode(Utils.generatedRamdomCode(4));
        poc.setCreatedAt(LocalDateTime.now());
        poc.setLastUpdatedOn(LocalDateTime.now());
        poc.setAccountSetting(accountSettingCreated);


        var createdPOc = pocService.create(poc);

        var jwtToken = jwtService.generateToken(createdPOc);
        var refreshToken = jwtService.generateRefreshToken(createdPOc);
        saveUserToken(createdPOc, jwtToken);
        //System.out.println("Token" +jwtToken);
        return AuthenticationResponse.builder()
                .user(createdPOc)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .status(201L)
                .message("New Carrier created")
                .build();
    }



    public AuthenticationResponse registerCustomer(CreateCustomerDto request) {
        System.out.println("request create customer" + request);
        Optional<User> userFoundMail = this.userRepository.findByMailOrPhone(request.getEmail(), request.getPhone());
        List<Role> roles = new ArrayList<>();
        if (userFoundMail.isPresent()) {
            return AuthenticationResponse.builder().status(400L).message("Email or phone already used").build();
        }



        var createdCustomer = this.customerService.create(request);

        var jwtToken = jwtService.generateToken(createdCustomer);
        var refreshToken = jwtService.generateRefreshToken(createdCustomer);
        saveUserToken(createdCustomer, jwtToken);
        //System.out.println("Token" +jwtToken);
        return AuthenticationResponse.builder()
                .user(createdCustomer)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .status(201L)
                .message("New createdCustomer created")
                .build();
    }





    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        System.out.println("request => " + request);
//   if(true){
//       Optional<Account> acc =userRepository.findByPhone(request.getPhone());
//       System.out.println("Account"+ acc);
//       return AuthenticationResponse.builder().message("Invalid userId or password").account( acc.isEmpty() ? null :  acc.get()).status(acc.isEmpty() ? 400L :200L).build();
//
//   }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getPhone(),
                            request.getPassword()
                            //request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return AuthenticationResponse.builder().message("Invalid userId or password").status(400L).build();
        }


        System.out.println(" after request => " + request);

        var user = userService.findByPhone(request.getPhone())
                .orElseThrow();
      //  List<Object> labels = userRepository.findLabels(request.getPhone());
//       System.out.println(labels);
//        List<String> originalString = labels.stream()
//                .map(Object::toString)
//                .collect(Collectors.toList());
//        String originalString = "[\"POC\", \"User\"]";
//        List<String> stringList = Arrays.stream(originalString.substring(1, originalString.length() - 1).split(","))
//                .map(str -> str.substring(1, str.length() - 1))
//                .collect(Collectors.toList());
//        System.out.println("Last res "+stringList);  // Output: [POC, User]


       // List<String> sss =   (List<String>) labels.get(0);
     //   System.out.println(stringList.get(0));

//        for (String s : sss){
//            System.out.println(s);
//        }
     // System.out.println(sss.get(0));
    //  user.setLabels(stringList);
        String jwtToken = null;
        String refreshToken = null;
        jwtToken = jwtService.generateToken(user);
        refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
//        if (user.isPhoneVerified()){
//             jwtToken = jwtService.generateToken(user);
//             refreshToken = jwtService.generateRefreshToken(user);
//            revokeAllUserTokens(user);
//            saveUserToken(user, jwtToken);
//        }

        // Optional<AccountSetting> accountSetting = this.accountSettingService.getById(user.getAccountSetting().getId());

//        if(accountSetting.isPresent()){
//            System.out.println("Mise à jour dernier connexion");
//            accountSetting.get().setLastSign(LocalDateTime.now());
//            this.accountSettingService.save(accountSetting.get());
//        }

        return AuthenticationResponse.builder()
                .message("Welcome back " + user.getLastName())
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .user(user)
                .jwtExpiration(jwtService.getJwtExpiration())
                .refreshExpiration(jwtService.getRefreshExpiration())
                .build();
    }


    public AuthenticationResponse verifyAccount(VerifyAccountRequest request) {
        System.out.println("request code ==>  " + request);
        Optional<User> userFound = this.userRepository.findByPhoneAndVerificationCode(request.getPhone(), request.getCode());
        if (userFound.isEmpty()) {
            return AuthenticationResponse.builder().status(400L).message("Invalid code").build();
        }
        userFound.get().setPhoneVerified(true);
        User updatedAccount = this.userRepository.save(userFound.get());
        return AuthenticationResponse.builder()
                .user(updatedAccount)

                .status(200L)
                .message("Successfully verified")
                .build();
    }

    private void saveUserToken(User account, String jwtToken) {
        var token = Token.builder()
                .account(account)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }


    private void revokeAllUserTokens(User account) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser((long) Math.toIntExact(account.getId()));
        // var validUserTokens = tokenRepository.findAll();
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }


    public AuthenticationResponse refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        AuthenticationResponse res = null;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userService.findByMail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                res = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .jwtExpiration(jwtService.getJwtExpiration())
                        .refreshExpiration(jwtService.getRefreshExpiration())
                        .build();
                System.out.println("refresh responser => " + res);
                //new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
        return res;

    }


}



