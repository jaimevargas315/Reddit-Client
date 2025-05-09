import React, { useState, useEffect } from 'react';
import { getSubreddits } from '../api/api';
import './subreddits.css';
import  logo  from './reddit-logo.svg'


function Subreddits({ onSubredditChange }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSubreddits();
                setData(response);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div id="subreddit-list">
            <aside>
                <h2 id="sub-h2">Subreddits</h2>
                <ul className="sub-ul">
                    {data.map((sub) => (
                        <li
                            key={sub.display_name}
                            onClick={() => onSubredditChange(sub.display_name)}>
                            <button className="sub-button"                               
                                type="button">
                                <img className="sub-img" alt= '' src={ sub.icon_img === "" ?  logo : sub.icon_img }></img>    
                                <div className="display-name">{sub.display_name}</div> 
                            </button>
                            
                        </li>
                    ))}
                    
                </ul>
            </aside>
        </div>
    );
}

export default Subreddits;