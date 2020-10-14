export const elements = {
    searchButton: document.querySelector('.search__btn'),
    searchInput: document.querySelector('.search__field'),
    resultsArea: document.querySelector('.results'),
    resultsPagesArea: document.querySelector('.results__pages'),
    resultsList: document.querySelector('.results__list'),
    recipeArea: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likesList: document.querySelector('.likes__list'),
    likesMenu: document.querySelector('.likes')
};

const elementsStrings = {
    loader: 'loader'
}

export function displayLoader(parent) {
    const loaderMarkup = `
    <div class=${elementsStrings.loader}>
        <svg>
        <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `
    parent.insertAdjacentHTML('afterbegin', loaderMarkup);

};

export function clearLoader() {
    const loader = document.querySelector(`.${elementsStrings.loader}`)
    if (loader) loader.parentElement.removeChild(loader)
};

