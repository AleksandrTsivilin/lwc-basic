import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


const ACTIONS = [
    {name : 'Send'},
    {name : 'Delete'}
]
export default class Item extends NavigationMixin(LightningElement) {
    @api row;
    @api index;

    


    actions = ACTIONS;
    get isDisabled () {
        return this.row.Status__c != 'Draft';
    }

    get numRow(){
        return this.index + 1
    }

    navigateToObjectHome() {
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Proposal__c',
                actionName: 'home',
            },
        });
    }

    recordPageUrl;

    connectedCallback() {
        // Generate a URL to a User record page
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.row.Id,
                actionName: 'view',
            },
        }).then((url) => {
            this.recordPageUrl = url;
        });
    }

    actionHandler(event){
        const detail = {
            id: this.row.Id,
            action : event.detail
        }

        
        this.dispatchEvent(new CustomEvent('actionitem',{
            detail:detail
        }))
        
    }
}