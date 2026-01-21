import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%236366f1%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-surface/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="animate-pulse-slow">🎮</span>
            <span className="text-sm text-muted">Welcome to the ultimate gaming portal</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-gaming mb-6">
            <span className="text-gradient">Game Zone</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-10">
            Play amazing browser games, compete for high scores, and chat with fellow gamers!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/games" className="btn-primary text-lg">
              🎮 Play Now
            </Link>
            <Link href="/chat" className="btn-secondary text-lg">
              💬 Join Chat
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">6+</div>
              <div className="text-muted">Games</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">4</div>
              <div className="text-muted">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient">∞</div>
              <div className="text-muted">Fun</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}