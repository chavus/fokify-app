//Search view
import  {elements} from './base';

export const getInput= () => elements.searchInput.value;

export function limitRecipeTitle(title, limit=17){

    if (title.length > limit){
        const modifiedTitle = [];

        // Reduce takes elements of an array and applies a function to it, the return of the function is the accumulator
        title.split(' ').reduce((acc, currentWord) => {
            if (acc + currentWord.length < limit){
                modifiedTitle.push(currentWord);
                return acc + currentWord.length;
                
            }
        }, 0)
        return `${modifiedTitle.join(' ')} ...`;
    }
    return title;

}

function renderRecipie(recipie){
    const markup = `                
    <li>
        <a class="results__link" href="#${recipie.recipe_id}">
            <figure class="results__fig">
                <img src="${recipie.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipie.title)}</h4>
                <p class="results__author">${recipie.publisher}</p>
            </div>
        </a>
    </li>`
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
}

export function renderResults(recipies, page=1, resPerPage=10){
    // Slice results 
    const start = (page-1) * resPerPage
    const end = (page-1)*resPerPage + resPerPage
    recipies.slice(start, end).forEach(renderRecipie); // no need to add return for implicit return nor pass params when coming 
    renderPaginationButtons(recipies, page, resPerPage)   

};

export function clearInput(){
    elements.searchInput.value = '';
}

export function clearResults(){
    //const childs = elements.resultsList.childNodes;
    //childs.forEach(child => elements.resultsList.removeChild(child));
    elements.resultsList.innerHTML = '';
    elements.resultsPagesArea.innerHTML = '';

}

function renderPagButton(type, page){
    const btn = `<button class="btn-inline results__btn--${type}" data-goto=${page}>
                <span>Page ${page}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left' }"></use>
                    </svg>
                </button>`
    elements.resultsPagesArea.insertAdjacentHTML('afterbegin', btn)
}

function renderPaginationButtons(recipies, page, resPerPage){
    // Check page
    const pages = Math.ceil(recipies.length/resPerPage)
    if (page === 1 & pages > 1){
        renderPagButton('next', page+1)
    } else if (page > 1 & page < pages){
        renderPagButton('prev', page-1)
        renderPagButton('next', page+1)
    }else if (page > 1 & page === pages){
        renderPagButton('prev', page-1)
    }
    // if it is page 1, render only next button
    // if page is not first nor last, render prev and next button
    // it is is last page, render only previous
    //renderPagButton('prev', page-1)
    //renderPagButton('next', page+1)

}


export function highlightSelected(id){

    // Remove highlight from previously selected
    document.querySelectorAll('.results__link--active').forEach(el => el.classList.remove('results__link--active'))

    // Highlight element with ID
    const el = document.querySelector(`.results__link[href="#${id}"]`);
    if (el) el.classList.add('results__link--active')

}


/*********************
 * Examples to export functions
 
 export const add = (a,b) => {
    return a + b;
}

export function mult(a, b){
    return a*b;
}

export const ID = 123
 */

