package com.example.emploi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloc;
    private int number;
    private String Type;

    // Getters and Setters

    public String getBloc() {
        return bloc;
    }

    public void setBloc(String bloc) {
        this.bloc = String.valueOf(bloc);
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        this.Type = type;
    }
}
