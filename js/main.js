

     $(document).ready(function() {
        // Function to fetch and display meals
        function fetchMeals() {
            // Show loading spinner
            $('#loading-spinner').show();
    
            // Fetch meals from API
            $.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', function(data) {
                const meals = data.meals;
    
                // Hide loading spinner
                $('#loading-spinner').hide();
    
                // Display meals
                const mealContainer = $('#meal-container');
                mealContainer.empty(); // Clear previous meals
    
                meals.forEach(meal => {
                    const mealCard = $('<div class="col-4 meal-card position-relative"></div>');
                    const mealImg = $(`<img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img">`);
                    const mealOverlay = $(`<div class="meal-overlay fw-bold"><p>${meal.strMeal}</p></div>`);
    
                    mealCard.append(mealImg, mealOverlay);
                    mealContainer.append(mealCard);
                });
            });
        }
        
    
        // Initial fetch and display meals
        fetchMeals();
    });
 

//* Events
// SideNav
$(document).ready(function() {
    const sideNavList = $('.sideNavList');
    const mainSideNav =$(".mainSideNav");
    $('.fa-xmark').removeClass('d-none').addClass('d-flex'); // Show cancel icon
    $('.bar').removeClass('d-flex').addClass('d-none'); // Hide bar icon

    // Toggle sideNavList on bar icon click
    $('.bar').click(function() {
        // sideNavList.css('transform', 'translateX(0)');
        mainSideNav.css('left', '0');
        $('.fa-xmark').removeClass('d-none').addClass('d-flex'); // Show cancel icon
        $('.bar').removeClass('d-flex').addClass('d-none'); // Hide bar icon

    });

    // Move sideNavList left on cancel icon click
    $('.fa-xmark').click(function() {
        mainSideNav.css('left', -sideNavList.outerWidth());
        $('.bar').removeClass('d-none').addClass('d-flex'); // Show bar icon
        $('.fa-xmark').addClass('d-none'); // Hide cancel icon
    });
});
