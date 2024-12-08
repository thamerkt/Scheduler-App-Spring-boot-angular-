package com.example.emploi.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endDateTime;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false) // Foreign key for professor
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "number", nullable = false) // Foreign key for classroom
    private Classroom classroom;

    @ManyToOne(cascade = CascadeType.ALL)  // Use CascadeType.ALL to persist the related 'Classe' automatically
    @JoinColumn(name = "name", nullable = false)
    private Classe classe;

    // Default constructor
    public Event() {}

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public Professor getProfessor() {
        return professor;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public Classe getClasse() {
        return classe;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }
}
