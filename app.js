$(document).ready(function() {
    var array = [];
    var monthlyExp = 0;
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      // initialize a new variable as an empty object
      var values = {};

      // convert the form inputs into an array
      var fields = $('#employeeinfo').serializeArray();

      // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
      fields.forEach(function(element, index, array) {
        // review index notation vs. dot notation on objects
        // here, dot notation wouldn't work
        values[element.name] = element.value;
      });

      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');


      // append to DOM
      appendDom(values);
      monthlyExp = monthlyExp + (parseInt(values.employeeAnnualSalary) / 12);
      $('#monthlyExpenditures').text(monthlyExp);

    });
    //remove employee when delete button is pressed
    $('#employeeListTable').on('click', '.delete', function() {
      // monthlyExp -= $(this).closest('.employee').data("mExpenditure");
      // console.log($(this).closest('.employee').data("mExpenditure"));
      $('#monthlyExpenditures').text(monthlyExp);
      $(this).closest('.employee').remove();
    });

    //append new employee to table
    function appendDom(empInfo) {
      var expenditure = parseInt(empInfo.employeeAnnualSalary / 12)
      // console.log(expenditure);
      $('#employeeListTable').append('<tr class="employee"><th>' + empInfo.employeefirstname + '</th><th>' + empInfo.employeelastname + '</th><th>' + empInfo.employeeIdNumber + '</th><th>' + empInfo.employeeJobTitle + '</th><th>' + empInfo.employeeAnnualSalary + '</th><th><button class="delete">Delete</button></th>');
      $('.employee').data("mExpenditure", expenditure);
      console.log($('.employee').data("mExpenditure"));
    }

});
