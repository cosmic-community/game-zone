import { getChatMessages } from '@/lib/cosmic';
import ChatRoom from '@/components/ChatRoom';

export const revalidate = 0;

export const metadata = {
  title: 'Community Chat | Game Zone',
  description: 'Chat with other gamers in the Game Zone community',
};

export default async function ChatPage() {
  const messages = await getChatMessages();

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-gaming mb-4">
            <span className="text-gradient">💬 Community Chat</span>
          </h1>
          <p className="text-xl text-muted">
            Connect with other gamers and share your high scores!
          </p>
        </div>

        <ChatRoom initialMessages={messages} />
      </div>
    </div>
  );
}