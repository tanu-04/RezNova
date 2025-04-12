'use client';

import React, { useState } from 'react';
import AmazingNavbar from '../AmazingNavbar/page';

const ChatPage = () => {
    const [input, setInput] = useState('');
    const [messageCounter, setMessageCounter] = useState(0);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean; loading?: boolean }[]>([]);

    const handleSendMessage = () => {
        if (!input.trim()) return;

        // Add user message to chat log
        setMessages((prev) => [...prev, { text: input, isUser: true }]);

        // Add a loading bot response
        setMessages((prev) => [
            ...prev,
            { text: '', isUser: false, loading: true }, // Bot response placeholder
        ]);

        // Simulate bot's thinking delay
        setTimeout(() => {
            const hardcodedResponses = [
                "Start by creating a monthly budget and tracking your expenses.",
                "Consider setting up an emergency fund to cover unexpected expenses.",
                "Review your debts and create a plan to pay them down strategically.",
                "Think about your long-term financial goals, like retirement or buying a home.",
            ];

            let botResponse = "";
            if (messageCounter < hardcodedResponses.length) {
                botResponse = hardcodedResponses[messageCounter];
                setMessageCounter((prev) => prev + 1);
            } else {
                botResponse = "I'm out of specific advice for now. How else can I help?";
            }

            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1
                        ? { text: botResponse, isUser: false, loading: false }
                        : msg
                )
            );
        }, 2000); // 2-second delay for bot response

        // Clear input field
        setInput('');
    };

    return (
        <div className="chat-container">
            <AmazingNavbar />
            <div className="chat-content">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.isUser ? 'user' : 'bot'} ${msg.loading ? 'loading' : ''
                                }`}
                        >
                            {msg.loading ? '...' : msg.text}
                        </div>
                    ))}
                </div>
            </div>
            {/* Input Box at Bottom */}
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about finances..."
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-button">
                    Send
                </button>
            </div>
            <style jsx>{`
        /* General Styling */
        .chat-container {
          display: flex;
          margin-top: 60px;
          flex-direction: column;
          min-height: 100vh;
          background-color: black;
          
          color: white;
        }
        

        .chat-content {
          flex-grow: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .chat-messages {
          width: 90%;
          max-width: 800px;
          border: 1px solid gray;
          border-radius: 8px;
          padding: 10px;
          background-color: black;
          overflow-y: auto;
        }

        .message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 15px; /* Rounded corners */
          max-width: 70%; /* Limit bubble width */
        }

        .user {
          text-align: right; /* Align user messages to the right */
          background-color: #333333; /* Dark gray for user messages */
          border-top-right-radius: 0; /* Angled toward origin */
          margin-left: auto; /* Push user messages to the right */
        }

        .bot {
          text-align: left; /* Align bot messages to the left */
          background-color: #444444; /* Darker gray for bot messages */
          border-top-left-radius: 0; /* Angled toward origin */
        }

        .loading {
          font-style: italic; /* Italicized loading indicator */
        }

        /* Input Box Styling */
        .chat-input-container {
          position: fixed;
          bottom: 0.25rem; /* Margin bottom */
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 3rem;
          display: flex;
          gap: 0.5rem; /* Space between input and button */
        }

                .chat-input {
          flex-grow: 1; /* Input takes up remaining space */
          padding: 0.5rem; /* Padding inside input */
          background-color: #333333; /* Gray background for input */
          color: white; /* White text */
          border-radius: 8px; /* Rounded corners */
          border: 1px solid #666666; /* Default border color */
        }

        .chat-input::placeholder {
          color: #cccccc; /* Placeholder text color */
        }

        .chat-input:focus {
          outline: none; /* Remove default outline */
          border-color: blue; /* Blue border on focus */
        }

        .chat-button {
          padding: 0.5rem; /* Padding inside button */
          background-color: #333333; /* Dark gray button background */
          color: white; /* White text */
          border-radius: 8px; /* Rounded corners */
          border: none; /* Remove default border */
          transition: all 0.3s ease; /* Smooth transition for hover effects */
        }

        .chat-button:hover {
          background-color: blue; /* Blue background on hover */
          transform: scale(1.05); /* Slight scale effect on hover */
        }

        /* Angled message bubbles for user and bot messages */
        .user::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 0;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left-color: #333333;
          border-right: 0;
        }

        .bot::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 0;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-right-color: #444444;
          border-left: 0;
        }

        /* Loading animation for bot response placeholder */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .loading::after {
          content: '...';
          display: inline-block;
          animation: blink 1.4s infinite;
        }
      `}</style>
        </div>
    );
};

export default ChatPage;