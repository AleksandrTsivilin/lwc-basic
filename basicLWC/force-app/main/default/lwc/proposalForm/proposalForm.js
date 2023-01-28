import { LightningElement, track } from 'lwc';
import getEquipmentsByCategoryWithName from '@salesforce/apex/Equipment.getEquipmentsByCategoryWithName';

export default class ProposalForm extends LightningElement {
   

    @track equipments=[]; 
   

    searchHandler(event){
        this.criteria.search = event.target.value;
    }

    categoryHandler(event){
        this.criteria.category = event.target.value;
    }

    onStartSearch(event){
        const criteria = event.detail;
        this.getEquipmentsByCriteria(criteria);        
    }
    

    getEquipmentsByCriteria(criteria){
        console.log('get equ criteria', JSON.stringify(criteria))
        getEquipmentsByCategoryWithName({ 
            name: criteria.search,
            categoryId: criteria.categoryId
        })
            .then(equipments => {
               
                this.equipments = equipments;
                
            })
            .catch(error => {
                
            });
    }

    close(){
        this.dispatchEvent(new CustomEvent('close'));
    }
}