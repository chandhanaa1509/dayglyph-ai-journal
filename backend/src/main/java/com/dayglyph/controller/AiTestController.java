package com.dayglyph.controller;

import com.dayglyph.ai.service.AIService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiTestController {

    private final AIService aiService;

    public AiTestController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/api/ai/test")
    public String testAI() {

        String prompt = """
                Say hello to DayGlyph in one short sentence.
                """;

        return aiService.generateContent(prompt);
    }
}