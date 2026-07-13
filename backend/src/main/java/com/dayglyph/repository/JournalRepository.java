package com.dayglyph.repository;

import com.dayglyph.entity.Journal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JournalRepository extends MongoRepository<Journal, String> {

    List<Journal> findByUserEmailOrderByCreatedAtDesc(String userEmail);

}