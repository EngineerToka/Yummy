
$(document).ready(function() {
    const mealContainer = $('#mealContainer'); // Corrected selector

    // Function to fetch and display ingredients
    function fetchIngredients() {
        // Show loading spinner
        $('#loading-spinner').show();

        // Fetch ingredients from API
        $.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list', function(data) {
            const ingredients = data.meals;

            // Hide loading spinner
            $('#loading-spinner').hide();

            // Display ingredients
            mealContainer.empty(); // Clear previous ingredients

            // Display only 20 ingredients
            for (let i = 0; i < Math.min(ingredients.length, 20); i++) {
                const ingredient = ingredients[i];
                const ingredientName = ingredient.strIngredient;
                const ingredientDescription = ingredient.strDescription;
                const ingredientPhoto = `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;

                // Truncate the description if it's too long
                let truncatedDescription = ingredientDescription;
                if (truncatedDescription && truncatedDescription.length > 50) {
                    truncatedDescription = truncatedDescription.substring(0, 50) + '...';
                }

                // Create and append ingredient card
                const ingredientCard = $(`
                    <div class="col-3 meal-card text-white cursor-pointer">
                        <img src="${ingredientPhoto}" alt="${ingredientName}" class="meal-img">
                        <div class="ingredient-name fw-bold">${ingredientName}</div>
                        <div class="ingredient-des">${truncatedDescription || 'No description available'}</div>
                    </div>
                `);

                // Add click event listener to show meals for the ingredient
                ingredientCard.click(function() {
                    fetchMealsByIngredient(ingredientName);
                });

                mealContainer.append(ingredientCard); // Append ingredient card
            }
        });
    }

    // Function to fetch meals by ingredient and display them
    function fetchMealsByIngredient(ingredient) {
        // Show loading spinner
        $('#loading-spinner').show();

        // Fetch meals by ingredient from API
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, function(data) {
            const meals = data.meals;

            // Hide loading spinner
            $('#loading-spinner').hide();

            // Display meals
            mealContainer.empty(); // Clear previous meals

            if (!meals) {
                mealContainer.append('<p>No meals found for this ingredient.</p>');
                return;
            }

            // Display the meals in meal cards
            meals.forEach(meal => {
                const mealName = meal.strMeal;
                const mealThumb = meal.strMealThumb;

                // Create and append meal card
                const mealCard = $(`
                    <div class="col-3 meal-card cursor-pointer">
                        <img src="${mealThumb}" alt="${mealName}" class="meal-img">
                        <div class="meal-overlay fw-bold"><p>${mealName}</p></div>
                    </div>
                `);
                mealCard.click(function() {
                    const mealId = meal.idMeal;
                    fetchMealDetails(mealId);
                });
                mealContainer.append(mealCard); // Append meal card
            });
        }).fail(function(error) {
            console.error('Error fetching meals by ingredient:', error);
            $('#loading-spinner').hide(); // Hide loading spinner on failure
        });
    }

    // Fetch meal details by ID
    function fetchMealDetails(mealId) {
        $('#loading-spinner').show(); // Show loading spinner
        $.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .done(function(data) {
            $('#loading-spinner').hide(); // Hide loading spinner
            displayMealDetails(data.meals[0]);
        })
        .fail(function(error) {
            console.error('Error fetching meal details:', error);
            $('#loading-spinner').hide(); // Hide loading spinner on failure
        });
    }

    // Function to display meal details
    function displayMealDetails(meal) {
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
                    <p class="fw-bold fs-3">Area: ${meal.strArea}</p>
                    <p class="fw-bold fs-3">Category: ${meal.strCategory}</p>
                    <p class="fw-bold fs-3">Recipes:</p>
                    <div class="d-flex flex-wrap">${generateIngredientsList(meal)}</div>
                    <p class="fw-bold fs-3">Tags: ${meal.strTags}</p>
                    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                </div>
            </div>
        `);

        mealContainer.empty();
        mealContainer.append(mealDetails);
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

    // Initial fetch and display ingredients
    fetchIngredients();
});
