package com.example.emploi.controller;

import com.example.emploi.Repository.ProfessorRepository;
import com.example.emploi.entity.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    // Get Professor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Professor> getProfessorById(@PathVariable Long id) {
        Optional<Professor> professor = professorRepository.findById(id);
        return professor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("")
    public ResponseEntity<?> addProfessor(@RequestBody Professor newProfessor){
        try{
            professorRepository.save(newProfessor);
            return ResponseEntity.ok("Professor added succeffuly");


        }catch (Exception e){
            return ResponseEntity.internalServerError().body("error:"+ e.getMessage());


        }
    }

    // List All Professors
    @GetMapping
    public List<Professor> listAllProfessors() {
        return professorRepository.findAll();
    }

    // Update Professor by ID
    @PutMapping("/{id}")
    public ResponseEntity<Professor> updateProfessor(@PathVariable Long id, @RequestBody Professor professorDetails) {
        Optional<Professor> professorOptional = professorRepository.findById(id);

        if (professorOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Professor professor = professorOptional.get();
        professor.setName(professorDetails.getName());
        professor.setSubject(professorDetails.getSubject());
        professor.setCin(professorDetails.getCin());
        professor.setEmail(professorDetails.getEmail());


        Professor updatedProfessor = professorRepository.save(professor);
        return ResponseEntity.ok(updatedProfessor);
    }

    // Delete Professor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        Optional<Professor> professorOptional = professorRepository.findById(id);

        if (professorOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        professorRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }
}
