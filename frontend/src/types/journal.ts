export interface Journal {
  id: string;

  userEmail?: string;

  title?: string;

  content: string;

  summary: string;

  mood: string;

  sentiment: string;

  tags: string[];

  reflection?: string;

  quote?: string;

  asciiArt?: string;

  aiGenerated: boolean;

  createdAt: string;

  updatedAt: string;
}