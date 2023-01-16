import { LightningElement, api } from 'lwc';

export default class EquipmentItem extends LightningElement {
    @api row

    select(event){
        
        const isChecked = event.detail.checked;
        const detail = {
            id: this.row.Id,
            isChecked : isChecked
        }
        this.dispatchEvent(new CustomEvent('select',{
            detail: detail
        }));
    }
}