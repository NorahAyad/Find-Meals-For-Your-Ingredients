//  Ingredient: 'Basil Leaves',Salmon,Apple Cider Vinegar,Eggs,Basil Leaves,Beef
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click' , getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
mealDetailsContent.parentElement.classList.remove('showRecipe');
});
fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)

     .then(function (response) {
       return response.json();
     
     })
     
       .then(function (json) {
           console.log(json.meals);})

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
.then(response => response.json())
.then(data => { 
    let html = "";
    if(data.meals){
        data.meals.forEach(meal => {
            let male2=document.querySelector("#meal")
            let body1 = document.createElement("div");
            body1.className = "meal-item";
            body1.dataset.id=meal.idMeal;
            let divimg =  document.createElement("div");
            divimg.className = "meal-img";
            let img = document.createElement("img");
           img.src =   meal.strMealThumb;
            divimg.append(img);
            body1.appendChild(divimg);
            let divname = document.createElement("div");
            divname.className = "meal-name";
            let name = document.createElement("h3");
            name.innerText =meal.strMeal;
            divname.append(name);
            body1.appendChild(divname);
      
            let link = document.createElement("a");
            link.href="#"
            link.className="recipe-btn"
            link.innerText="Get Recipe"
            divname.append(link);
            body1.appendChild(divname);
            male2 .append(body1);
        });
       
            } 
    
            
        });



// get meal list that matches with the ingredients
function getMealList(){
  
    let searchInputTxt = document.getElementById('search-input').value;


   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)

     .then(function (response) {
       return response.json();
     
     })
     
       .then(function (json) {
           console.log(json.meals);
        const array = json.meals;
        let male2=document.querySelector("#meal")
       let body1 = document.createElement("div");
       if (array == null||searchInputTxt == "" ){
        meal.className="notFound"
         meal.innerText="not fond"

         meal.append(body1);
       }else{
        male2.innerHTML=" "
            array.forEach(function (element) {
                
             let body1 = document.createElement("div");
             body1.className = "meal-item";
             let divimg = document.createElement("div");
             divimg.className = "meal-img";
             let img = document.createElement("img");
            img.src = element.strMealThumb;
             divimg.append(img);
             body1.appendChild(divimg);
             let divname = document.createElement("div");
             divname.className = "meal-name";
             let name = document.createElement("h3");
             name.innerText = element.strMeal;
             divname.append(name);
             body1.appendChild(divname);
       
             let link = document.createElement("a");
             link.className="recipe-btn"
             link.innerText="Get Recipe"
             divname.append(link);
             body1.appendChild(divname);
             male2.append(body1);
             

           }
              
       );
       }
      
  
     });

 }

// get recipe of the meal
function getMealRecipe(e){
e.preventDefault();
if(e.target.classList.contains('recipe-btn')){
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())
    .then(data => mealRecipeModal(data.meals));
}
}

// create a modal
function mealRecipeModal(meal){
console.log(meal);
meal = meal[0];
let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
    <p class = "recipe-category">${meal.strCategory}</p>
    <div class = "recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
        <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
`;
mealDetailsContent.innerHTML = html;
mealDetailsContent.parentElement.classList.add('showRecipe');
}