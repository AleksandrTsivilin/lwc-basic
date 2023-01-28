import { LightningElement, api, track, wire } from 'lwc';
import createProposalWithEquipments from '@salesforce/apex/ProposalController.createProposalWithEquipments'
import { CurrentPageReference } from 'lightning/navigation';
import CATEGORY_NAME_FIELD from '@salesforce/schema/Category_Equipment__c.Name';
import NAME_FIELD from '@salesforce/schema/Equipment__c.Name';
import COST_FIELD from '@salesforce/schema/Equipment__c.Cost__c';

const COLUMNS = [
    { label: 'Category', fieldName: CATEGORY_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Amount', fieldName: COST_FIELD.fieldApiName, type: 'currency' }
]

export default class EquipmentList extends LightningElement {

    oppId;
    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        this.oppId = pageRef.attributes.recordId;        
    }

    @api equipments = [];
    
    columns = COLUMNS;

    @track selected = [];


    // get isEmpty (){
    //     return !this.equipments.length>0;
    // }

    get isDisabled (){
        return this.selected.length === 0;
    }

    checked(event){
        const id = event.detail.id;
        const isChecked = event.detail.isChecked;
        const selectedItem = this.equipments.find(equ => equ.Id === id);

        isChecked 
            ? this.selected.push(selectedItem)// this.selected = [...this.selected, selectedItem]
            : this.selected = this.selected.filter(equ=>equ.Id !== id);
        
    }

    cancel(){
        console.log('cancel creating proposal');
        this.dispatchEvent(new CustomEvent('close'))
    }

    save(){        
        console.log('save proposal with oppId', this.oppId);

        createProposalWithEquipments({ 
            oppId : this.oppId,
            equipments: this.selected
        })
            .then(ids => {
                console.log('then waiting for')
                console.log('created prop', JSON.stringify(ids));
                this.dispatchEvent(new CustomEvent('close'));
                
            })
            .catch(error => {
                console.log('error ', error);
                this.dispatchEvent(new CustomEvent('close'));
            });        
    }


    
}