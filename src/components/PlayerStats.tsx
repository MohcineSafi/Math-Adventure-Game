
import { Player } from '../types/game';
import { Card } from '@/components/ui/card';

interface PlayerStatsProps {
  player: Player;
}

const PlayerStats = ({ player }: PlayerStatsProps) => {
  return (
    <Card className="bg-gradient-to-br from-stone-800 to-stone-700 border-2 border-yellow-600 p-4">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-2 flex items-center justify-center">
          <span className="text-2xl font-bold text-amber-900">
            {player.level}
          </span>
        </div>
        <h3 className="text-yellow-100 font-bold text-lg">{player.name}</h3>
        <p className="text-yellow-300 text-sm">Level {player.level} Explorer</p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm text-yellow-200 mb-1">
            <span>Health</span>
            <span>{player.health}/100</span>
          </div>
          <div className="bg-stone-900 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${player.health}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-yellow-200 mb-1">
            <span>Energy</span>
            <span>{player.energy}/100</span>
          </div>
          <div className="bg-stone-900 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${player.energy}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-yellow-200 mb-1">
            <span>Experience</span>
            <span>{player.experience % 100}/100</span>
          </div>
          <div className="bg-stone-900 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${(player.experience % 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlayerStats;
