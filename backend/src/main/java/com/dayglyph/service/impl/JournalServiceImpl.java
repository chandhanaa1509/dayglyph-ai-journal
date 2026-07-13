package com.dayglyph.service.impl;

import com.dayglyph.ai.dto.AiJournalAnalysis;
import com.dayglyph.ai.service.GroqService;
import com.dayglyph.entity.Journal;
import com.dayglyph.exception.JournalNotFoundException;
import com.dayglyph.repository.JournalRepository;
import com.dayglyph.service.JournalService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JournalServiceImpl implements JournalService {

    private final JournalRepository journalRepository;
    private final GroqService groqService;

    public JournalServiceImpl(
            JournalRepository journalRepository,
            GroqService groqService
    ) {
        this.journalRepository = journalRepository;
        this.groqService = groqService;
    }

    @Override
    public Journal saveJournal(Journal journal) {

        LocalDateTime now = LocalDateTime.now();

        if (journal.getCreatedAt() == null) {
            journal.setCreatedAt(now);
        }

        journal.setUpdatedAt(now);

        AiJournalAnalysis analysis =
                groqService.analyzeJournal(journal.getContent());

        journal.setSummary(analysis.getSummary());
        journal.setMood(analysis.getMood());
        journal.setSentiment(analysis.getSentiment());
        journal.setTags(analysis.getTags());
        journal.setAsciiArt(analysis.getAsciiArt());

        journal.setAiGenerated(true);

        return journalRepository.save(journal);
    }

    @Override
    public List<Journal> getAllJournals(String userEmail) {
        return journalRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }

    @Override
    public Optional<Journal> getJournalById(String id) {

        if (!journalRepository.existsById(id)) {
            throw new JournalNotFoundException(id);
        }

        return journalRepository.findById(id);
    }

    @Override
    public Journal updateJournal(String id, String content) {

        Journal journal = journalRepository.findById(id)
                .orElseThrow(() -> new JournalNotFoundException(id));

        journal.setContent(content);

        AiJournalAnalysis analysis =
                groqService.analyzeJournal(content);

        journal.setSummary(analysis.getSummary());
        journal.setMood(analysis.getMood());
        journal.setSentiment(analysis.getSentiment());
        journal.setTags(analysis.getTags());
        journal.setAsciiArt(analysis.getAsciiArt());

        journal.setAiGenerated(true);
        journal.setUpdatedAt(LocalDateTime.now());

        return journalRepository.save(journal);
    }

    @Override
    public void deleteJournal(String id) {

        if (!journalRepository.existsById(id)) {
            throw new JournalNotFoundException(id);
        }

        journalRepository.deleteById(id);
    }
}