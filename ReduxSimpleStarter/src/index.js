// STEP 0: Import Libraries - even though react and react-dom aren't in same folder, can still call them because they are unique files and weren't created by us
import _ from 'lodash'; // Use library for throttling
import React, {Component} from 'react'; // Even though React installed as a dependency, need to explicitly state as an import
// React is used to render the components that make up the web page - need another library to render it to the DOM
import ReactDOM from 'react-dom' // What we import to render something to DOM
import YTSearch from 'youtube-api-search' // Import the Youtube API Search

// Need to specify folder for search_bar because there could be multiple files like that
import SearchBar from './components/search_bar'; // From search_bar.js (export default ...))
import VideoList from './components/video_list'; // From video_list.js
import VideoDetail from './components/video_detail'; // From video_detail.js

const API_KEY = "AIzaSyBZt3m2X6EOArhvDo4Uu3DMLPkDS2L4HXU"; // Allow us to make requests to Youtube (go to console.developers.google.com and search for Youtube Data API v3 and create credentials)
// Using API_KEY and a search term, will provide a list of videos back

// How to use the YTSearch
// YTSearch({key: API_KEY, term: 'surfboards'}, (data) => {
//     console.log(data);
// });

// STEP 1: Create a new functional component. This should produce HTML.

// const App = () => { // const (declaring a variable - saying that the value will not change)
//     //return <div>Hi!</div>; // Seems like HTML inside Javascript - called JSX (allows us to write code that looks like HTML that is actually Javascript)
//     return (
//         <div>
//             <SearchBar />
//         </div>
//     )
// };
// App is a class - remember need to instantiate an instance of the class when rendering it to the DOM

// Class Component (to keep track of Youtube videos and its state):
class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    // videoSearch function - does same thing as YTSearch(...) but passes in a new term
    videoSearch(term) {
        YTSearch({key: API_KEY, term:term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            }); // same as this.setState({videos: videos});
        });
    }
    
    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300); // Returns a function that can only be called every 300 milliseconds

        return(
            // Whenever renders, creates a new instance of SearhBar, VideoDetail, VideoList - videos will now be sent as props to the constructor function
            // SearchBar changes searchTerm to what the user inputs (look at search_bar.js)
            // VideoList changes the videoSelect to whatever the video you clicked was (look at video_list.js)

            <div> 
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// STEP 2: Take this component's generated HTML and put it on the page (in the DOM - document object model).

ReactDOM.render(<App />, document.querySelector('.container')); 
/**  <App /> (same as <App></App>) is how you render an instance of class
Similar to how <div></div> was used to create a component inside the class

When run .render - need to specify what you are rendering and what you are rendering to
 - how to say what you are rendering to - in index.html, look at the class of the main div tag in your body tag
   - take that class name and put it inside document.querySelector() */

