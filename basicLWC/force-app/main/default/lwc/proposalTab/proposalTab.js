import { LightningElement, wire } from 'lwc';


export default class ProposalTab extends LightningElement {

       

    handleMultiply(event){
        const action = event.detail;
        console.log('I have got your event', action);
    }
}