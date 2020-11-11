// index.js - means that this will be the root directory (localhost:3000)
import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react'; // Used for CSS styling - specifically using Card object
import factory from '../ethereum/factory';
import Layout from '../components/Layout'; // to get header for each page
import {Link} from '../routes';

/* Steps:
    1. Configure web3 with a provider from Metamask
    2. Tell web3 that a deployed copy of the "CampaignFactory" exists
    3. Use Factory instance to retrieve list of all deployed campaigns
    4. Use React to show something about each campaign*/

class CampaignIndex extends Component {
    static async getInitialProps() { // Not assigned to instances of class - assigned to class itself
        // next.js runs this first before rendering to server - reason use static is so that doesn't have to render instance (computationally expensive)
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                // Remember to use `` not '' when you are adding in a formatting variable
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true // Card will stretch entire width of container - look nicer
            };
        }); // Will iterate through campaigns and make it into Card obejcts

        return <Card.Group items={items}/>;
    }

    // Need to add the first four lines in order to run the CSS inside this file
    // All of the <div> is inside of {props.children} inside of Layout.js
    // Look at that the <Layout> is at the top and the bottom (for adding that property)
    render(){
        return (
            <Layout>
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q=" crossOrigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha256-t8GepnyPmw9t+foMh3mKNvcorqNHamSKtKRxxpUEgFI=" crossOrigin="anonymous"></script>
                <script src="/assets/application.js" ></script>
                
                <h3>Open Campaigns</h3>         
                
                <Link route ="/campaigns/new">
                    <a>
                        <Button
                            // Button necessary so that user creates campaign
                            // Primary - adding nice blue styling
                            // Multiple built-in icons that can use in button - "add circle" adds the plus
                            // Move the button to the right hand side
                            floated="right"
                            content="Create Campaign"
                            icon="add circle"
                            primary
                        />
                    </a>
                </Link>

                {this.renderCampaigns()}
            </div>
            </Layout>
        );
    }
}

export default CampaignIndex;