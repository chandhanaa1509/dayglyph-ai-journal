package com.dayglyph.service;

import com.dayglyph.entity.Journal;

import java.util.List;
import java.util.Optional;

public interface JournalService {

    Journal saveJournal(Journal journal);

    List<Journal> getAllJournals(String userEmail);

    Optional<Journal> getJournalById(String id);

    Journal updateJournal(
            String id,
            String content
    );

    void deleteJournal(String id);

}