/**
 * ML & AI Utilities for Lakhara Digital News
 * Provides offline, client-side algorithms for advanced features.
 */

// 1. Predictive Analytics (Simple Linear Regression for Growth Forecasting)
export function trainLinearRegression(dataPairs: [number, number][]) {
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  const n = dataPairs.length;
  if (n === 0) return { predict: () => 0, slope: 0, intercept: 0 };

  for (const [x, y] of dataPairs) {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }
  
  const denominator = (n * sumX2 - sumX * sumX);
  const slope = denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  
  return {
    predict: (x: number) => Math.round(slope * x + intercept),
    slope,
    intercept
  };
}

// 2. Smart Typo-Tolerant Search (Levenshtein Distance)
export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
                   matrix[i - 1][j] + 1) // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Search utility using Levenshtein distance for fuzzy matching
export function smartSearch<T>(query: string, items: T[], keyExtractor: (item: T) => string, maxDistance: number = 3): T[] {
  if (!query) return items;
  const q = query.toLowerCase().trim();
  
  return items.map(item => {
    const text = keyExtractor(item).toLowerCase();
    
    // Exact or contains match gets priority 0
    let score = text.includes(q) ? 0 : 100;
    
    // Check individual words for typos
    const words = text.split(/\s+/);
    for (const w of words) {
       const dist = levenshteinDistance(q, w);
       if (dist < score) score = dist;
    }
    
    return { item, score };
  })
  .filter(res => res.score <= maxDistance || keyExtractor(res.item).toLowerCase().includes(q))
  .sort((a, b) => a.score - b.score)
  .map(res => res.item);
}

// 3. AI Keyword Extraction (TF-IDF Lite for Auto-Tagging)
export function extractKeywords(text: string, count: number = 4): string[] {
  if (!text) return [];
  // English and basic Hindi (Hinglish) stop words
  const stopWords = new Set([
    "aur", "hai", "ke", "ki", "ko", "mein", "se", "is", "the", "and", "of", "to", "in", 
    "for", "on", "with", "as", "by", "at", "an", "be", "this", "that", "ka", "ek", "bhi"
  ]);
  
  const words = text.toLowerCase().replace(/[^\w\s\u0900-\u097F]/g, "").split(/\s+/);
  const frequencies = new Map<string, number>();
  
  for (const w of words) {
    if (w.length > 2 && !stopWords.has(w)) {
      frequencies.set(w, (frequencies.get(w) || 0) + 1);
    }
  }
  
  return Array.from(frequencies.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by frequency (highest first)
    .slice(0, count)
    .map(e => "#" + e[0]); // Prefix with hashtag
}
