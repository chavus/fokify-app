import {elements} from './base'
import { Fraction } from 'fractional'


export function clearRecipe(){
    elements.recipeArea.innerHTML = '';
}

function toFraction(dec){
    return (new Fraction(Number(Math.round(dec+'e2')+'e-2'))).toString()
    //return (new Fraction(dec)).toString()
}

function createIngredient(ingredients){
    
    const ingredientsMarkup = ingredients.map(ing => `    
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${toFraction(ing.qty)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ing.units}</span>
                    ${ing.ingredient}
            </div>
        </li>`
    )

    return ingredientsMarkup.join('')
};

export function renderRecipe(recipe){
    const markup =`
        <figure class="recipe__fig">
            <img src=${recipe.image_url} alt=${recipe.title} class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-dec-serv">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-inc-serv">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use class="heart__icon" href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${createIngredient(recipe.ingredients)}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href=${recipe.url} target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `
    elements.recipeArea.insertAdjacentHTML('afterbegin', markup)
};

export function updateServings(recipe){
    // Update Serving 
        document.querySelector('.recipe__info-data--people').textContent = recipe.servings
    // Update ingredients
        const ingElements = document.querySelectorAll('.recipe__item');        
        ingElements.forEach((ie, i)=>{
            ie.querySelector('.recipe__count').textContent = toFraction(recipe.ingredients[i].qty)
        })
}
