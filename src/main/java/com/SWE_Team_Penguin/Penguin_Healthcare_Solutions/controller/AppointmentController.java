package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.controller;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Appointment;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}, allowCredentials = "true")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentService.setAppointment(appointment);
    }

    @GetMapping("/{id}")
    public Appointment getAppointment(@PathVariable long id){
        return appointmentService.getAppointment(id);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable long id, @RequestBody Appointment appointment){
        return appointmentService.setAppointment(appointment);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable long id){
        appointmentService.removeAppointment(id);
    }

    @GetMapping("/all/{id}")
    public List<Appointment> getAllAppointmentsById(@PathVariable long id){
        return appointmentService.getAllAppointmentsById(id);
    }
}
