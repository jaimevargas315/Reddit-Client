import Header from './header';
import './App.css';
import Subreddits from './subreddits';
import Card from './card';
import React, { useState, useEffect } from 'react';



function App() {
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);

    const handleSubredditChange = (subreddit) => {
        setSelectedSubreddit(subreddit)
    }

    useEffect(() => {
        setSelectedSubreddit("all");
    },[])

    return (
          <main>
            <Header />
            <Subreddits onSubredditChange={handleSubredditChange} />
            <Card subreddit={selectedSubreddit} />
        </main>
    );
}
export default App;
