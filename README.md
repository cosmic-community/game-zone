# 🎮 Game Zone

![Game Zone Preview](https://imgix.cosmicjs.com/0588fcd0-f70b-11f0-bc47-598474447305-photo-1511512578047-dfb367046420-1769028712128.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A feature-rich gaming portal built with Next.js 16 and Cosmic CMS, featuring playable browser games, community chat, player profiles, and game categories.

## Features

- 🎮 **6 Playable Browser Games** - Snake, Memory Match, Whack-a-Mole, Number Guess, Color Quiz, Tic-Tac-Toe
- 💬 **Live Community Chat** - Real-time messaging with user avatars
- 🏷️ **Game Categories** - Browse games by Arcade, Puzzle, Trivia categories
- 👤 **Player Profiles** - View top players with high scores and favorite games
- ⭐ **Featured Games** - Highlighted games on the homepage
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Dark Gaming Theme** - Modern dark UI with vibrant accents

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69713be2439a2d58af1decc6&clone_repository=69713da5439a2d58af1ded0c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "make a gameing website with a chat and many game that you can make"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the Game Zone bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd game-zone
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Games
```typescript
const { objects: games } = await cosmic.objects
  .find({ type: 'games' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Categories
```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'game-categories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Posting Chat Messages
```typescript
await cosmic.objects.insertOne({
  title: `${username} message`,
  type: 'chat-messages',
  metadata: {
    username,
    message,
    avatar: ''
  }
})
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

| Object Type | Description |
|-------------|-------------|
| `games` | Game entries with title, description, instructions, thumbnail, category, difficulty |
| `game-categories` | Categories with name, description, icon, and color |
| `chat-messages` | Chat messages with username, message, and avatar |
| `player-profiles` | Player data with display name, avatar, bio, favorite games, high score |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Add environment variables
4. Deploy!

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com)

<!-- README_END -->