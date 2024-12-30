import React, { useState } from 'react';
import axios from 'axios';

const SummarizerForm = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/summaries/summarize', { text });
            setSummary(response.data.summarizedText);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data || 'An error occurred while generating the summary');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Text Summarizer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <textarea
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your text here..."
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className={`px-6 py-2 rounded-lg text-white font-medium
                        ${loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Generating Summary...' : 'Summarize'}
                </button>
            </form>
            
            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {summary && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Summary:</h3>
                    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        {summary}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SummarizerForm; 