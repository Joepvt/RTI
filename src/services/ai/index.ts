import { AIService } from './aiInterface';
import { mockAIService } from './mockAiService';

/**
 * Service factory / singleton for AI integration.
 * By default, loads the rich mock engine. Can be easily extended with Gemini or OpenAI API providers.
 */
export const aiService: AIService = mockAIService;

export * from './aiInterface';
export * from './mockAiService';
