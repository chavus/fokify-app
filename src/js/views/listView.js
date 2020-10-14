import {elements} from './base'

export function renderItem(item){
    const itemMarkup = `
        <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.qty}" step="${item.qty}" class="shopping__count-value">
            <p>${item.units}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
        </li>
    `
    elements.shoppingList.insertAdjacentHTML('beforeend', itemMarkup)
};

export function deleteItem(id){
    
    const el = document.querySelector(`[data-itemid=${id}]`);
    el.parentNode.removeChild(el);
};
