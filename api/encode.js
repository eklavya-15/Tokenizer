import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read vocab file
    const vocabPath = path.join(process.cwd(), 'vocab.json');
    const vocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
    
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const tokens = [];
    for (const char of text) {
      const tokenId = vocab[char];
      if (tokenId === undefined) {
        return res.status(500).json({ error: `Character "${char}" not found in vocabulary` });
      }
      // Apply the same transformation as the original server: tokenId*10 + 9
      tokens.push(tokenId * 10 + 9);
    }

    res.json({ tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
