import { LightningElement, api } from 'lwc';
import sendSingleEmail from '@salesforce/apex/EmailServiceController.sendSingleEmail';
//import getContentVersionIdByContentDocumentLinkId from '@salesforce/apex/ContentVersionController.getContentVersionIdByContentDocumentLinkId';


export default class ModalPreview extends LightningElement {
    @api preview;
    @api oppId;

    
    get link(){
        return `/sfc/servlet.shepherd/document/download/${this.preview}`;
    }

    //contentVersionId;

    close(){
        this.dispatchEvent(new CustomEvent('close'));
    }

    cancel(){
        this.dispatchEvent(new CustomEvent('close'));
    }

    loaded(event){

        console.log('loaded',event)

        console.log('loaded contentDocId ', this.id)
        console.log('loaded completed')
    }

    submit(){
        console.log('submit with preview id ', this.preview);
        console.log('oppId',this.oppId);
       
        sendSingleEmail({
            subject:'Proposal',
            body:'Body',            
            contentDocId:this.preview,
            oppId:this.oppId
        })
            .then(isSuccess=>{
                
                if (isSuccess) console.log('Email has been send successfully');
                this.dispatchEvent(new CustomEvent('submit'));
            })
            .catch(error=>{
                console.log('error after submit', error);
                console.log('Something went wrong');
            })

        
        
    }

    // getEmailInfo(id){
    //     console.log('id get email info', id)
    //     getContentVersionIdByContentDocumentLinkId({id:id})
    //         .then(contentVers => {
    //             console.log('getContentVersion', contentVers)
    //             this.contentVersionId = contentVers[0].id;
    //             return {
    //                 recipientList:['q0992358472@gmail.com'],
    //                 subject:'Proposal',
    //                 body:'Proposal body',
    //                 filesIds:  [this.contentVersionId]
    //             }
    //         }).catch(error=>console.log('get email info error',error))      
        
        
    // }
}