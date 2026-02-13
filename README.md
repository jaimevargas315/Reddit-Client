# [https://jaimevargas315.github.io/Reddit-Client]
# Reddit Client (React)

A modern, responsive web application built with **React** that interfaces with the **Reddit JSON API**. This project allows users to browse popular subreddits, search for specific topics, and view detailed post information including comments and media, all without requiring OAuth authentication.

---

## System Architecture

The application is designed as a **Single Page Application (SPA)** that consumes Reddit's public API. It prioritizes performance and modularity through a component-based architecture.


### Core Tech Stack
* **Frontend:** React.js (Functional components and Hooks)
* **Data Source:** Reddit JSON API (Consuming `.json` endpoints)
* **State Management:** React Context API / Redux (for handling feed data and search queries)
* **Styling:** CSS Modules or Tailwind CSS for responsive and isolated styles.
* **Icons:** FontAwesome or React Icons for a familiar Reddit-like UI.

---

## Project Structure

The codebase is organized into logical directories to separate concerns and ensure the app is scalable.

```text
Reddit-Client/
├── public/                 # Static assets (index.html, logos)
├── src/
│   ├── api/                # API communication layer
│   │   └── reddit.js       # Functions for fetching data from Reddit
│   ├── components/         # Reusable UI building blocks
│   │   ├── Post/           # Post cards and media handlers
│   │   ├── Navbar/         # Search bar and navigation
│   │   ├── Sidebar/        # Subreddit navigation list
│   │   └── Comment/        # Comment threads and voting UI
│   ├── features/           # Feature-specific logic (Slices/Logic)
│   │   ├── feed/           # Main post feed logic
│   │   └── search/         # Search filtering logic
│   ├── store/              # Global state configuration
│   ├── App.js              # Root component & Routing
│   └── index.js            # Entry point
└── package.json            # Project dependencies
