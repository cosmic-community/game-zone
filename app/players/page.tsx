import { getPlayerProfiles } from '@/lib/cosmic';
import PlayerCard from '@/components/PlayerCard';

export const revalidate = 60;

export const metadata = {
  title: 'Top Players | Game Zone',
  description: 'View top players and their high scores',
};

export default async function PlayersPage() {
  const players = await getPlayerProfiles();
  
  const sortedPlayers = players.sort((a, b) => 
    (b.metadata.high_score || 0) - (a.metadata.high_score || 0)
  );

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-gaming mb-4">
            <span className="text-gradient">🏆 Top Players</span>
          </h1>
          <p className="text-xl text-muted">
            Meet our gaming champions
          </p>
        </div>

        {sortedPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedPlayers.map((player, index) => (
              <PlayerCard key={player.id} player={player} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-muted">No players yet</p>
          </div>
        )}
      </div>
    </div>
  );
}