
import { Treasure } from '../types/game';
import { Card } from '@/components/ui/card';
import { Diamond } from 'lucide-react';

interface TreasureInventoryProps {
  treasures: Treasure[];
}

const TreasureInventory = ({ treasures }: TreasureInventoryProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const totalValue = treasures.reduce((sum, treasure) => sum + treasure.value, 0);

  return (
    <Card className="bg-gradient-to-br from-stone-800 to-stone-700 border-2 border-yellow-600 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Diamond className="w-5 h-5 text-yellow-400" />
        <h3 className="text-yellow-100 font-bold">Treasure Collection</h3>
      </div>

      <div className="text-center mb-4">
        <p className="text-yellow-300 text-sm">Total Value</p>
        <p className="text-2xl font-bold text-yellow-400">{totalValue} gold</p>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {treasures.length === 0 ? (
          <p className="text-yellow-300 text-sm text-center py-4">
            No treasures found yet...
          </p>
        ) : (
          treasures.map((treasure) => (
            <div 
              key={treasure.id}
              className={`bg-stone-900 rounded-lg p-3 border ${getRarityColor(treasure.rarity)}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{treasure.icon}</span>
                <div className="flex-1">
                  <p className="text-yellow-100 font-medium text-sm">{treasure.name}</p>
                  <p className="text-yellow-300 text-xs">{treasure.value} gold</p>
                </div>
              </div>
              <p className="text-yellow-200 text-xs mt-1">{treasure.description}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default TreasureInventory;
