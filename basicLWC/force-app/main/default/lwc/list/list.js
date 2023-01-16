import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Proposal__c.Name';
import TOTAL_PRICE_FIELD from '@salesforce/schema/Proposal__c.Total_Price__c';
import STATUS_FIELD from '@salesforce/schema/Proposal__c.Status__c';
import MARGIN_FIELD from '@salesforce/schema/Proposal__c.Margin__c';
import getProposals from '@salesforce/apex/ProposalController.getProposals';
import generateProposal from '@salesforce/apex/ProposalController.generateProposal';


const COLUMNS = [
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Total Price', fieldName: TOTAL_PRICE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Margin', fieldName: MARGIN_FIELD.fieldApiName, type: 'percent' },
    { label: 'Status', fieldName: STATUS_FIELD.fieldApiName, type: 'text' },
];

export default class List extends LightningElement {
    columns = COLUMNS;
    isShowDialog = false;

    @wire(getProposals)
    proposals;

    oppId;
    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        this.oppId = pageRef.attributes.recordId;        
    }

    handleRowAction(event){
        const action = event.detail.action;
        const id = event.detail.id;
        
        switch (action.value){
            case 'Send':
                this.toSend(id);
                break;
            case 'Delete':
                this.toDelete(id);
                break;
        }
    }

    toOpenDialog(event){
        console.log('event list op dialog',event.detail)
        //console.log(event.target.dataset.action);
        console.log(event.target)
        this.isShowDialog = true;
    }  
    
    toSend(id){
        console.log('toSend is working...')
        generateProposal({proposalId : id, oppId : this.oppId})
            .then(result=>{
                console.log('result has arrived')
                console.log('result',JSON.stringify(result));
            }).catch(error=>{
                console.log('errors')
                console.log('errors', error)
            })
    }

    toDelete(id){
        console.log("Delete");
    }
}

