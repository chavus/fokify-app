// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import  {elements, displayLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';


/**Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipies
 */

 const state = {};
 //window.state = state

 /******
  * SEARCH CONTROLLER
  */
const controlSearchClick = async () => {  // alternative is 'async function controlClick(){'

    //1.- Get query from UI
        const query = searchView.getInput(); 

        if (query){
            //2.- Create object of search 
            state.search = new Search(query);

            //3.- Prepare UI for results
            searchView.clearInput(); // Clear input field
            searchView.clearResults(); // Clear previous results
            displayLoader(elements.resultsArea)

            try{
                //4.- Get results
                await state.search.getResults();
    
                //5.- Show results, render results
                clearLoader();
                searchView.renderResults(state.search.results);
            } catch(error){
                alert(error)
            }
    
        }

};

// Add event handler for Search button click
elements.searchButton.addEventListener('click', e =>{
    e.preventDefault(); // Cancel the default event, in this case, reload page
    controlSearchClick();
});

// Add event handler for Pagination buttons click
// Catch click and then use data-goto value to render next results
elements.resultsPagesArea.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline')  // target returns the element where event was applied
    if (btn){                                // Closest returns the first ancestor with specified query selector
        searchView.clearResults();
        const page = parseInt(btn.dataset.goto);
        searchView.renderResults(state.search.results, page);
    }
});

 /******
  * RECIPE CONTROLLER
  */

async function loadRecipe() {

const id = window.location.hash.replace('#', '')

if (id) {  // In case they are loading the page with no hash
    
    // Hightlight selection
    searchView.highlightSelected(id)

    // Prepare UI for changes
    recipeView.clearRecipe()
    displayLoader(elements.recipeArea)

    // Create new recipe objec
    state.recipe = new Recipe(id)

    try{
        // Get recipe data
        await state.recipe.getRecipe()
        // Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        //Display recipe
        clearLoader()
        state.recipe.parseIngredients()
        recipeView.renderRecipe(state.recipe)
        // window.r = state.recipe // use window.<variable> to expose variables to the console
        
        // Check if is a liked recipe
        if (state.like) {            
            if (state.like.isLiked(state.recipe.id)) likeView.like()
        }

    } catch (error){
        alert(error)
    }
}

};

// Add event listener to when url hash changes and when page loads
['hashchange', 'load' ].forEach(event => window.addEventListener(event, loadRecipe));


/*********************
 * SHOPPING LIST CONTROLLER
 */

function controlList(){
    
    if (!state.list) state.list = new List(); // Create state.list if not existent 

    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.qty, ing.units, ing.ingredient)
        listView.renderItem(item)
    });

};

// Listener for Shopping list area
elements.shoppingList.addEventListener('click', event =>{
    const id = event.target.closest('.shopping__item').dataset.itemid;

    if (event.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id)
    } else if (event.target.matches('.shopping__count-value')){
        const qty = parseInt(event.target.value);
        state.list.updateItemQty(id, qty);
    }

});


/***************************
 * LIKES LIST CONTROLLER
 */
function controlLike(){
    
    if (state.like.isLiked(state.recipe.id)){
        // Remove from list
        state.like.deleteLike(state.recipe.id)
        // Update button
        likeView.unlike()
        // Remove recipe to like list
        likeView.deleteLike(state.recipe.id)

    } else {

        // Add to list
        state.like.addLike(state.recipe);

        // Update button
        likeView.like()

        // Add recipe to like list
        likeView.renderLike(state.recipe)
    } 

    likeView.toogleLikeMenu(state.like.getNumLikes());

};

window.addEventListener('load', () => {

    state.like = new Like();
    // Read likes from local storage and assign it to state.like.likes
    state.like.readStorage();

    // Toggle like button if likes
    likeView.toogleLikeMenu(state.like.getNumLikes());

    // Render each like
    state.like.likes.forEach(like => likeView.renderLike(like))

});



 // RECIPE ARE EVENT LISTENER
 // Add event listener to + and - buttons. Need to target recipe area
// This will also handle Add to shopping list button, since button is inside recipe area
// This will also listen to Like button
elements.recipeArea.addEventListener('click', event => {      
    if (event.target.matches('.btn-inc-serv, .btn-inc-serv *')){ // Use * to include all childs in the selector
        // Increase button is clicked
        state.recipe.updateServings('inc')
        recipeView.updateServings(state.recipe)
    }else if (event.target.matches('.btn-dec-serv, .btn-dec-serv *')){ 
        // Decrease button is clicked

        if (state.recipe.servings > 1 ) {
            state.recipe.updateServings('dec')
            recipeView.updateServings(state.recipe)
        }
    }else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients to shopping list
        controlList();
    }else if (event.target.matches('.recipe__love, .recipe__love *')){
        // Like recipe
        controlLike()
    }
    });



/*Example to import functions or values
import str from './models/Search';
console.log(str);

/*
// ONe way
import {add as a, mult as m, ID as aid } from './views/searchView';
console.log(a(1,2))
console.log(m(2,2));
console.log(aid);
*/
/*
// Another method

import * as searchView from './views/searchView';
console.log(searchView.add(1,2))
console.log(searchView.mult(2,2));
console.log(searchView.ID);


const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
*/