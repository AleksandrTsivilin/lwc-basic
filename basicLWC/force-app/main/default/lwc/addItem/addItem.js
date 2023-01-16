
import getEquipmentsByCategoryWithName from '@salesforce/apex/Equipment.getEquipmentsByCategoryWithName';
import { LightningElement, track } from 'lwc';

export default class AddItem extends LightningElement {

    title = 'New Proposal'
    criteria = {
        search:"",
        categoryId:""
    }

    @track equipments=[];
    
    close(){
        console.log('close modal')
    }

   

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

    

    
}