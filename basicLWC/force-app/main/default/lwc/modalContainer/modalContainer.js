import { LightningElement , api } from 'lwc';

export default class ModalContainer extends LightningElement {

    @api title;

    close(){
        this.dispatchEvent(new CustomEvent('close'));
    }
}