import { LightningElement , api, wire, track } from 'lwc';
import getProposals from '@salesforce/apex/ProposalController.getProposals';
import generateProposal from '@salesforce/apex/ProposalController.generateProposal';
import sendSingleEmail from '@salesforce/apex/EmailServiceController.sendSingleEmail';
import deleteProposal from '@salesforce/apex/ProposalController.deleteProposal';


import NAME_FIELD from '@salesforce/schema/Proposal__c.Name';
import TOTAL_PRICE_FIELD from '@salesforce/schema/Proposal__c.Total_Price__c';
import STATUS_FIELD from '@salesforce/schema/Proposal__c.Status__c';
import MARGIN_FIELD from '@salesforce/schema/Proposal__c.Margin__c';

const COLUMNS = [
    { label:'#', fieldName:'#', type:'text'},
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Total Price', fieldName: TOTAL_PRICE_FIELD.fieldApiName, type: 'currency' },
    { label: 'Margin', fieldName: MARGIN_FIELD.fieldApiName, type: 'percent' },
    { label: 'Status', fieldName: STATUS_FIELD.fieldApiName, type: 'text' },
];

export default class ProposalsTable extends LightningElement {

    @api recordId;

    isShowForm = false;

    isShowPreview = false;
    contentDocumentId;
    //@track link;
    //@track proposals;

    @wire(getProposals,{oppId:'$recordId'})
    proposals;   
    
    connectedCallback(){
        console.log('proposals', JSON.stringify(this.proposals.data))
    }
    columns = COLUMNS;

    toAdd(){
        console.log('toAdd')
        this.isShowForm = true;
    }

    handleRowAction(event){
        console.log('handleRowAction', event.detail.action)
        const action = event.detail.action;
        const id = event.detail.id;
        
        switch (action.value){
            case 'Send':
                this.getPreview(id);
                break;
            case 'Delete':
                this.toDelete(id);
                break;
        }
    }

    getPreview(id){
        
        
        generateProposal({proposalId : id, oppId : this.recordId})
            .then(contentDocumentId=>{
                console.log('result has arrived')
                
                this.contentDocumentId = contentDocumentId;
                console.log('this', this.contentDocumentId);
                this.isShowPreview = true;
               
            }).catch(error=>{
                console.log('errors')
                console.log('errors', JSON.stringify(error))
            })

    }

    toDelete(id){
        console.log('delete', id);
        deleteProposal({id:id})
        .then(result=>{
            console.log('delete result',result);
             
            this.proposals = this.proposals
                .filter(proposal=>proposal.Id !== result);
        })
        .catch(error=>console.log('delete proposal error',JSON.stringify(error)));
    }

    send(){
        console.log('send from modal')
        this.isShowPreview = false;
        recipients = ['q0992358472@gmail.com'];
        //result = EmailService.sendSingleEmail(recipients, 'Proposal','Proposal body', [this.link]);
        //result = emailService.sendSingleEmail(recipients, 'Proposal','Proposal body', [this.link]);
        // result = sendSingleEmail(recipients, 'Proposal','Proposal body', [this.link]);
        sendSingleEmail({
            recipientList: ['q0992358472@gmail.com'],
            subject:'Proposal',
            body:'Proposal tt',
            filesIds: [this.link]
        }).then(result=>{
            console.log('email has recently sent',result)
        }).catch(error=>{
            console.log('send email error', error)
        })
        console.log('send completed',result);

        // );
        //console.log('result email',JSON.stringify(result));
        
        // List<string> recipientList,
        // string subject, 'Proposal'
        // string body, 'Proposal'
        // List<string> filesIds = link
    }

    close(){
        this.isShowPreview = false;
    }

    closeForm(){
        this.isShowForm = false;
    }

   
}