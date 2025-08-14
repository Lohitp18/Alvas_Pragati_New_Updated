import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Upload, MessageCircle } from 'lucide-react';
import pdfToText from 'react-pdftotext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [typingText, setTypingText] = useState('');
  const [sessionId] = useState(() => `session_${Math.random().toString(36).substr(2, 9)}`);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [extractedResumeText, setExtractedResumeText] = useState<string>('');
  const [hasResumeUploaded, setHasResumeUploaded] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentResponseRef = useRef('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize message count from localStorage
  useEffect(() => {
    const storedCount = localStorage.getItem('chatMessageCount');
    const count = storedCount ? parseInt(storedCount, 10) : 0;
    setMessageCount(count);
    setIsLimitReached(count >= 5);
  }, []);

  useEffect(() => {
    if (isOpen) {
      connectWebSocket();
    } else {
      disconnectWebSocket();
      // Clear resume state when chat is closed
      setExtractedResumeText('');
      setHasResumeUploaded(false);
    }

    return () => {
      disconnectWebSocket();
    };
  }, [isOpen]);

  const connectWebSocket = () => {
    try {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
      const ws = new WebSocket(`${wsUrl}/ws/${sessionId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.error) {
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: `Error: ${data.error}. Please try again.`,
              isUser: false,
              timestamp: new Date()
            }]);
            setIsLoading(false);
            return;
          }
          
          if (data.mime_type === 'text/plain' && data.data) {
            setCurrentResponse(prev => prev + data.data);
            currentResponseRef.current += data.data;
            // Update typing text for animation
            setTypingText(prev => prev + data.data);
          }
          
          if (data.turn_complete === true) {
            // Add the complete response as a single message only when turn_complete is true
            const finalText = currentResponseRef.current || 'No response received';
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: finalText,
              isUser: false,
              timestamp: new Date()
            }]);
            setCurrentResponse('');
            setTypingText('');
            currentResponseRef.current = '';
            setIsLoading(false);
            // Clear any pending timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        } catch (error) {
          // Error parsing WebSocket message
        }
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        
        // Show error message for specific error codes
        if (event.code === 1011) {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: 'Server encountered an internal error. Please try again in a moment.',
            isUser: false,
            timestamp: new Date()
          }]);
        }
      };

      ws.onerror = (error) => {
        setIsConnected(false);
      };
    } catch (error) {
      // Error connecting to WebSocket
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !isConnected || isLoading || isLimitReached) return;

    // Check message limit
    if (messageCount >= 5) {
      setIsLimitReached(true);
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setTypingText(''); // Reset typing text
    currentResponseRef.current = ''; // Reset response ref
    
    // Set a timeout to handle long responses
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: 'Response is taking longer than expected. Please try again.',
          isUser: false,
          timestamp: new Date()
        }]);
      }
    }, 30000); // 30 second timeout
    
    // Check if this looks like a resume (long text with keywords)
    const isResumeText = inputMessage.length > 200 && 
      (inputMessage.toLowerCase().includes('experience') || 
       inputMessage.toLowerCase().includes('education') || 
       inputMessage.toLowerCase().includes('skills') ||
       inputMessage.toLowerCase().includes('resume') ||
       inputMessage.toLowerCase().includes('cv'));
    
    let payload;
    if (isResumeText) {
      // Send as hidden resume analysis prompt
      payload = {
        mime_type: "text/plain",
        data: `I have pasted my resume content. Here is the content: ${inputMessage}. Please analyze this resume and provide career guidance, job recommendations, skill assessments, and answer any questions I have about my career path. Be ready to discuss my experience, skills, and suggest relevant job opportunities. Also, suggest 5 companies that would be a good fit for my profile.`
      };
    } else if (hasResumeUploaded && extractedResumeText) {
      // First message after resume upload - include resume context
      // Limit resume text to prevent WebSocket overflow
      const maxResumeLength = 2000; // Limit to 2000 characters
      const truncatedResume = extractedResumeText.length > maxResumeLength 
        ? extractedResumeText.substring(0, maxResumeLength) + '... (truncated)'
        : extractedResumeText;
      
      const combinedMessage = `I have uploaded my resume. Here is the content: ${truncatedResume}. Now I'm asking: ${inputMessage}. Please analyze my resume and answer my question. Also, suggest 5 companies that would be a good fit for my profile.`;
      payload = {
        mime_type: "text/plain",
        data: combinedMessage
      };
      // Clear the resume text after first use
      setExtractedResumeText('');
      setHasResumeUploaded(false);
    } else {
      // Send as regular message
      payload = {
        mime_type: "text/plain",
        data: inputMessage
      };
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
      setIsLoading(true);
      
      // Increment message count and save to localStorage
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      localStorage.setItem('chatMessageCount', newCount.toString());
      
      // Check if limit reached
      if (newCount >= 5) {
        setIsLimitReached(true);
      }
    }

    setInputMessage('');
  };

  const sendHiddenMessage = (text: string) => {
    if (!isConnected) return;
    
    const payload = {
      mime_type: "text/plain",
      data: text
    };

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    try {
      // Handle different file types
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        // For text files, read as text
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(new Error('Failed to read text file'));
          reader.readAsText(file);
        });
      } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // For PDF files, use react-pdftotext
        
        const extractedText = await pdfToText(file);
        
        // Check if we got meaningful text
        if (extractedText && extractedText.length > 50) {
          // Limit the extracted text to prevent WebSocket issues
          const maxTextLength = 5000; // Limit to 5000 characters
          if (extractedText.length > maxTextLength) {
            return extractedText.substring(0, maxTextLength) + '... (truncated for processing)';
          }
          return extractedText;
        } else {
          throw new Error('Failed to extract text from PDF - file may be image-based or corrupted');
        }
      } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        // For Word documents, we'll try to extract text
        // This is a simplified approach - in production you might want to use a Word parsing library
        return "Word document detected. Please convert to text format for better analysis.";
      } else {
        // For other file types, try to extract as much text as possible
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check message limit first
      if (isLimitReached || messageCount >= 5) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: "Message limit reached. You cannot upload files after reaching the 5-message limit.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      
      // Check file size (limit to 5MB)
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxFileSize) {
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: "File too large. Please upload a file smaller than 5MB.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      
      setIsProcessingFile(true);
      
      try {
        // Show user-friendly message
        const userMessage: Message = {
          id: Date.now().toString(),
          text: `📄 Uploaded: ${file.name}`,
          isUser: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        
        // Extract text from file
        const extractedText = await extractTextFromFile(file);
        
        // Store the extracted resume text
        setExtractedResumeText(extractedText);
        setHasResumeUploaded(true);
        
        // Show success message to user
        const successMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `✅ Resume uploaded successfully! I've analyzed your resume. Now finding the best companies for you...`,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, successMessage]);
        
        // Automatically send resume analysis prompt to bot
        const resumeAnalysisPrompt = `I have uploaded my resume. Here is the content: ${extractedText}. Please analyze this resume and provide the top 10 best companies that would be a perfect fit for my profile. Include job descriptions, required experience, and why these companies match my skills and qualifications.`;
        
        // Send the prompt to the bot
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const payload = {
            mime_type: "text/plain",
            data: resumeAnalysisPrompt
          };
          wsRef.current.send(JSON.stringify(payload));
          setIsLoading(true);
          
          // Increment message count and save to localStorage
          const newCount = messageCount + 1;
          setMessageCount(newCount);
          localStorage.setItem('chatMessageCount', newCount.toString());
          
          // Check if limit reached
          if (newCount >= 5) {
            setIsLimitReached(true);
          }
        }
        
              } catch (error) {
          // Error processing file
          
          // Show error message to user
          const errorMessage: Message = {
            id: Date.now().toString(),
            text: error instanceof Error && (error.message.includes('Failed to extract text from PDF') || error.message.includes('image-based or corrupted')) 
              ? "Sorry, I couldn't extract text from your PDF. This might be because:\n1. The PDF contains images instead of text\n2. The PDF is password protected\n3. The PDF format is not supported\n\nYou can:\n1. Try uploading a text file (.txt) instead\n2. Copy and paste your resume content directly in the chat\n3. Convert your PDF to text format first"
              : "Sorry, I couldn't process your file. Please try uploading a different format (PDF, DOC, DOCX, or TXT).",
            isUser: false,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
                } finally {
          setIsProcessingFile(false);
          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
    }
  };

  // Simple markdown renderer
  const renderMarkdown = (text: string): string => {
    return text
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-white p-3 rounded my-2 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded text-sm">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Lists
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:flex md:items-center md:justify-center p-0 md:p-4 bg-transparent md:bg-black md:bg-opacity-50">
      <div className="bg-white rounded-none md:rounded-lg shadow-xl w-full h-full md:max-w-4xl md:h-[90vh] flex flex-col overflow-hidden select-none touch-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-none md:rounded-t-lg">
          <div className="flex items-center space-x-3">
            <MessageCircle size={24} />
            <h2 className="text-xl font-bold">AI Assistant</h2>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-full touch-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Start a conversation with the AI assistant</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div 
                  className={`${message.isUser ? 'text-white' : 'text-gray-800'}`}
                  dangerouslySetInnerHTML={{ 
                    __html: message.isUser ? message.text : renderMarkdown(message.text) 
                  }}
                />
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {/* Show typing animation while receiving response */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[70%]">
                {typingText ? (
                  <div className="text-gray-800">
                    <div 
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(typingText) }}
                    />
                    <span className="inline-block w-2 h-4 bg-gray-600 ml-1 animate-pulse"></span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-500 text-sm">AI is thinking...</span>
                  </div>
                )}
              </div>
            </div>
          )}
          

          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          {/* Message Limit Indicator */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">
                Messages: {messageCount}/5
              </div>
              <div className={`w-2 h-2 rounded-full ${isLimitReached ? 'bg-red-500' : 'bg-green-500'}`}></div>
            </div>
            {isLimitReached && (
              <div className="text-sm text-red-600 font-medium">
                Message limit reached
              </div>
            )}
          </div>
          
          {/* Upload Resume Button */}
          <div className="mb-3">
            <button
              onClick={handleFileUpload}
              disabled={isProcessingFile || isLimitReached}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
                isProcessingFile || isLimitReached
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
                  : 'border-blue-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50'
              }`}
              title={isProcessingFile ? "Processing file..." : isLimitReached ? "Message limit reached" : "Upload Resume"}
            >
              {isProcessingFile ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-blue-600 rounded-full animate-spin"></div>
              ) : (
                <Upload size={16} />
              )}
              <span className="text-sm font-medium">
                {isProcessingFile ? "Processing..." : isLimitReached ? "Limit Reached" : "Upload Resume"}
              </span>
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          
          {/* Chat Input */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isLimitReached ? "Message limit reached (5/5)" : "Type your message..."}
                className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent ${
                  isLimitReached 
                    ? 'border-red-300 bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                rows={1}
                disabled={!isConnected || isLoading || isProcessingFile || isLimitReached}
              />
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || !isConnected || isLoading || isProcessingFile || isLimitReached}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              title={isLimitReached ? "Message limit reached" : "Send message"}
            >
              <Send size={20} />
            </button>
          </div>
          
          {!isConnected && (
            <p className="text-red-500 text-sm mt-2 text-center">
              Connecting to server...
            </p>
          )}
          
          {/* {isLimitReached && (
            <p className="text-red-500 text-sm mt-2 text-center">
              You have reached the 5-message limit for this session.
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 