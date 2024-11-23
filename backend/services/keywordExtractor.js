const extractKeywords = (text) => {
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'is', 'are']; // Simplified stop words
    const words = text
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => !stopWords.includes(word) && word.length > 2);
  
    return [...new Set(words)];
  };
  
  module.exports = extractKeywords;
  