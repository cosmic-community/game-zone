import { NextResponse } from 'next/server';
import { postChatMessage, getChatMessages } from '@/lib/cosmic';

export async function GET() {
  try {
    const messages = await getChatMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { username, message } = await request.json();

    if (!username || !message) {
      return NextResponse.json(
        { error: 'Username and message are required' },
        { status: 400 }
      );
    }

    const newMessage = await postChatMessage(username, message);
    return NextResponse.json({ message: newMessage });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to post message' },
      { status: 500 }
    );
  }
}