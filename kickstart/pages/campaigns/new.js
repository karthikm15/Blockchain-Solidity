// Added Campaigns folder so that its /campaigns/new inside the website

import React, {Component} from 'react';
// Do ../../ to get out of two directories
import Layout from '../../components/Layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes'; // Render anchor tags into React components (Link) /Redirect people from one page to another (Router)

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        accountNumber: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        // Make sure to do arrow function instead of () {}
        event.preventDefault() // prevent the form from submitting
        
        this.setState({loading: true, errorMessage: ''}); // Used to make spinner start moving on button and reset error message

        try {
            const accounts = await web3.eth.getAccounts();
            // console.log(accounts)
            // console.log(typeof parseInt(this.state.accountNumber))
            const index = parseInt(this.state.accountNumber);
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    // The user's first account
                    from: accounts[index]
                });
            
            Router.pushRoute('/'); // Push person to root route
        } catch (err) {
            this.setState({errorMessage: err.message}); // Set errorMessage to what happened wrong
        }

        this.setState({loading: false});
    };
    render() {
        return (
            // For boolean values, "" will return false, while "<STRING>" will return true - use !! before to convert it to a boolean
            // !!"bool" = true AND !!"" = false
            <Layout>
            <h3>Create a Campaign</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label="wei" 
                        labelPosition="right" 
                        value={this.state.minimumContribution}
                        onChange = {event =>
                            this.setState({ minimumContribution: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Account Number</label>
                    <Input
                        value = {this.state.accountNumber}
                        onChange = {event =>
                            this.setState({ accountNumber: event.target.value })}
                    />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Create!</Button>
            </Form>
            </Layout>
        )
    }
}

export default CampaignNew;