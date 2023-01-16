import getCategories from '@salesforce/apex/CategoryEquipmentController.getCategories';
import { LightningElement, wire} from 'lwc';



export default class AddItemSearch extends LightningElement {

    
    @wire(getCategories)
    categories;

    criteria = {
        search : "",
        categoryId : ""
    }



    onSubmit(){      
        const detail = {
            search : this.criteria.search,
            categoryId : this.criteria.categoryId
        }
        this.dispatchEvent(new CustomEvent('changecriteria',{            
            detail : detail
        }));
    }

    inputHandle(event){
        this.criteria.search = event.target.value;       
    }

    categoryHandler(event){        
        this.criteria.categoryId = this.getCategoryId(event);        
    }

    getCategoryId(event){
        const selectedCategory = event.target.value;   
        return this.categories.data
            .filter(cat => cat.Name === selectedCategory)[0].Id;
        
    }
    
}