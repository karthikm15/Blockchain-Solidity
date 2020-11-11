import React from 'react';

const VideoDetail = ({video}) => {
    // Reason add this if-statement is because takes a while to fetch the YoutubeAPI result - during that time, video will be null (look at index.js to see why)
    if (!video) {
        return <div>Loading...</div>;
    }

    // For embedding video on website
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`; // ` allows you to add variables inside of your string

    // Returns an object - has title, description, and a video embed
    return (
        <div className = "video-detail col-md-8">
            <div className = "embed-responsive embed-responsive-16by9">
                <iframe className = "embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;