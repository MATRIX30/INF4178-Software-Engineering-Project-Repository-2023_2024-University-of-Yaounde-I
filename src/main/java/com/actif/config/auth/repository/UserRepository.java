package com.actif.config.auth.repository;



import com.actif.config.auth.authModels.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserRepository extends Neo4jRepository<User, Long> {

    public List<User> findAllByOrderByIdDesc();
    public List<User> findAllByStatus(Long status);

   // @Query(value = "SELECT * FROM user u WHERE u.mail=:mail LIMIT 1", nativeQuery = true)
    public Optional<User> findByMail(String mail);

    //@Query(value = "SELECT * FROM user u WHERE u.user_id=:userId LIMIT 1", nativeQuery = true)
    public Optional<User> findByUserId(String userId);

    //public Optional<User> findByMail(String mail);

    //@Query("match (n:User) WHERE n.phone=$phone  return n, collect(LABELS(n))")
    public Optional<User> findOneByPhone(String phone);

    @Query("match (n:User) WHERE n.phone=$phone  return LABELS(n) Limit 1 ")
    public List<Object>  findLabels(String phone);

    //@Query(value = "SELECT * FROM user u WHERE u.first_name=:username LIMIT 1", nativeQuery = true)
    public User findByFirstName(String username);

   // @Query(value = "SELECT * FROM user u WHERE u.password=:password LIMIT 1", nativeQuery = true)
    public User findByPassword(String password);
    //@Query(value = "SELECT * FROM user u WHERE u.mail=:mail and u.password=:password LIMIT 1", nativeQuery = true)
    public User findByMailAndPassword(String mail, String password);


    public long count();

    public Optional<User> findByUserIdAndVerificationCode(String userId, String verificationCode);
    public Optional<User> findByPhoneAndVerificationCode(String userId, String verificationCode);

    Optional<User> findByMailOrPhone(String email, String phone);
    // @Query(value = "SELECT u.* FROM user u, user_roles ur, role r WHERE u.id=ur.user_id AND r.id=ur.role_id AND r.id=:roleId", nativeQuery = true)
  //  @Query(value = "SELECT  u , COUNT(em.id) AS nbEmpl FROM User u LEFT JOIN Employer em ON u.id = em.creator.id LEFT JOIN u.roles ur LEFT JOIN  Role r ON r.id=ur.id WHERE  r.id=:roleId GROUP BY u.id")
  //  List<Object> findAllByRoleAndCount(Long roleId);


   // @Query(value = "SELECT u.* FROM user u, user_roles ur, role r WHERE u.id=ur.user_id AND r.id=ur.role_id AND r.id=:roleId", nativeQuery = true)
  //  List<User> findAllByRole(Long roleId);

}





