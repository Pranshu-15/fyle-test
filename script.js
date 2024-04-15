$(document).ready(function() {
    // Handle form submission
    $("#tax-form").submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Clear previous results
      $("#overall-income").text("");
  
      // Validate form fields
      var hasError = false;
      $(".error-icon").hide(); // Hide error icons before validation
  
      var grossIncome = parseFloat($("#gross-income").val());
      if (isNaN(grossIncome)) {
        hasError = true;
        $("#gross-income").siblings(".error-icon").show();
      }
  
      var extraIncome = parseFloat($("#extra-income").val()) || 0;
      if (isNaN(extraIncome) && extraIncome !== "") {
        hasError = true;
        $("#extra-income").siblings(".error-icon").show();
      }
  
      var deductions = parseFloat($("#deductions").val()) || 0;
      if (isNaN(deductions) && deductions !== "") {
        hasError = true;
        $("#deductions").siblings(".error-icon").show();
      }
  
      var age = $("#age").val();
      if (!age) {
        hasError = true;
        $("#age").siblings(".error-icon").show();
      }
  
      if (hasError) {
        return; // Don't proceed if there are errors
      }
  
      // Calculate taxable income
      var taxableIncome = grossIncome + extraIncome - deductions;
  
      // Calculate final income (taxable income minus tax amount)
      var taxRate;
      var taxAmount;
      if (taxableIncome <= 800000) {
        taxRate = 0;
        taxAmount = 0;
      } else {
        var taxableAboveLimit = taxableIncome - 800000;
        if (age < 40) {
          taxRate = 30;
        } else if (age >= 40 && age < 60) {
          taxRate = 40;
        } else {
          taxRate = 10;
        }
        taxAmount = (taxableAboveLimit * taxRate) / 100;
      }
  
      var finalIncome = taxableIncome - taxAmount;
  
      // Display final income in modal
      $("#overall-income").text(finalIncome.toFixed(2) + " ₹");
      $("#modal").show();
    });
  
    // Close modal on button click
    $("#close-modal").click(function() {
      $("#modal").hide();
    });
  
    // Show tooltip on error icon hover
    $(".error-icon").hover(function() {
      $(this).attr("title", $(this).data("error"));
    });
  });
  