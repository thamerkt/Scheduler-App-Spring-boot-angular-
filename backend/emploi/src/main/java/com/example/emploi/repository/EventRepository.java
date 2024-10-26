package com.example.emploi.repository;
import com.example.emploi.entity.Event;
import com.example.emploi.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // You can define custom query methods here if needed
}
