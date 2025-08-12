import express from 'express';
import fs from 'fs';

const vocab = JSON.parse(fs.readFileSync("./vocab.json", "utf8"));
const app = express();
const PORT = 3000;

app.use(express.json());

const encoder = (char) => {
    const tokenId = vocab[char];
    if (tokenId === undefined) {
        return undefined; 
    }
    return tokenId*10 + 9;
};

const decoder = (tokenId) => {
    const char = Object.keys(vocab).find(key => vocab[key] === tokenId);
    if (!char) {
        throw new Error('Token ID not found in vocabulary');
    }
    return char;
};

app.post('/api/encode', (req, res) => {
    const {text} = req.body;
    const arr = [];
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    for(const char of text) {

        const encodedChar = encoder(char);
        if (encodedChar === undefined) {
            return res.status(500).json({ error: 'Vocab Not Found' });
        }
        arr.push(encodedChar);
    }
    res.json({tokens:arr});
});

app.post('/api/decode', (req, res) => {
    const { tokens } = req.body;
    if (!tokens || !Array.isArray(tokens)) {
        return res.status(400).json({ error: 'Tokens array is required' });
    }

    try {
        const text = tokens.map(tokenId => decoder((tokenId-9)/10)).join('');
        res.json({ text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

