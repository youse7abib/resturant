
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then(res => res.json())
    .then(data => {
        const recipesContainer = document.getElementById('recipe_card');
        data.meals.forEach(meal => {
            recipesContainer.innerHTML += `
            <div class="recipes_card" onclick="showRecipe('${meal.strMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:520px; border-radius:15px; color:black !important;">
                <h3>${meal.strMeal}</h3>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error loading recipets:',error));

    function showRecipe(mealName){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => {
            const meal =data.meals[0];
            const modalBody = document.getElementById('modal_body');
            modalBody.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" style="width:300px; border-radius:15px; color:black !important;">
            <h3 style="background-color:green;">Instructions: </h3>
            <p>${meal.strInstructions}</p>
            <h3 style="background-color:green;">Ingredients : </h3>
            <ul>
                ${getIngredients(meal).map(i => `<li>${i}</li>`).join('')}    
            </ul>
            `;
            document.getElementById('recipeModal').style.display = "block";
        });
    }
document.querySelector(".close").onclick = function(){
    document.getElementById('recipeModal').style.display = "none";

}
window.onclick = function(event){
    if (event.target ==document.getElementById('recipeModal')){
    document.getElementById('recipeModal').style.display = "none";

    }
}

    function getIngredients(meal){
        let Ingredients = [];
        for (let i =1; i <= 20; i++){
            const ing = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if(ing && ing.trim() !== '') Ingredients.push(` ${measure} ${ing}`);
            
        }
        return Ingredients
    }