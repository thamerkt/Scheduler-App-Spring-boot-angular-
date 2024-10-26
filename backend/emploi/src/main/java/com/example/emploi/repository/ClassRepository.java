package com.example.emploi.repository;
import com.example.emploi.entity.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<Classe, Long> {
    // You can define custom query methods here if needed
}
