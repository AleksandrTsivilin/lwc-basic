import { LightningElement } from 'lwc';

export default class Header extends LightningElement {

    title = 'Proposal';
    action = 'add';

    handleMultiply(event) {
        const action = event.target.dataset.action;
        this.dispatchEvent(new CustomEvent('dispatch',{
            detail : action
        }));
        
    }
}