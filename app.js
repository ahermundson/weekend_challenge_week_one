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
      // $('#employeeinfo').find('input[type=text], input[type=number]').val('');

      // append to DOM
      appendDom(values);
      (this).reset();
      $('#employeefirstname').focus();
    });
    //remove employee when delete button is clicked
    $('#employeeListTable').on('click', '.delete', deleteEmployee);

    //function to append new employee to table
    function appendDom(empInfo) {
      var expenditure = parseFloat(empInfo.employeeAnnualSalary / 12)
      $('#employeeListTable').append('<tr class="employee"><th>' + empInfo.employeefirstname + '</th><th>' + empInfo.employeelastname + '</th><th>' + empInfo.employeeIdNumber + '</th><th>' + empInfo.employeeJobTitle + '</th><th>' + parseFloat(empInfo.employeeAnnualSalary).toLocaleString('en', {style: 'currency', currency: 'USD'}) + '</th><th><button class="delete">Delete</button></th>');
      $('.employee').fadeIn('slow');
      $('#employeeListTable').find('.employee:last').data("mExpenditure", expenditure);
      monthlyExp = monthlyExp + expenditure;
      $('#monthlyExpenditures').text(monthlyExp.toLocaleString('en', {style: 'currency', currency: 'USD'}));
    }

    //function to delete employee info from dom and reduce monthly expenditure total
    function deleteEmployee() {
      if (confirm("Are you sure you wish to delete this employee?")) {
      monthlyExp -= $(this).closest('.employee').data("mExpenditure");
      $('#monthlyExpenditures').text(monthlyExp.toLocaleString('en', {style: 'currency', currency: 'USD'}));
      $(this).closest('.employee').fadeOut('slow', function() {$(this).remove()});
      }
    }

});
