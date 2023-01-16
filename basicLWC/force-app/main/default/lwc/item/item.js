import { LightningElement, api } from 'lwc';


const ACTIONS = [
    {name : 'Send'},
    {name : 'Delete'}
]
export default class Item extends LightningElement {
    @api row;

    actions = ACTIONS;
    get isDisabled () {
        return this.row.Status__c != 'Draft';
    }

    actionHandler(event){
        const detail = {
            id: this.row.Id,
            action : event.detail
        }

        console.log('detail actionHandler', JSON.stringify(detail))
        this.dispatchEvent(new CustomEvent('actionitem',{
            detail:detail
        }))
        
    }
}