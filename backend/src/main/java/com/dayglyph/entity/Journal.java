package com.dayglyph.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "journals")
public class Journal {

    @Id
    private String id;

    // Owner of this journal
    private String userEmail;

    private String title;

    private String content;

    private String summary;

    private String mood;

    private String sentiment;

    private List<String> tags;

    private String reflection;

    private String quote;

    private String asciiArt;

    private boolean aiGenerated;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}