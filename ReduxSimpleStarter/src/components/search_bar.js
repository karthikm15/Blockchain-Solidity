// User can type search words here, whcih will update the video_list
import React, {Component} from 'react'; // Need to import this everytime because JSX devolves into React.createElement()

// Creating a class component. - will have all functionality that Component has in the React library
class SearchBar extends Component {
// render() { // function that the class will call when trying to render
//     return <input onChange={this.onInputChange} />;
//     /* Whenever want to call a function whenever there is a change from the user,
//     need to do the following on{Event} = {this.{FUNCTION_NAME}}
//         - Create a new input element that has the property that on change, onInputChange will be called*/
// }

// onInputChange(event) { // Runs whenever input bar changes - need to have a parameter event whenever create an event handler function
//     console.log(event.target.value);
// }
    
    // To initialize state, need to add to the constructor method
    constructor(props) { // Called whenever create a new instance of this class
        super(props); // Allows us to call constructor function of parent class

        this.state = {term:''}; // Object recorded to state (object will have some properties want to record)
        // - term: property want to change when user inputs into the search bar (if add 'Starting Value' to term, start with 'Starting Value' in the text box)
    }

    //Condensed Form:
    render(){
        return ( // Changes state to the name in the search bar
            // Need to ALWAYS use .setState() - never use this.state outside constructor function
            // Can call the term by doing {this.state.term}
            // When create value - make input a controlled component - only changes when the state changes (state constantly updates when user inputs)
            <div className="search-bar">
                <input
                 value = {this.state.term}
                 onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        )
    }

    // onInputChange function - changes the search term to your input term
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}

export default SearchBar; // For other applications, you can now use Searchbar as an import other .js files