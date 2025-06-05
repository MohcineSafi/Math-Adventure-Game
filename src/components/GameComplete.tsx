
import { Player, Treasure } from '../types/game';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Diamond } from 'lucide-react';

interface GameCompleteProps {
  treasures: Treasure[];
  finalStats: Player;
  hintsUsed: number;
  onRestart: () => void;
}

const GameComplete = ({ treasures, finalStats, hintsUsed, onRestart }: GameCompleteProps) => {
  const totalValue = treasures.reduce((sum, treasure) => sum + treasure.value, 0);
  const score = Math.floor(totalValue + finalStats.experience - (hintsUsed * 10));

  const getGrade = () => {
    if (score >= 1500) return { grade: 'S', color: 'text-yellow-400', message: 'Legendary Explorer!' };
    if (score >= 1200) return { grade: 'A', color: 'text-green-400', message: 'Master Adventurer!' };
    if (score >= 900) return { grade: 'B', color: 'text-blue-400', message: 'Skilled Treasure Hunter!' };
    if (score >= 600) return { grade: 'C', color: 'text-purple-400', message: 'Capable Explorer!' };
    return { grade: 'D', color: 'text-gray-400', message: 'Novice Adventurer!' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-yellow-800 to-amber-700 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-stone-800 to-stone-700 border-2 border-yellow-600 p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-4xl font-bold text-yellow-100">Quest Complete!</h1>
          </div>
          
          <div className="bg-stone-900 rounded-lg p-6 mb-6">
            <p className="text-yellow-100 text-lg mb-4">
              You have successfully navigated the Temple of Mathematical Mysteries 
              and uncovered its ancient treasures!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-yellow-400 font-bold text-lg">Final Stats</h3>
                <div className="bg-stone-800 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-yellow-200">Final Level:</span>
                      <span className="text-yellow-100 font-bold">{finalStats.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-200">Total Experience:</span>
                      <span className="text-yellow-100 font-bold">{finalStats.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-200">Hints Used:</span>
                      <span className="text-yellow-100 font-bold">{hintsUsed}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-yellow-400 font-bold text-lg">Treasure Haul</h3>
                <div className="bg-stone-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Diamond className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-100 font-bold">Total Value: {totalValue} gold</span>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {treasures.map((treasure) => (
                      <div key={treasure.id} className="flex items-center gap-2 text-sm">
                        <span>{treasure.icon}</span>
                        <span className="text-yellow-200">{treasure.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900 to-amber-800 rounded-lg border border-yellow-500">
              <div className="text-center">
                <div className={`text-6xl font-bold ${gradeInfo.color} mb-2`}>
                  {gradeInfo.grade}
                </div>
                <p className="text-yellow-100 text-xl font-bold mb-2">{gradeInfo.message}</p>
                <p className="text-yellow-200">Final Score: {score} points</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-amber-900 font-bold px-8 py-3 text-lg"
          >
            Explore Again
          </Button>
          
          <p className="text-yellow-300 text-sm mt-4">
            Challenge yourself to achieve a higher score and collect more treasures!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GameComplete;
