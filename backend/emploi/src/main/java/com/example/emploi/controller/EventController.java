package com.example.emploi.controller;

import com.example.emploi.entity.Event;
import com.example.emploi.entity.Professor;
import com.example.emploi.repository.EventRepository;
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
    @PostMapping
    public Event createEvent(@RequestBody Event Event) {
        return EventRepository.save(Event);
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
    public ResponseEntity<Professor> updateProfessor(@PathVariable Long id, @RequestBody Event eventdetails) {
        Optional<Event> Event = EventRepository.findById(id);
        if (Event.isPresent()) {
            Event EventToUpdate = Event.get();
            EventToUpdate.setTitle(eventdetails.getTitle());
            EventToUpdate.setEndDateTime(eventdetails.getEndDateTime());
            EventToUpdate.setStartDateTime(eventdetails.getStartDateTime());
            EventToUpdate.setProfessor(eventdetails.getProfessor());
            EventRepository.save(EventToUpdate);
            return ResponseEntity.ok(EventToUpdate.getProfessor());
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
