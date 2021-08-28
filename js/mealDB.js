// get the saerch-name
const searchFood = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    if(searchText.length == 0)
    {
        alert('Enter a meal name');
    }
    else
    {
        searchField.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data.meals));
    }
}

// show search result in a card by column
const searchResult = meals =>{
    const mealCard = document.getElementById('meal-card')
    // clear previous result
    mealCard.textContent = '';
    // load new result
    meals.forEach(meal => {
        console.log(meal); 
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
         <div onclick="detailLoad(${meal.idMeal})" class="card">
             <img src="${meal.strMealThumb}" class="card-img-top">
             <div class="card-body">
               <h5 class="card-title mt-2">${meal.strMeal}</h5>
               <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
             </div>
         </div>
        `
        mealCard.appendChild(div);
    });
} 

// Show details of the meal
const detailLoad = (mealId) =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data=>detailDisplay(data.meals[0]))
}
const detailDisplay = mealDetail =>{
    console.log(mealDetail);
    const mealdetailsCard = document.getElementById('meal-details-card')
    mealdetailsCard.textContent = '';
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card mx-auto w-25 mb-5"">
        <img src="${mealDetail.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mealDetail.strMeal}</h5>
          <p class="card-text">${mealDetail.strInstructions.slice(1,150)}</p>
          <a href="${mealDetail.strYoutube}" class="btn btn-success">Youtube video</a>
        </div>
    </div>
    `
    mealdetailsCard.appendChild(div);
} 