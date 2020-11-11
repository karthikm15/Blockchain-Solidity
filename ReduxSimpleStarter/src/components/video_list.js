import React from 'react';
import VideoListItem from './video_list_item'; // From video_list_item.js

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem
                onVideoSelect={props.onVideoSelect}
                key={video.etag} 
                video={video} />);
    }); // Iterates through the videos array, finds a specific video and returns a VideoListItem with video as a parameter
    // Add an key so that it is easy to reference it and change it inside the array

    return(
        // React will automatically take the array and render the array into a list of <li></li>
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul> // make it a col-md-4 bootstrap with a list-group function
    );
}

export default VideoList;