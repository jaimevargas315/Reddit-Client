import React, { useState, useEffect } from 'react';
import { getSubredditPosts } from '../api/api';
import './card.css';
import commentIcon from './comment.png'


function Card({ subreddit }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSubredditPosts(subreddit);
                setData(response);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [subreddit]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div className="posts">
            {data.map((post) => (
                <div className="post">
                    <h3>{post.title}</h3>
                    <img className="post-img" alt="subreddit post" src={post.url_overridden_by_dest}></img>
                    <div className="card-container">
                        <text>Posted by: <a href={`http://www.reddit.com/u/${post.author}`}>{post.author}</a> </text>
                        <text> {Date(post.created_utc).toLocaleString()}</text>
                        <button> <img className="comment-icon" src={commentIcon} alt="comment-icon"></img> {post.num_comments} </button> 
                    </div>
                </div>
            ))}
            
            <pre>{JSON.stringify(data, null, 2)}</pre>

        </div>
    );
}

export default Card;