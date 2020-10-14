// Recipe model
import axios from 'axios';
import { api_dir } from '../config';

export default class Recipe{
    constructor (id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const recipe = await axios(api_dir + `get?rId=${this.id}`)
            this.title = recipe.data.recipe.title;
            this.author = recipe.data.recipe.publisher;
            this.image_url = recipe.data.recipe.image_url;
            this.ingredients = recipe.data.recipe.ingredients;
            this.url = recipe.data.recipe.source_url;
        }catch(error){
            alert(error)
        }

    }

    calcTime(){
        // Consider 15 mins for each 3 ingredients
        this.time = Math.ceil(this.ingredients.length/3)*15
    };

    calcServings(){
        this.servings = 4;
    };

    parseIngredients(){
        const currentUnits = ['tablespoons', 'tablespoon', 'teaspoons', 'teaspoon', 'cups', 'ounces', 'ounce', 'pounds']
        const standardUnits = ['tbsp', 'tbsp', 'tsp', 'tsp', 'cup', 'oz', 'oz', 'pound']
        const units = [...standardUnits, 'kg', 'gr']

        const newIngredients = this.ingredients.map(ing =>{
            
            //1.-Uniform units
            let ingredient = ing;
            currentUnits.forEach((cu, i) => {
                const myregex = new RegExp(cu,'gi');
                ingredient = ingredient.replace(myregex, standardUnits[i]);
            })

            //2.-Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            //3.- Parse ingredients into count, unit and ingredient
            const ingArr = ingredient.split(' ')
            const unitIndex = ingArr.findIndex(el => units.includes(el))

            let ingObj;
            if (unitIndex > -1){
                // There is unit
                const qtyArr = ingArr.slice(0, unitIndex); // can be [4], [4,1/2], [4-1/2]
                const qty = eval(qtyArr.join('+').replace('-','+')); // eval takes string as js code and executes
                ingObj = {
                    qty,   
                    units: ingArr[unitIndex],
                    ingredient: ingArr.slice(unitIndex + 1).join(' ')
                }

            } else if(parseInt(ingArr[0])){
                // If there are no units but first element is a number
                ingObj = {
                    qty: parseInt(ingArr[0]),   
                    units: '',
                    ingredient: ingArr.slice(1).join(' ')
                }
            } else if(unitIndex === -1 ){
                // There is not units, and first element is not a number
                ingObj = {
                    qty: 1,   // Set 1 by default, for example: 1 sauce
                    units: '', 
                    ingredient // If key === value variable, for object we can just use the key
                }
            }
            return ingObj;

        })
        this.ingredients = newIngredients;
    };

    updateServings(type){        
        // Update servings
            const newServings = type ==='inc' ? this.servings + 1 :  this.servings - 1
        // Update ingredients qty
            this.ingredients.forEach(ing =>{
                ing.qty *= newServings/this.servings 
            })
            this.servings = newServings
    }
}
