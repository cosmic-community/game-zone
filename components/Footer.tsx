import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎮</span>
              <span className="text-xl font-bold font-gaming text-gradient">
                Game Zone
              </span>
            </Link>
            <p className="text-muted max-w-md">
              Your ultimate destination for fun browser games. Play, compete, and connect with gamers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-muted hover:text-white transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted hover:text-white transition-colors">
                  Community Chat
                </Link>
              </li>
              <li>
                <Link href="/players" className="text-muted hover:text-white transition-colors">
                  Top Players
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li className="text-muted">
                Join our community and share your high scores!
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-muted">
          <p>© {new Date().getFullYear()} Game Zone. All rights reserved.</p>
          <p className="mt-2">
            Powered by{' '}
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}