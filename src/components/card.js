import React, { useState, useEffect } from 'react';
import { getSubredditPosts } from '../api/api';
import './card.css';
import commentIcon from './comment.png';
import Comments from './comments';
import karma from './karma.png'

function format(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

function MediaDisplay({ mediaUrl, mediaType, altText }) {

    if (!mediaUrl) {
        return <p>Media not available.</p>;
    }

    if (mediaType && mediaType.toLowerCase().includes('video')) {
        return (
            <p>
                <video className="post-img" controls width="auto" height="auto">
                    <source  src={`${mediaUrl}/DASH_360.mp4?source=fallback`} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                <br></br>Link with audio:<br></br>
                <a style={{color:'orangered'}} href={`${mediaUrl}`}>{mediaUrl}</a> 
            </p>
        );
    }
    if (mediaType && mediaType.toLowerCase().includes('image'))
    {
        return <img className="post-img" src={mediaUrl} alt={altText} ></img>
    }
    if(mediaType && mediaType.toLowerCase().includes('link')) {
        return <a className="link" href={`${mediaUrl}`}>{mediaUrl}</a>
    }
}

function Card({ subreddit, searchTerm }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentVisibility, setCommentVisibility] = useState(false);

    const handleToggleComments = (postId) => {
        setCommentVisibility((prevVisibility) => ({
            ...prevVisibility,
            [postId]: !prevVisibility[postId],
        }));
    };

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

    const filteredPosts = data
        ? data.filter((post) => {
            const searchTextLower = searchTerm.toLowerCase();
            const titleLower = post.title ? post.title.toLowerCase() : '';
            const selftextLower = post.selftext ? format(post.selftext).toLowerCase() : '';

            return (
                titleLower.includes(searchTextLower) ||
                selftextLower.includes(searchTextLower)
            );
        })
        : [];

    return (
        <div className="posts">
            {filteredPosts.map((post) => {
                const postId = post.id; // Assuming 'id' is a unique identifier
                const showComments = commentVisibility[postId] || false;

                return (
                    <div className="post" key={postId}>
                        <div className="title-container">
                            <div>
                                <img src={karma} alt="karma-icon" className="karma-icon"></img>
                                <p style={{
                                    width: 'min-content',
                                    height: 'min-content',
                                    margin: '0px'
                                }}>{(post.score).toLocaleString()}</p>
                            </div>
                            <h2 style={{textAlign:'center'}}>{post.title}</h2>
                        </div>
                        
                        
                        <p>
                            <pre className="post-text">{format(post.selftext)}</pre>
                        </p>                      
                        <MediaDisplay
                            mediaUrl={post.url}
                            altText=""
                            mediaType={post.post_hint}
                        />
                        <div className="card-container">
                            <text>
                                Posted by: <a className="post-author" href={`http://api.reddit.com/u/${post.author}`}>{post.author}</a>
                            </text>
                            <text className="post-date">
                                {new Date(post.created_utc * 1000).toLocaleString()} {/* Corrected date */}
                            </text>
                            <button
                                onClick={() => handleToggleComments(postId)}
                                className="post-button"
                            >
                                <img className="comment-icon" src={commentIcon} alt="comment-icon" />
                                {post.num_comments} {showComments ? 'Hide Comments' : 'Show Comments'}
                            </button>
                            </div>
                            <Comments
                                permalink={post.permalink}
                                showComments={showComments}
                                setShowComments={(value) =>
                                    setCommentVisibility((prev) => ({ ...prev, [postId]: value }))
                                }
                            />                      
                    </div>
                );
            })}
        </div>
    );
}

export default Card;