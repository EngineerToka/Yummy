

$(document).ready(function() {
    const areaContainer = $('#area-container');
    const loadingSpinner = $('#loading-spinner');

    // Function to fetch and display meal areas
    function fetchMealAreas() {
        loadingSpinner.show();
        $.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .done(function(data) {
            loadingSpinner.hide();
            displayMealAreas(data.meals);
        })
        .fail(function(error) {
            console.error('Error fetching meal areas:', error);
            loadingSpinner.hide();
        });
    }

    // Function to display meal areas
    function displayMealAreas(areas) {
        areaContainer.empty();
        areas.forEach(area => {
            const areaItem = $(`
                <div class="meal-card col-3 text-white mt-5">
                    <i class="fa-solid fa-house-laptop fs-1"></i>
                    <h3>${area.strArea}</h3>
                </div>
            `);
            areaItem.click(function() {
                const areaName = area.strArea;
                fetchMealsByArea(areaName);
            });
            areaContainer.append(areaItem);
        });
    }

    // Function to fetch and display meals by area
    function fetchMealsByArea(areaName) {
        loadingSpinner.show();
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
        .done(function(data) {
            loadingSpinner.hide();
            displayMeals(data.meals);
        })
        .fail(function(error) {
            console.error(`Error fetching meals for area ${areaName}:`, error);
            loadingSpinner.hide();
        });
    }

    // Function to display meals
    function displayMeals(meals) {
        areaContainer.empty();
        if (!meals) {
            areaContainer.append('<p>No meals found for this area.</p>');
            return;
        }
        meals.forEach(meal => {
            const mealCard = $(`
                <div class="col-3 meal-card mt-5">
                    <div class="card bg-black">
                        <img src="${meal.strMealThumb}" class="meal-img" alt="${meal.strMeal}">
                        <div class="card-body">
                            <div class="meal-overlay"><h3>${meal.strMeal}</h3></div>
                        </div>
                    </div>
                </div>
            `);
            mealCard.click(function() {
                const mealId = meal.idMeal;
                fetchMealDetails(mealId);
            });
            areaContainer.append(mealCard);
        });
    }

    // Function to fetch and display meal details
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
            <div class="d-flex text-white mb-5 mt-5">
                <div class="card bg-black col-4 text-white mx-5 ">
                    <img src="${meal.strMealThumb}" class="meal-img w-100" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
                <div class="card-body col-6">
                    <h3>Instructions</h3>
                    <p>${meal.strInstructions}</p>
                    <p class="fw-bold fs-3" >Area: ${meal.strArea}</p>
                    <p class="fw-bold fs-3" >Category: ${meal.strCategory}</p>
                    <p class="fw-bold fs-3" >Recipes:</p>
                    <div class="d-flex flex-wrap">${generateIngredientsList(meal)}</div>
                    <p class="fw-bold fs-3" >Tags: ${meal.strTags}</p>
                    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                </div>
            </div>
        `);

        areaContainer.empty();
        areaContainer.append(mealDetails);
    }

    // Function to generate ingredients list
    function generateIngredientsList(meal) {
        let ingredientsList = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal['strIngredient' + i];
            const measure = meal['strMeasure' + i];
            if (ingredient && ingredient.trim() !== '') {
                ingredientsList += `<div class="ingredient-item mx-2 text-black" style="background-color: lightblue; border-radius: 10px; padding: 5px; margin-bottom: 5px;">${measure} ${ingredient}</div>`;
            }
        }
        return ingredientsList;
    }

    // Initialize the page
    fetchMealAreas();
});

