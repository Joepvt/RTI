import { AUTHORITIES_DATA, CATEGORIES_LIST } from '../../data/authorities';
import { Authority, ClarificationAnswer, LocationContext } from '../../types/rti';

export class AuthorityService {
  public getAllAuthorities(): Authority[] {
    return AUTHORITIES_DATA;
  }

  public getCategories(): string[] {
    return CATEGORIES_LIST;
  }

  public getAuthorityById(id: string): Authority | undefined {
    return AUTHORITIES_DATA.find((a) => a.id === id);
  }

  public getAuthoritiesByCategory(category: string): Authority[] {
    return AUTHORITIES_DATA.filter((a) => a.category === category);
  }

  /**
   * Deterministically scores authorities based on keywords in query, clarifications, and location.
   */
  public matchAuthority(
    question: string,
    clarifications: ClarificationAnswer[] = [],
    _location?: LocationContext
  ): { authority: Authority; confidence: 'High' | 'Likely match' | 'Moderate'; reason: string } {
    const combinedText = [
      question,
      ...clarifications.map((c) => `${c.questionText} ${c.selectedOptionId || ''} ${c.customAnswer || ''}`)
    ].join(' ').toLowerCase();

    let bestAuthority = AUTHORITIES_DATA[0];
    let highestScore = 0;
    let matchedKeywords: string[] = [];

    for (const authority of AUTHORITIES_DATA) {
      let score = 0;
      const currentMatched: string[] = [];

      for (const kw of authority.keywords) {
        // Word boundary match or substring check
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(combinedText)) {
          score += 3;
          currentMatched.push(kw);
        } else if (combinedText.includes(kw)) {
          score += 1;
          currentMatched.push(kw);
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestAuthority = authority;
        matchedKeywords = currentMatched;
      }
    }

    if (highestScore >= 6) {
      return {
        authority: bestAuthority,
        confidence: 'High',
        reason: `Your query references ${matchedKeywords.slice(0, 3).join(', ')}, which directly falls under the mandate of this public authority.`
      };
    } else if (highestScore > 0) {
      return {
        authority: bestAuthority,
        confidence: 'Likely match',
        reason: bestAuthority.reason
      };
    } else {
      // Fallback
      return {
        authority: AUTHORITIES_DATA[0],
        confidence: 'Moderate',
        reason: "We couldn't find a direct keyword match in your description, so we suggested the local urban municipal body as a primary contact. You may also select a more appropriate authority manually."
      };
    }
  }
}

export const authorityService = new AuthorityService();
