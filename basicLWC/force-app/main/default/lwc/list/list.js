import { LightningElement, wire, track, api } from 'lwc';
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
    isShowPreview = false;

    @wire(getProposals)
    proposals;

    
    

    oppId;
    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        this.oppId = pageRef.attributes.recordId;        
    }

    renderedCallback(){
        //this.recordId = '$recordId'
        console.log('recordId = ', this.recordId)
        console.log('oppId', this.oppId);
    }

    @track link;
    // test(){
    //     console.log('link updated', link);
    // }

    // theIframe
    // @api isReloaded = false;

    // renderedCallback() {
    //     console.log('rendred callback called');
    //     console.log('this.theIframe', this.theIframe)
    //         if(this.theIframe==undefined){
    //             this.theIframe =  this.template.querySelector('iframe');
                
    //             console.log(JSON.stringify(this.theIframe))
    //             if (!this.theIframe){
    //                 console.log('theifram does not exist')
    //                 console.log(this.template.querySelectorAll('iframe'))
    //                 return;
    //             }
    //             this.theIframe.onload = ()=>{
    //                 console.log('Onload called',this.isReloaded);
    
    //                 if(!this.isReloaded){
    //                     this.isReloaded = true;
    //                     this.theIframe.src = 'https://www.google.com/' //'/sfc/servlet.shepherd/document/download/0696800000MRfLOAA1'
    //                     //this.theIframe.src ;
    
    //                 }
    //             }
    //         }   
    
    //     //}
    // }

    
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
        console.log('toSend is working...');

        // this.link = '/sfc/servlet.shepherd/document/download/0696800000MRfLOAA1'
        // //this.link = '0696800000MRfLOAA1';
        // this.isShowPreview = true;
        generateProposal({proposalId : id, oppId : this.oppId})
            .then(result=>{
                console.log('result has arrived')
                console.log('result',JSON.stringify(result));
                //this.link = `/sfc/servlet.shepherd/document/download/${result}`;
                //this.isShowPreview = true;
                //console.log(JSON.stringify(this.template.querySelector('iframe')))


                // <iframe width="850" height="1000" src={link}></iframe>
                // link = '/sfc/servlet.shepherd/document/download/' + result;
                // result = ContentDocumentLink.ContentDocumentId
                // 0696800000MRfLOAA1
            }).catch(error=>{
                console.log('errors')
                console.log('errors', error)
            })
    }

    toDelete(id){
        console.log("Delete");
    }
}