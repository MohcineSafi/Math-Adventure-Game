
export interface GameState {
  currentLevel: number;
  maxLevel: number;
  isComplete: boolean;
}

export interface Player {
  name: string;
  health: number;
  energy: number;
  experience: number;
  level: number;
}

export interface Treasure {
  id: string;
  name: string;
  description: string;
  value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

export interface Puzzle {
  id: string;
  type: 'algebra' | 'geometry';
  level: number;
  question: string;
  correctAnswer: number;
  options?: number[];
  hint: string;
  explanation: string;
  reward: Treasure;
  expReward: number;
}
