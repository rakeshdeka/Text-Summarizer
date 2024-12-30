import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryHistory = () => {
    const [summaries, setSummaries] = useState([]);

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/summaries');
                setSummaries(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSummaries();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Summary History</h2>
            <div className="space-y-6">
                {summaries.map((summary) => (
                    <div key={summary._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-lg font-semibold mb-2">Original Text:</h5>
                                <p className="text-gray-700">{summary.originalText}</p>
                            </div>
                            <div>
                                <h5 className="text-lg font-semibold mb-2">Summary:</h5>
                                <p className="text-gray-700">{summary.summarizedText}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                Created at: {new Date(summary.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryHistory; 