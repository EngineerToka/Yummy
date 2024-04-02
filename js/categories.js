$(document).ready(function() {
    const categoryContainer = $('#category-container');
    const loadingSpinner = $('#loading-spinner');

    // Function to fetch and display categories
    function fetchCategories() {
        loadingSpinner.show();
        $.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .done(function(data) {
            loadingSpinner.hide();
            displayCategories(data.categories);
        })
        .fail(function(error) {
            console.error('Error fetching categories:', error);
            loadingSpinner.hide();
        });
    }
   
   

    // Function to display categories
    function displayCategories(categories) {
        categoryContainer.empty();
        categories.forEach(category => {
            let strCategoryDescription = category.strCategoryDescription;
            if (strCategoryDescription && strCategoryDescription.length > 100) {
                strCategoryDescription = strCategoryDescription.substring(0, 100) + '...';
            };
            const categoryItem = $(`
                <div class="col-3 meal-card text-center">
                    <div class="card position-relative bg-black ">
                        <img src="${category.strCategoryThumb}" class="meal-img" alt="${category.strCategory}">
                        <div class="meal-overlay flex-column">
                            <h5 class="d-block fw-bold" >${category.strCategory}</h5>
                            <p class="d-block " >${strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
            `);
            
            categoryItem.find('.card').click(function() {
                const categoryName = category.strCategory;
                fetchMealsByCategory(categoryName);
            });
            categoryContainer.append(categoryItem);
        });
    }

    // Function to fetch and display meals by category
    function fetchMealsByCategory(categoryName) {
        loadingSpinner.show();
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .done(function(data) {
            loadingSpinner.hide();
            displayMeals(data.meals);
        })
        .fail(function(error) {
            console.error(`Error fetching meals for category ${categoryName}:`, error);
            loadingSpinner.hide();
        });
    }

    // Function to display meals
    function displayMeals(meals) {
        categoryContainer.empty();
        if (!meals) {
            categoryContainer.append('<p>No meals found for this category.</p>');
            return;
        }
        meals.forEach(meal => {
            const mealCard = $(`
                <div class="col-3 meal-card ">
                    <div class="card bg-black">
                        <img src="${meal.strMealThumb}" class="meal-img" alt="${meal.strMeal}">
                        <div class="card-body">
                        <div class="meal-overlay"><h3>${meal.strMeal}</h3></div>
                        </div>
                    </div>
                </div>
            `);
            mealCard.find('.card').click(function() {
                const mealId = meal.idMeal;
                fetchMealDetails(mealId);
            });
            categoryContainer.append(mealCard);
        });
    }

    // Function to fetch and display meal details by ID
    function fetchMealDetails(mealId) {
        loadingSpinner.show();
        $.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .done(function(data) {
            loadingSpinner.hide();
            displayMealDetails(data.meals[0]);
        })
        .fail(function(error) {
            console.error(`Error fetching meal details for ID ${mealId}:`, error);
            loadingSpinner.hide();
        });
    }

    // Function to display meal details
    function displayMealDetails(meal) {
        // Display meal details as needed
        if (!meal) {
            console.error('Meal details not found.');
            return;
        }
    
        const mealDetails = $(`
            <div class="d-flex text-white mb-5">
                <div class="card bg-black col-4 text-white mx-5">
                    <img src="${meal.strMealThumb}" class="meal-img w-100  " alt="${meal.strMeal}">
                       <h3>${meal.strMeal}</h3>
                       </div>
                    <div class="card-body col-6">
                         <h3>Instructions </h3>
                        <p> ${meal.strInstructions}</p>
                        <p class="fw-bold fs-3">Area: ${meal.strArea}</p>
                        <p class="fw-bold fs-3">Category: ${meal.strCategory}</p>
                        <p class="fw-bold fs-3">Recipes:</p>
                           <div class="d-flex  flex-wrap"> ${generateIngredientsList(meal)}</div>
                        <p class="fw-bold fs-3" >Tags: ${meal.strTags}</p>
                        <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    </div>
                </div>
          
        `);
    
        categoryContainer.empty();
        categoryContainer.append(mealDetails);
    }
    
   // Function to generate ingredients list
function generateIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<div class="ingredient-item mx-2 text-black" style="background-color: lightgrey; border-radius: 10px; padding: 5px; margin-bottom: 5px;">${measure} ${ingredient}</div>`;
        }
    }
    return ingredientsList;
}



    // Initialize the page
    fetchCategories();
});



