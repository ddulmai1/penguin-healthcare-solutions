package com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.services;

import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.model.Appointment;
import com.SWE_Team_Penguin.Penguin_Healthcare_Solutions.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment getAppointment(long id){
        return appointmentRepository.findById(id).get();
    }

    public Appointment setAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    public void removeAppointment(long id){
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAllAppointments(){
        return appointmentRepository.findAll();
    }
}
