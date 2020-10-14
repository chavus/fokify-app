import {elements} from './base'
import {limitRecipeTitle} from './searchView'
export function renderLike(recipe){
    const markup = `
    <li>
        <a class="likes__link" href="#${recipe.id}" data-recipeid=${recipe.id}>
            <figure class="likes__fig">
                <img src=${recipe.image_url} alt=${limitRecipeTitle(recipe.title)}>
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(recipe.title)}.</h4>
                <p class="likes__author">${recipe.author}</p>
            </div>
        </a>
    </li>
    `
    elements.likesList.insertAdjacentHTML('beforeend', markup)
};

export function deleteLike(id){
    const el = elements.likesList.querySelector(`[data-recipeid="${id}"]`).parentElement; // Too remove from li
    el.parentNode.removeChild(el);
};

export function like(){
    elements.recipeArea.querySelector('.heart__icon').setAttribute('href', "img/icons.svg#icon-heart");
};

export function unlike(){
    elements.recipeArea.querySelector('.heart__icon').setAttribute('href', "img/icons.svg#icon-heart-outlined");
};

// As alternative of like/dislike:
/*
export function toogleLikeBtn(isLiked){
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
    elements.recipeArea.querySelector('.heart__icon').setAttribute('href', `img/icons.svg#${iconString}`);
}
*/

export function toogleLikeMenu(numLikes){    
    elements.likesMenu.style.visibility = (numLikes > 0 ? 'visible' : 'hidden');
}