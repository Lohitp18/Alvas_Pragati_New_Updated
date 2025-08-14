import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-8 right-4 z-40">
      <button
        onClick={onClick}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-blue-900"
        title="AI Assistant"
      >
        <MessageCircle size={24} />
        <span className="font-semibold">AI Assistant</span>
      </button>
    </div>
  );
};

export default FloatingChatButton; 