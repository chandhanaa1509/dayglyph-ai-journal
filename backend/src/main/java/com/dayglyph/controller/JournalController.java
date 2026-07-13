package com.dayglyph.controller;

import com.dayglyph.dto.request.CreateJournalRequest;
import com.dayglyph.dto.request.UpdateJournalRequest;
import com.dayglyph.dto.response.ApiResponse;
import com.dayglyph.entity.Journal;
import com.dayglyph.service.JournalService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journals")
@CrossOrigin(origins = "http://localhost:5173")
public class JournalController {

    private final JournalService journalService;

    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @PostMapping
    public ApiResponse<Journal> createJournal(
            @RequestBody CreateJournalRequest request,
            Authentication authentication
    ) {

        Journal journal = Journal.builder()
                .userEmail(authentication.getName())
                .content(request.getContent())
                .aiGenerated(false)
                .build();

        Journal savedJournal = journalService.saveJournal(journal);

        return ApiResponse.success(
                "Journal created successfully.",
                savedJournal
        );
    }

    @GetMapping
    public ApiResponse<List<Journal>> getAllJournals(
            Authentication authentication
    ) {

        return ApiResponse.success(
                "Journals fetched successfully.",
                journalService.getAllJournals(authentication.getName())
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<Journal> getJournalById(
            @PathVariable String id
    ) {

        return ApiResponse.success(
                "Journal fetched successfully.",
                journalService.getJournalById(id).get()
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<Journal> updateJournal(
            @PathVariable String id,
            @RequestBody UpdateJournalRequest request
    ) {

        Journal updatedJournal = journalService.updateJournal(
                id,
                request.getContent()
        );

        return ApiResponse.success(
                "Journal updated successfully.",
                updatedJournal
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteJournal(
            @PathVariable String id
    ) {

        journalService.deleteJournal(id);

        return ApiResponse.success(
                "Journal deleted successfully."
        );
    }
}