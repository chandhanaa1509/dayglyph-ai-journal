package com.dayglyph.ai.service;

import com.dayglyph.ai.dto.AiJournalAnalysis;
import com.dayglyph.config.GroqProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GroqService implements AIService {

    private final GroqProperties groqProperties;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public GroqService(GroqProperties groqProperties) {
        this.groqProperties = groqProperties;
        this.restClient = RestClient.create();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String generateContent(String prompt) {

        try {

            Map<String, Object> requestBody = Map.of(
                    "model", groqProperties.getModel(),
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )
                    ),
                    "temperature", 0
            );

            String response = restClient.post()
                    .uri(groqProperties.getApiUrl())
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            "Bearer " + groqProperties.getApiKey()
                    )
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(response);

            return root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error communicating with Groq API.";
        }
    }

    public AiJournalAnalysis analyzeJournal(String journalText) {

        String prompt = """
You are DayGlyph AI.

Analyze the journal.

Return ONLY valid JSON.

Never use markdown.

Never use ```.

Return exactly this structure.

{
  "summary":"...",
  "mood":"Happy",
  "sentiment":"Positive",
  "tags":["tag1","tag2","tag3"],
  "asciiArt":"..."
}

RULES

Summary:
- One short sentence.

Mood:
Choose ONLY one:

Happy
Sad
Calm
Excited
Hopeful
Love
Neutral
Stressed

Sentiment:
Choose ONLY one:

Positive
Neutral
Negative

Tags:
- Exactly 3
- lowercase
- one word each

ASCII Art:
Choose EXACTLY ONE from the library below.
Return ONLY the chosen glyph.
Do not modify it.
Do not create your own.


Happy:
٩(◕‿◕)۶

Sad:
(っ╥╯﹏╰╥)っ

Calm:
(ᵕ≀ ᵕ )

Excited:
(^o^)

Hopeful:
(•‿•)✧


Love:
♡(⸝⸝ᵕᴗᵕ⸝⸝)♡

Neutral:
(•_•)

Stressed:
(✖╭╮✖)

Journal:

%s
""".formatted(journalText);

        String aiResponse = generateContent(prompt);

        aiResponse = aiResponse
                .replace("```json", "")
                .replace("```", "")
                .trim();

        try {

            AiJournalAnalysis analysis =
                    objectMapper.readValue(
                            aiResponse,
                            AiJournalAnalysis.class
                    );

            if (analysis.getAsciiArt() != null) {
                analysis.setAsciiArt(
                        analysis.getAsciiArt()
                                .replace("\\n", "\n")
                );
            }

            return analysis;

        } catch (Exception e) {

            System.out.println("========== RAW AI RESPONSE ==========");
            System.out.println(aiResponse);
            System.out.println("=====================================");

            throw new RuntimeException(
                    "Failed to parse AI response.\nResponse was:\n"
                            + aiResponse,
                    e
            );
        }
    }
}