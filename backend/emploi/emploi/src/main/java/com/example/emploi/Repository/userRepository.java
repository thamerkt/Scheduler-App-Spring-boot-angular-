package com.example.emploi.Repository;

import com.example.emploi.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface userRepository extends JpaRepository<user,Integer> {
    Optional<user> findByEmail(String email);
}
