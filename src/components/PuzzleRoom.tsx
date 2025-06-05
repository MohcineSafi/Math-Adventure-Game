
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Puzzle, Treasure } from '../types/game';
import { Key, Compass } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PuzzleRoomProps {
  level: number;
  onComplete: (reward: Treasure, expGained: number) => void;
  onUseHint: () => boolean;
  canUseHint: boolean;
}

const PuzzleRoom = ({ level, onComplete, onUseHint, canUseHint }: PuzzleRoomProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const puzzles: Puzzle[] = [
    {
      id: '1',
      type: 'algebra',
      level: 1,
      question: 'Solve for x: 2x + 5 = 13',
      correctAnswer: 4,
      hint: 'First subtract 5 from both sides, then divide by 2',
      explanation: '2x + 5 = 13 → 2x = 8 → x = 4',
      reward: {
        id: 'bronze_coin',
        name: 'Ancient Bronze Coin',
        description: 'A weathered coin from the old kingdom',
        value: 50,
        rarity: 'common',
        icon: '🪙'
      },
      expReward: 25
    },
    {
      id: '2',
      type: 'geometry',
      level: 2,
      question: 'What is the area of a rectangle with length 8 and width 6?',
      correctAnswer: 48,
      hint: 'Area = length × width',
      explanation: 'Area = 8 × 6 = 48 square units',
      reward: {
        id: 'silver_chalice',
        name: 'Silver Chalice',
        description: 'An ornate drinking vessel of the priests',
        value: 120,
        rarity: 'rare',
        icon: '🏆'
      },
      expReward: 35
    },
    {
      id: '3',
      type: 'algebra',
      level: 3,
      question: 'Solve for y: 3y - 7 = 2y + 8',
      correctAnswer: 15,
      hint: 'Move all y terms to one side and constants to the other',
      explanation: '3y - 7 = 2y + 8 → 3y - 2y = 8 + 7 → y = 15',
      reward: {
        id: 'golden_amulet',
        name: 'Golden Amulet',
        description: 'A protective charm worn by temple guardians',
        value: 200,
        rarity: 'epic',
        icon: '🔮'
      },
      expReward: 50
    },
    {
      id: '4',
      type: 'geometry',
      level: 4,
      question: 'A triangle has angles of 45° and 65°. What is the third angle?',
      correctAnswer: 70,
      hint: 'The sum of all angles in a triangle is always 180°',
      explanation: '180° - 45° - 65° = 70°',
      reward: {
        id: 'emerald_gem',
        name: 'Emerald of Wisdom',
        description: 'A precious stone that glows with ancient knowledge',
        value: 350,
        rarity: 'epic',
        icon: '💎'
      },
      expReward: 75
    },
    {
      id: '5',
      type: 'algebra',
      level: 5,
      question: 'Solve for x: x² - 9 = 16',
      correctAnswer: 5,
      hint: 'Add 9 to both sides, then take the square root (use positive answer)',
      explanation: 'x² - 9 = 16 → x² = 25 → x = ±5 (we take the positive: x = 5)',
      reward: {
        id: 'pharaoh_crown',
        name: 'Crown of the Pharaoh',
        description: 'The ultimate treasure - a legendary crown of pure gold',
        value: 1000,
        rarity: 'legendary',
        icon: '👑'
      },
      expReward: 100
    }
  ];

  useEffect(() => {
    const puzzle = puzzles.find(p => p.level === level);
    if (puzzle) {
      setCurrentPuzzle(puzzle);
      setUserAnswer('');
      setShowHint(false);
      setAttempts(0);
      setIsCorrect(false);
    }
  }, [level]);

  const handleSubmit = () => {
    if (!currentPuzzle) return;

    const answer = parseFloat(userAnswer);
    if (isNaN(answer)) {
      toast({
        title: "Invalid Answer",
        description: "Please enter a valid number",
        variant: "destructive"
      });
      return;
    }

    if (Math.abs(answer - currentPuzzle.correctAnswer) < 0.01) {
      setIsCorrect(true);
      toast({
        title: "Correct!",
        description: `You solved the puzzle! ${currentPuzzle.explanation}`,
      });
      
      setTimeout(() => {
        onComplete(currentPuzzle.reward, currentPuzzle.expReward);
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      toast({
        title: "Incorrect",
        description: `Try again! You have ${3 - attempts - 1} attempts remaining.`,
        variant: "destructive"
      });
      
      if (attempts >= 2) {
        toast({
          title: "Puzzle Failed",
          description: `The correct answer was ${currentPuzzle.correctAnswer}. ${currentPuzzle.explanation}`,
          variant: "destructive"
        });
        setTimeout(() => {
          onComplete(currentPuzzle.reward, Math.floor(currentPuzzle.expReward / 2));
        }, 3000);
      }
    }
  };

  const handleHint = () => {
    if (onUseHint()) {
      setShowHint(true);
      toast({
        title: "Hint Revealed",
        description: "20 energy consumed for hint",
      });
    } else {
      toast({
        title: "Not Enough Energy",
        description: "You need at least 20 energy to use a hint",
        variant: "destructive"
      });
    }
  };

  if (!currentPuzzle) {
    return <div>Loading puzzle...</div>;
  }

  return (
    <Card className="bg-gradient-to-br from-stone-800 to-stone-700 border-2 border-yellow-600 p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          {currentPuzzle.type === 'algebra' ? (
            <Key className="w-8 h-8 text-yellow-400" />
          ) : (
            <Compass className="w-8 h-8 text-yellow-400" />
          )}
          <h2 className="text-2xl font-bold text-yellow-100">
            Chamber {level} - {currentPuzzle.type === 'algebra' ? 'Algebra' : 'Geometry'} Challenge
          </h2>
        </div>
        
        <div className="bg-stone-900 rounded-lg p-6 border border-yellow-600">
          <p className="text-xl text-yellow-100 mb-6">{currentPuzzle.question}</p>
          
          {!isCorrect && (
            <div className="space-y-4">
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="bg-stone-800 border-yellow-600 text-yellow-100 text-center text-lg"
                disabled={attempts >= 3}
              />
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={!userAnswer || attempts >= 3 || isCorrect}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-amber-900 font-bold px-8"
                >
                  Submit Answer
                </Button>
                
                <Button
                  onClick={handleHint}
                  disabled={showHint || !canUseHint || isCorrect}
                  variant="outline"
                  className="border-yellow-600 text-yellow-100 hover:bg-yellow-600 hover:text-amber-900"
                >
                  Use Hint (20 Energy)
                </Button>
              </div>
            </div>
          )}
          
          {showHint && (
            <div className="mt-4 p-4 bg-blue-900 rounded-lg border border-blue-400">
              <p className="text-blue-100 text-sm">💡 Hint: {currentPuzzle.hint}</p>
            </div>
          )}
          
          {isCorrect && (
            <div className="mt-6 p-6 bg-green-900 rounded-lg border border-green-400 animate-fade-in">
              <p className="text-green-100 text-lg font-bold mb-2">🎉 Puzzle Solved!</p>
              <p className="text-green-200 mb-4">{currentPuzzle.explanation}</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl">{currentPuzzle.reward.icon}</span>
                <div>
                  <p className="text-green-100 font-bold">{currentPuzzle.reward.name}</p>
                  <p className="text-green-200 text-sm">+{currentPuzzle.expReward} Experience</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-center">
            <p className="text-yellow-300 text-sm">Attempts: {attempts}/3</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PuzzleRoom;
