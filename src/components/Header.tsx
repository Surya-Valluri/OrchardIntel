import React from 'react';
import { Apple, Leaf, Stethoscope, User, LogOut } from 'lucide-react';

interface HeaderProps {
  user?: any;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1" />
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-100">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center space-x-1 text-green-200 hover:text-white transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <Apple className="w-10 h-10 text-white" />
            <Leaf className="w-5 h-5 text-green-200 absolute -top-1 -right-1" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            OrchardIntel
          </h1>
          <Stethoscope className="w-8 h-8 text-green-200" />
        </div>
        
        <p className="text-center text-green-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          AI-powered React app for apple leaf disease detection with dataset management, model training simulation, Planet map viewer for climate risk analysis
        </p>
        
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-6 text-sm text-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>{user ? 'Real CNN Training' : 'Demo Mode'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span>6 Disease Classes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span>{user ? 'Cloud Storage' : 'Instant Results'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};