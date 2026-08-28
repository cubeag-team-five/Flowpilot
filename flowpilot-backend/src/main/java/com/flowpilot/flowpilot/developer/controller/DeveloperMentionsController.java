package com.flowpilot.flowpilot.developer.controller;

import com.flowpilot.flowpilot.developer.dto.DeveloperMentionDto;
import com.flowpilot.flowpilot.developer.service.DeveloperMentionsService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/developer/mentions")
@RequiredArgsConstructor
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:3000"
        }
)
public class DeveloperMentionsController {

    private final DeveloperMentionsService developerMentionsService;

    @GetMapping
    public ResponseEntity<List<DeveloperMentionDto>> getAllMentions() {

        return ResponseEntity.ok(
                developerMentionsService.getAllMentions()
        );
    }
}