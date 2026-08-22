package com.flowpilot.flowpilot.superadmin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendWelcomeEmail(
            String recipientEmail,
            String name,
            String password,
            String role,
            String department,
            String designation
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(recipientEmail);

        message.setSubject(
                "Welcome to FlowPilot - Your Account Details"
        );

        message.setText(
                "Hello " + name + ",\n\n" +

                "Welcome to FlowPilot!\n\n" +

                "Your account has been created by the Super Administrator.\n\n" +

                "ACCOUNT DETAILS\n" +
                "-------------------------\n" +
                "Name: " + name + "\n" +
                "Email: " + recipientEmail + "\n" +
                "Role: " + role + "\n" +
                "Department: " + department + "\n" +
                "Designation: " + designation + "\n\n" +

                "LOGIN CREDENTIALS\n" +
                "-------------------------\n" +
                "Email: " + recipientEmail + "\n" +
                "Temporary Password: " + password + "\n\n" +

                "Please use these credentials to log in to FlowPilot.\n" +
                "For security, please change your password after your first login.\n\n" +

                "Regards,\n" +
                "FlowPilot Team"
        );

        mailSender.send(message);
    }
}