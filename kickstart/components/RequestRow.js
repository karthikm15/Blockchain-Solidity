import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import CampaignShow from '../pages/campaigns/show';

class RequestRow extends Component {

    onApprove = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.index).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.index).send({
            from: accounts[0]
        });
    }

    render() {
        const {Row, Cell} = Table;
        const {index, request, count, length} = this.props;
        const readyToFinalize = request.approvalCount > count/2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
               <Cell>{index}</Cell> 
               <Cell>{request.description}</Cell>
               <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
               <Cell>{request.recipient}</Cell>
               <Cell>{request.approvalCount}/{count}</Cell>
               <Cell>
                   {request.complete ? null : (
                    <Button color="green" basic onClick={this.onApprove}>Approve</Button>
                   )}
               </Cell>
               <Cell>
                   {request.complete ? null: (
                       <Button color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                   )}
                   
               </Cell>
            </Row>
        );
    }
}

export default RequestRow;