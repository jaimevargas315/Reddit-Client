import React, { useState, useEffect } from 'react';
import { getPostComments } from '../api/api';
import './comments.css';
import karma from './karma.png'

function CommentItem({ comment }) {
    const [showReplies, setShowReplies] = useState(false);
    const handleToggleReplies = () => {       
        setShowReplies(!showReplies);       
    }

    function formatTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) {
            return 'just now';
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(seconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }

    return (      
        <span>
            {comment.created && comment.author && comment.score && comment.body && (
            <div className="comment">
                <h4><a className="comment-author" href={`https://www.reddit.com/u/${comment.author}`}>{comment.author}</a></h4>
                <div className="time-ago">
                    {formatTimeAgo(comment.created * 1000)}
                </div>
                <div style={{ width: 'min-content' }}>
                    <img src={karma} alt="karma-logo"
                        style={{
                            maxWidth: '35px',
                            minWidth: '25x',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                    </img>
                    <p style={{
                            width: '100%',
                            height: 'min-content',
                            margin: '0px',
                            textAlign: 'center'
                        }}>{(comment.score).toLocaleString()}</p>
                </div>
                <p className="comment-body">{comment.body}</p>
                </div>)}           
            {comment.replies &&
                comment.replies.data.children.length > 0 &&
                comment.created &&
                comment.author &&
                comment.score &&
                comment.body &&
                (
                <div>
                    <button className="reply-button" onClick={handleToggleReplies}>
                        {showReplies ? '-' : '+'}
                    </button>

                    {showReplies && (
                        <div className="replies">
                            {comment.replies.data.children.map((reply) => (
                                <CommentItem key={reply.data.id || reply.data.name || Math.random().toString()} comment={reply.data} />
                            ))}
                        </div>
                    )}
                </div>
            )}        
    </span>
    );
}

function Comments({ permalink, showComments, setShowComments }) {
    const [comments, setComments] = useState(null);

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (showComments) {
            const fetchComments = async () => {
                setLoading(true);
                setError(null);
                try {                   
                    const response = await getPostComments(permalink);
                    setComments(response.filter((comment) => comment && comment.author && comment.created && comment.body));

                }
                catch (e) {
                    setError(e);
                } finally {
                    setLoading(false);
                }
            };
            fetchComments();
        } else {
            setComments(null);
        }
    }, [showComments, permalink]); 

    if (!showComments){
        return null;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!comments) {
        return (
            <div>
                <button onClick={() => setShowComments(false)}> Hide Comments </button>
                <p>No comments.</p>
            </div>
        );
    }
        return (
            <div className="comments">
                {comments.map((comment) => (                                        
                    <CommentItem comment={comment} />                                       
               ))}
            </div>
        );
    };


export default Comments;