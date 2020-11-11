import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    // Can also write const video = props.video ({video} is a nice piece of syntax)
    const imageUrl = video.snippet.thumbnails.default.url; // The real image URL
    
    // Return statement creates a box - inside box has an image and a title next to it
    // If click, then will pass onVideoSelect as this video
    return (    
        <li onClick={() => onVideoSelect(video)}className="list-group-item">
            <div className = "video-list media">
                <div className = "media-left">
                    <img className = "media-object" src={imageUrl} />
                </div>

                <div className = "media-body">
                    <div className = "media-heading">{video.snippet.title} </div>
                </div>
            </div>
        </li>
    );
}

export default VideoListItem;