import uniqid from 'uniqid'

export default class List{
    constructor(){
        this.items = []
    }

    addItem(qty, units, ingredient){
        const item = { // If namei same as variable we can create key/value pair as follows
            id: uniqid(),
            qty,
            units,
            ingredient
        }
        this.items.push(item);
        return item;
    };

    deleteItem(id){
        // Find index where item.id === id
        const index = this.items.findIndex(item=> item.id === id);
        // Remove that from list 
        this.items.splice(index, 1);
    }

    updateItemQty(id, qty){
        this.items.find(item=> item.id === id).qty = qty;
    }
}