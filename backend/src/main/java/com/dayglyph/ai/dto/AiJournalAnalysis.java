package com.dayglyph.ai.dto;

import java.util.List;

public class AiJournalAnalysis {

    private String summary;

    private String mood;

    private String sentiment;

    private List<String> tags;

    private String asciiArt;

    public AiJournalAnalysis() {
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getAsciiArt() {
        return asciiArt;
    }

    public void setAsciiArt(String asciiArt) {
        this.asciiArt = asciiArt;
    }
}