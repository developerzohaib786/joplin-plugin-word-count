const englishWords: string[] = require('an-array-of-english-words');

const dictionary = new Set<string>(englishWords);

const SKIP_RE = /^[A-Z]|^\d|^[^a-zA-Z]/;

export default function getMisspelledWords(text: string): string[] {
    if (!text.trim()) return [];

    const cleaned = text
        .replace(/```[\s\S]*?```/g, ' ') 
        .replace(/`[^`]*`/g, ' ')         
        .replace(/https?:\/\/\S+/g, ' ')  
        .replace(/!\[.*?\]\(.*?\)/g, ' ')  
        .replace(/\[.*?\]\(.*?\)/g, ' ')   
        .replace(/[#*_~>`\-|=\\[\](){}]/g, ' ') 
        .replace(/\d+/g, ' ');             

    const words = cleaned.match(/[a-zA-Z']+/g) || [];

    const seen = new Set<string>();
    const misspelled: string[] = [];

    for (const w of words) {
        if (SKIP_RE.test(w) || w.length < 3) continue;

        const lower = w.toLowerCase().replace(/^'+|'+$/g, ''); 
        if (lower.length < 3 || seen.has(lower)) continue;
        seen.add(lower);

        if (!dictionary.has(lower)) {
            misspelled.push(w);
        }
    }
    return misspelled;
}