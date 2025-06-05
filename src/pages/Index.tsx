
import { useState } from 'react';
import GameHeader from '../components/GameHeader';
import PuzzleRoom from '../components/PuzzleRoom';
import PlayerStats from '../components/PlayerStats';
import TreasureInventory from '../components/TreasureInventory';
import GameComplete from '../components/GameComplete';
import { GameState, Player, Treasure } from '../types/game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    maxLevel: 5,
    isComplete: false
  });

  const [player, setPlayer] = useState<Player>({
    name: "Explorer",
    health: 100,
    energy: 100,
    experience: 0,
    level: 1
  });

  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);

  const handlePuzzleComplete = (reward: Treasure, expGained: number) => {
    setTreasures(prev => [...prev, reward]);
    setPlayer(prev => ({
      ...prev,
      experience: prev.experience + expGained,
      level: Math.floor((prev.experience + expGained) / 100) + 1
    }));

    if (gameState.currentLevel < gameState.maxLevel) {
      setGameState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel + 1
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        isComplete: true
      }));
    }
  };

  const useHint = () => {
    if (player.energy >= 20) {
      setPlayer(prev => ({
        ...prev,
        energy: prev.energy - 20
      }));
      setHintsUsed(prev => prev + 1);
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setGameState({
      currentLevel: 1,
      maxLevel: 5,
      isComplete: false
    });
    setPlayer({
      name: "Explorer",
      health: 100,
      energy: 100,
      experience: 0,
      level: 1
    });
    setTreasures([]);
    setHintsUsed(0);
  };

  if (gameState.isComplete) {
    return (
      <GameComplete 
        treasures={treasures}
        finalStats={player}
        hintsUsed={hintsUsed}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-yellow-800 to-amber-700">
      <div className="container mx-auto px-4 py-6">
        <GameHeader 
          currentLevel={gameState.currentLevel}
          maxLevel={gameState.maxLevel}
          title="Temple of Mathematical Mysteries"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-1 space-y-4">
            <PlayerStats player={player} />
            <TreasureInventory treasures={treasures} />
          </div>
          
          <div className="lg:col-span-3">
            <PuzzleRoom 
              level={gameState.currentLevel}
              onComplete={handlePuzzleComplete}
              onUseHint={useHint}
              canUseHint={player.energy >= 20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
