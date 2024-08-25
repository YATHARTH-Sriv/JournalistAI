"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GridPattern } from "@/components/ui/grid"
import axios from 'axios'

function ChatPage() {
    const [message, setMessage] = useState(""); // Capture user input
    const [history, setHistory] = useState([ // Initial hardcoded messages
        { id: 1, role: 'user', text: 'Hello!' },
        { id: 2, role: 'model', text: 'Hi! How can I assist you today?' },
    ]);

    const handleClick = async () => {
        if (message.trim() === "") return; // Avoid sending empty messages

        // Add user's message to history
        const newUserMessage = { id: history.length + 1, role: 'user', text: message };
        setHistory((prevHistory) => [...prevHistory, newUserMessage]);

        try {
            const response = await axios.post('/api/chat', { message });
            const modelResponse = response.data;

            // Assuming the response has a text property
            const newModelMessage = { id: history.length + 2, role: 'model', text: modelResponse.text };
            setHistory((prevHistory) => [...prevHistory, newModelMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
        }

        // Clear the message input after sending
        setMessage("");
    }

    return (
        <div className="relative bg-black w-full h-screen flex flex-col items-center justify-center">
            {/* Background GridPattern */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <GridPattern />
            </div>

            {/* Foreground content */}
            <div className='relative z-10 mb-3 '>
                <h1 className="text-3xl font-bold text-white">Get you queries answered</h1>
            </div>
            <div className="relative z-10 w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col space-y-4 mb-4 max-h-80 overflow-y-auto">
                    {history.map((message) => (
                        <div
                            key={message.id}
                            className={`p-3 rounded-lg ${
                                message.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-900 self-start'
                            }`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="flex space-x-2">
                    <Textarea 
                        placeholder="Type your message here." 
                        className="flex-grow" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />
                    <Button className="self-end" onClick={handleClick}>Send message</Button>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
