import Header from './header';
import './App.css';
import Subreddits from './subreddits';
import Card from './card';
import React, { useState, useEffect } from 'react';



function App() {
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubredditChange = (subreddit) => {
        setSelectedSubreddit(subreddit)
    }

    useEffect(() => {
        setSelectedSubreddit("all");
    },[])

    return (
          <main>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Subreddits onSubredditChange={handleSubredditChange} />
            <Card subreddit={selectedSubreddit} searchTerm={searchTerm} />
        </main>
    );
}
export default App;
