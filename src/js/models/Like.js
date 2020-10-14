export default class Like{
    constructor(){
        this.likes = [];
    }

    addLike(recipe){
        const likeObj = {
            id: recipe.id,
            title: recipe.title,
            image_url: recipe.image_url,
            author: recipe.author
        };
        this.likes.push(likeObj)

        // Persist data
        this.persistData()
    };

    deleteLike(id){
        // Find index where item.id === id
        const index = this.likes.findIndex(item=> item.id === id);
        // Remove that from list 
        this.likes.splice(index, 1);

        // Persist data
        this.persistData()
    }

    isLiked(id){
        return this.likes.findIndex(item=> item.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage(){
        if (localStorage.likes) this.likes = JSON.parse(localStorage.likes)
    }
}