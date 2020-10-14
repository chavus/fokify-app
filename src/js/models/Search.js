// Search model
import axios from 'axios';
import { api_dir } from '../config';

export default class Search {

    constructor(query){
        this.query = query
    }

    async getResults(){
//        const api_dir = 'https://forkify-api.herokuapp.com/api/search'
        try{
            // const ret = await fetch(api_dir + '?q=pizza')
            // const ret_j = await ret.json()
            // Axios return info in json format
            this.results = (await axios(api_dir + `search?q=${this.query}`)).data.recipes;
            //console.log(this.results);
            //return this.results
            
        } catch(error){
            alert(error);
        }
    }
}

//getResults('piza');





/*Example to export functions
// default: exports all of file
export default 'I\'m an exported string from Searchxx'
*/