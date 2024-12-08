package com.example.emploi.controller;

import com.example.emploi.Repository.ClassRepository;
import com.example.emploi.Repository.ClassroomRepository;
import com.example.emploi.Repository.ProfessorRepository;
import com.example.emploi.entity.Classe;
import com.example.emploi.entity.Classroom;
import com.example.emploi.entity.Event;
import com.example.emploi.Repository.EventRepository;
import com.example.emploi.entity.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventRepository EventRepository;
    @Autowired
    private ClassRepository classeRepository;
    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private ProfessorRepository professorRepository;
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        try {
            // Handle Classe entity
            if (event.getClasse() != null) {
                // Check if Classe exists by name
                Classe existingClasse = classeRepository.findByName(event.getClasse().getName());

                if (existingClasse != null) {
                    // If the Classe exists, attach it to the Event
                    event.setClasse(existingClasse);
                } else {
                    // If the Classe does not exist, save the new Classe first
                    classeRepository.save(event.getClasse());
                    // Then attach it to the Event
                    event.setClasse(event.getClasse());
                }
            }

            // Handle Classroom entity
            if (event.getClassroom() != null) {
                // Check if Classroom exists by number
                Classroom existingClassroom = classroomRepository.findByNumber(event.getClassroom().getNumber());

                if (existingClassroom != null) {
                    // If the Classroom exists, attach it to the Event
                    event.setClassroom(existingClassroom);
                } else {
                    // If the Classroom does not exist, save the new Classroom first
                    classroomRepository.save(event.getClassroom());
                    // Then attach it to the Event
                    event.setClassroom(event.getClassroom());
                }
            }

            // Handle Professor entity
            if (event.getProfessor() != null) {
                // Check if Professor exists by email
                Professor existingProfessor = professorRepository.findByEmail(event.getProfessor().getEmail());

                if (existingProfessor != null) {
                    // If the Professor exists, attach it to the Event
                    event.setProfessor(existingProfessor);
                } else {
                    // If the Professor does not exist, save the new Professor first
                    professorRepository.save(event.getProfessor());
                    // Then attach it to the Event
                    event.setProfessor(event.getProfessor());
                }
            }

            // Save the Event (now the related entities are properly attached)
            EventRepository.save(event);

            // Return the saved Event with HTTP 200 OK response
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            // Return 500 error if something goes wrong
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> Event = EventRepository.findById(id);
        return Event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping
    public List<Event> ListofAllEvent() {
        return EventRepository.findAll();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventdetails) {
        Optional<Event> Event = EventRepository.findById(id);
        if (Event.isPresent()) {
            Event EventToUpdate = Event.get();
            EventToUpdate.setTitle(eventdetails.getTitle());
            EventToUpdate.setEndDateTime(eventdetails.getEndDateTime());
            EventToUpdate.setStartDateTime(eventdetails.getStartDateTime());
            EventToUpdate.setProfessor(eventdetails.getProfessor());
            EventRepository.save(EventToUpdate);
            return ResponseEntity.ok(EventToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        EventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
