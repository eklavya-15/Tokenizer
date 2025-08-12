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
    
    const { tokens } = req.body;
    if (!tokens || !Array.isArray(tokens)) {
      return res.status(400).json({ error: 'Tokens array is required' });
    }

    let text = '';
    for (const tokenId of tokens) {
      // Reverse the transformation: (tokenId - 9) / 10 to get original vocab token ID
      const originalTokenId = (tokenId - 9) / 10;
      const char = Object.keys(vocab).find(key => vocab[key] === originalTokenId);
      if (!char) {
        return res.status(500).json({ error: `Token ID ${tokenId} not found in vocabulary` });
      }
      text += char;
    }

    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
