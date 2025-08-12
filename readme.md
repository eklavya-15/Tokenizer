# Tokenizer App

A simple web-based tokenizer application that converts text to tokens and vice versa using a custom vocabulary mapping.

## Features

- **Text Encoding**: Convert text into token IDs using a predefined vocabulary
- **Token Decoding**: Convert token IDs back into readable text
- **Web Interface**: User-friendly HTML interface for easy interaction
- **REST API**: Express.js backend with `/encode` and `/decode` endpoints

## Project Structure

```
Tokenizer/
├── index.html      # Web interface for the tokenizer
├── server.js       # Express.js server with encoding/decoding logic
├── vocab.json      # Vocabulary mapping (characters to token IDs)
├── package.json    # Node.js dependencies and scripts
└── readme.md       # This file
```

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd Tokenizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Starting the Server

1. Start the Express.js server:
   ```bash
   npm start
   ```
   
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

### Using the Web Interface

#### Encoding Text
1. Enter your text in the "Encode Text → Tokens" section
2. Click the "Encode" button
3. View the resulting token IDs in the result area

#### Decoding Tokens
1. Enter token IDs (separated by spaces or commas) in the "Decode Tokens → Text" section
2. Click the "Decode" button
3. View the resulting text in the result area

### API Endpoints

#### POST `/encode`
Converts text to token IDs.

**Request Body:**
```json
{
  "text": "Hello World"
}
```

**Response:**
```json
{
  "tokens": [729, 1009, 1199, 1199, 1249, 329, 879, 1249, 1319, 1199, 1009]
}
```

#### POST `/decode`
Converts token IDs back to text.

**Request Body:**
```json
{
  "tokens": [729, 1009, 1199, 1199, 1249]
}
```

**Response:**
```json
{
  "text": "Hello"
}
```
<img width="2836" height="1572" alt="image" src="https://github.com/user-attachments/assets/71c116ec-7f55-42c3-b042-b46384c30680" />


## How It Works

1. **Vocabulary**: The `vocab.json` file contains a mapping of characters to token IDs
2. **Encoding**: Each character in the input text is looked up in the vocabulary and converted to its corresponding token ID (with a transformation: `tokenId * 10 + 9`)
3. **Decoding**: Token IDs are reverse-transformed (`(tokenId - 9) / 10`) and mapped back to characters using the vocabulary

## Error Handling

- **Invalid characters**: If a character is not found in the vocabulary, the encoding will return an error
- **Invalid token IDs**: If a token ID doesn't exist in the vocabulary, the decoding will return an error
- **Missing input**: Both endpoints validate that required input is provided

## Troubleshooting

### Common Issues

1. **405 Method Not Allowed**: Make sure you're accessing the app at `http://localhost:3000` and not using a live server extension on a different port

2. **Server not starting**: Ensure you have Node.js installed and run `npm install` first

3. **Vocabulary errors**: Check that `vocab.json` exists and contains valid JSON

### Development Notes

- The server uses ES6 modules (`"type": "module"` in package.json)
- Static files are served from the root directory
- The vocabulary contains mappings for ASCII characters and special characters

## License

This project is open source and available under the MIT License.

## Contributing


Feel free to submit issues and enhancement requests!
