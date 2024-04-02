
document.addEventListener('DOMContentLoaded', function() {
    const searchByNameInput = document.getElementById('searchByName');
    const searchByFirstLetterInput = document.getElementById('searchByFirstName');
    const mealContainer = document.getElementById('mealContainer');
    const loadingSpinner = document.getElementById('loading-spinner');

    searchByNameInput.addEventListener('input', function() {
        performSearch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByNameInput.value.trim()}`);
    });

    
    
    async function performSearch(url) {
        try {
            loadingSpinner.style.display = 'block';
            const response = await fetch(url);
            const data = await response.json();
            displaySearchResults(data.meals);
            loadingSpinner.style.display = 'none';
        } catch (error) {
            console.error('Error fetching search results:', error);
            loadingSpinner.style.display = 'none';
        }
    }

    function displaySearchResults(meals) {
        mealContainer.innerHTML = '';
        if (!meals) {
            return;
        }
        meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('col-3', 'meal-card', 'fw-bold');
            const mealImg = document.createElement('img');
            mealImg.src = meal.strMealThumb;
            mealImg.alt = meal.strMeal;
            mealImg.classList.add('meal-img');
            const mealOverlay = document.createElement('div');
            mealOverlay.classList.add('meal-overlay');
            const mealName = document.createElement('p');
            mealName.textContent = meal.strMeal;
            mealOverlay.appendChild(mealName);
            mealCard.appendChild(mealImg);
            mealCard.appendChild(mealOverlay);
            mealContainer.appendChild(mealCard);
        });
    }
});
