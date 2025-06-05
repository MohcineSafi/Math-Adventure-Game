
import { Book } from 'lucide-react';

interface GameHeaderProps {
  currentLevel: number;
  maxLevel: number;
  title: string;
}

const GameHeader = ({ currentLevel, maxLevel, title }: GameHeaderProps) => {
  const progress = (currentLevel / maxLevel) * 100;

  return (
    <div className="bg-gradient-to-r from-amber-800 to-yellow-700 rounded-lg p-6 shadow-2xl border-2 border-yellow-600">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-3 rounded-full">
            <Book className="w-6 h-6 text-amber-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-yellow-100">{title}</h1>
            <p className="text-yellow-200">Chamber {currentLevel} of {maxLevel}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-900 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-yellow-200 text-sm mt-2">Progress through the ancient temple</p>
    </div>
  );
};

export default GameHeader;
