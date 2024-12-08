package com.example.emploi.controller;

import com.example.emploi.entity.Classroom;
import com.example.emploi.Repository.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {
    @Autowired
    ClassroomRepository ClassroomRepository;
    @PostMapping
    public Classroom createProfessor(@RequestBody Classroom classroom) {
        return ClassroomRepository.save(classroom);
    }
    @GetMapping
    public List show(){
        return ClassroomRepository.findAll();
    }
    @RequestMapping("/{id}")
    public ResponseEntity<Classroom> getClassroomById(@PathVariable Long id) {
        Optional<Classroom> classroom = ClassroomRepository.findById(id);
        return classroom.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
        public ResponseEntity<Classroom> UpdateClassroom(@PathVariable Long id, @RequestBody Classroom classroomdetails) {
        Optional<Classroom> classroom = ClassroomRepository.findById(id);
        if (classroom.isPresent()) {
            Classroom classroom1 = classroom.get();
            classroom1.setBloc(classroomdetails.getBloc());
            classroom1.setNumber(classroomdetails.getNumber());
            classroom1.setType(classroomdetails.getType());
            ClassroomRepository.save(classroom1);
            return ResponseEntity.ok(classroom1);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> Delete(@PathVariable Long id){
        ClassroomRepository.deleteById(id);
        return ResponseEntity.noContent().build();



    }

}
