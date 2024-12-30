const router = require('express').Router();
const Summary = require('../models/summary');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

// Initialize Hugging Face client with API token
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

router.post('/summarize', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text || text.trim().length === 0) {
            return res.status(400).json('Error: Text is required');
        }

        // Generate summary using Hugging Face
        const result = await hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: text,
            parameters: {
                max_length: 130,
                min_length: 30,
            }
        });

        if (!result || !result.summary_text) {
            throw new Error('Failed to generate summary');
        }

        // Create new summary document
        const newSummary = new Summary({
            originalText: text,
            summarizedText: result.summary_text
        });

        // Save to database
        await newSummary.save();

        res.json(newSummary);
    } catch (error) {
        console.error('Summarization error:', error);
        res.status(500).json('Error: ' + (error.message || 'Failed to generate summary'));
    }
});

router.get('/', async (req, res) => {
    try {
        const summaries = await Summary.find().sort({ createdAt: -1 });
        res.json(summaries);
    } catch (error) {
        res.status(500).json('Error: ' + error.message);
    }
});

module.exports = router; 