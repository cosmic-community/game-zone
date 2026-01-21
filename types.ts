export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface FileMetafield {
  url: string;
  imgix_url: string;
}

export interface SelectDropdown {
  key: string;
  value: string;
}

export interface GameCategory extends CosmicObject {
  type: 'game-categories';
  metadata: {
    name: string;
    description?: string;
    icon?: FileMetafield;
    color?: string;
  };
}

export interface Game extends CosmicObject {
  type: 'games';
  metadata: {
    title: string;
    description: string;
    instructions?: string;
    thumbnail?: FileMetafield;
    category?: GameCategory;
    game_type: SelectDropdown;
    difficulty?: SelectDropdown;
    play_count?: number;
    featured?: boolean;
  };
}

export interface ChatMessage extends CosmicObject {
  type: 'chat-messages';
  metadata: {
    username: string;
    message: string;
    avatar?: FileMetafield;
  };
}

export interface PlayerProfile extends CosmicObject {
  type: 'player-profiles';
  metadata: {
    display_name: string;
    avatar?: FileMetafield;
    bio?: string;
    favorite_games?: Game[];
    high_score?: number;
  };
}

export type GameType = 'memory' | 'arcade' | 'puzzle' | 'trivia' | 'classic' | 'action';
export type Difficulty = 'easy' | 'medium' | 'hard';