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
    });
    //remove employee when delete button is clicked
    $('#employeeListTable').on('click', '.delete', deleteEmployee);

    //function to append new employee to table
    function appendDom(empInfo) {
      var expenditure = parseFloat(empInfo.employeeAnnualSalary / 12)
      $('#employeeListTable').append('<tr class="employee"><th>' + empInfo.employeefirstname + '</th><th>' + empInfo.employeelastname + '</th><th>' + empInfo.employeeIdNumber + '</th><th>' + empInfo.employeeJobTitle + '</th><th>' + empInfo.employeeAnnualSalary + '</th><th><button class="delete">Delete</button></th>');
      $('#employeeListTable').find('.employee:last').data("mExpenditure", expenditure);
      monthlyExp = monthlyExp + expenditure;
      $('#monthlyExpenditures').text(monthlyExp);
    }

    //function to delete employee info from dom and reduce monthly expenditure total
    function deleteEmployee() {
      monthlyExp -= $(this).closest('.employee').data("mExpenditure");
      $('#monthlyExpenditures').text(monthlyExp);
      $(this).closest('.employee').remove();
    }

});
