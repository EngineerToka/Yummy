$(document).ready(function() {
    const nameInput = $('#name');
    const emailInput = $('#email');


    const nameError = $('#nameError');
    const emailError = $('#emailError');
    

    // Regular expressions for input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    const submitBtn = $('#submitBtn');

    // Add input event listeners to all input fields
    $('input').on('input', function() {
        validateInputs();
    });

    function validateInputs() {
        // Name validation
        if (nameInput.val() === '') {
            nameError.text('Please enter your name.');
        } else {
            nameError.text('');
        }

        // Email validation
        if (emailInput.val() === '') {
            emailError.text('Please enter your email.');
        } else if (!emailRegex.test(emailInput.val())) {
            emailError.text('Please enter a valid email address.');
        } else {
            emailError.text('');
        }

   

        // Enable/disable submit button based on input validity
        if (nameError.text() === '' && emailError.text() === '') {
            submitBtn.prop('disabled', false);
        } else {
            submitBtn.prop('disabled', true);
        }
    }
});
