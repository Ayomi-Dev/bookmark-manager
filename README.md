📌 Bookmark Manager (React + TypeScript + Next.js)

A modern, interactive bookmark management web app that allows users to save, organize, filter, and preview website bookmarks.
Built with React, TypeScript, Next.js, Chakra UI, and Framer Motion.

Status: In Active Development
Live Demo: Coming soon

✨ Features

Automatic metadata fetching (title, description, favicon) when saving a URL

Tag system with multi-tag filtering

Debounced search for instant filtering

Sorting options (Recently Added, A–Z, etc.)

Hover preview cards

Smooth animated list transitions

“Last visited X days ago” badge

Clean and responsive UI built with Chakra UI

🛠️ Tech Stack

Frontend: React, TypeScript, Next.js

UI: Chakra UI

Animations: Framer Motion

State Management: React Context API

Metadata Scraping: Custom Next.js API Route

📂 Project Structure
root/
├── src/
│   ├── components/       # UI components
│   ├── context/          # Global state (bookmarks, filters, etc.)
│   ├── pages/            # Next.js pages + API routes
│   ├── lib/              # Metadata fetching utilities
│   └── utils/            # Helpers & reusable functions
├── public/
└── README.md

🚀 Getting Started
Clone repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

Install dependencies
npm install

Run development server
npm run dev

Open the app
http://localhost:3000

🧠 Metadata Fetching Logic

The metadata is fetched through a custom Next.js API route that:

Receives the URL

Scrapes metadata (title, description, favicon)

Retries if the first fetch fails

Normalizes the response before saving it

Example structure of the API route:

// /pages/api/metadata.ts

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    // fetch metadata...
    // retry logic...
    // normalize response...

    return res.status(200).json(metadata);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch metadata" });
  }
}

📸 Screenshots

(Add when ready)

<!-- Example -->
![Bookmark List](./screenshots/bookmark-list.png)

📅 Roadmap

 User authentication

 Drag-and-drop sorting

 Bookmark folders/collections

 Dark mode

 Deployment to Vercel

🤝 Contributing

Pull requests and issues are welcome.

📜 License

MIT License.