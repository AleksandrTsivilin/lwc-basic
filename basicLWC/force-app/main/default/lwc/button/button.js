import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
    @api label;
    @api icon;
    handleButton(event) {
        const action = event.target.dataset.action;
        console.log('event button ', action)
        this.dispatchEvent(new CustomEvent('buttonclick',{
            bubbles: true,
            detail:action,
            target:{name:action}
        }));
    }
}