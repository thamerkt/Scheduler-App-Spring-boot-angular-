package com.example.emploi.controller;


import com.example.emploi.entity.Classe;  // Make sure to use the correct Class entity
import com.example.emploi.Repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/classes")  // Updated endpoint for clarity
public class ClassController {

    @Autowired
    private ClassRepository classRepository;

    @PostMapping
    public Classe createClass(@RequestBody Classe classEntity) {
        return classRepository.save(classEntity);  // Use the correct repository
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classe> getClassById(@PathVariable Long id) {
        Optional<Classe> classOptional = classRepository.findById(id);  // Use the correct repository
        return classOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Classe> listAllClasses() {
        return classRepository.findAll();  // Use the correct repository
    }

    @PutMapping("/{id}")
    public ResponseEntity<Classe> updateClass(@PathVariable Long id, @RequestBody Classe classDetails) {
        Optional<Classe> classOptional = classRepository.findById(id);  // Use the correct repository
        if (classOptional.isPresent()) {
            Classe classToUpdate = classOptional.get();
            classToUpdate.setName(classDetails.getName());
            classRepository.save(classToUpdate);  // Use the correct repository
            return ResponseEntity.ok(classToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClass(@PathVariable Long id) {
        if (classRepository.existsById(id)) {  // Check if the class exists before deleting
            classRepository.deleteById(id);  // Use the correct repository
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

