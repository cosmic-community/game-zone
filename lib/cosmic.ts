import { createBucketClient } from '@cosmicjs/sdk';
import { Game, GameCategory, ChatMessage, PlayerProfile } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export async function getGames(): Promise<Game[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'games' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    return response.objects as Game[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch games');
  }
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'games', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    return response.object as Game;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch game');
  }
}

export async function getFeaturedGames(): Promise<Game[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'games', 'metadata.featured': true })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    return response.objects as Game[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured games');
  }
}

export async function getCategories(): Promise<GameCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as GameCategory[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getChatMessages(): Promise<ChatMessage[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'chat-messages' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    const messages = response.objects as ChatMessage[];
    return messages.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch chat messages');
  }
}

export async function postChatMessage(username: string, message: string): Promise<ChatMessage> {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${username} message`,
      type: 'chat-messages',
      metadata: {
        username,
        message,
        avatar: ''
      }
    });
    return response.object as ChatMessage;
  } catch (error) {
    throw new Error('Failed to post chat message');
  }
}

export async function getPlayerProfiles(): Promise<PlayerProfile[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'player-profiles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as PlayerProfile[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch player profiles');
  }
}

export async function getGamesByCategory(categoryId: string): Promise<Game[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'games', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    return response.objects as Game[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch games by category');
  }
}