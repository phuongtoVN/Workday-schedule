// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const saveButton = $('.saveBtn');
const input = $('textarea');
const schedule = $('.container-lg .time-block');


$(function () {

  var currentDate = new Date($.now());
  var currentHour = currentDate.getHours();
  var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dayOfWeek = daysOfWeek[currentDate.getDay()];
  var dayOfMonth = currentDate.getDate();
  var monthOfYear = monthsOfYear[currentDate.getMonth()];
  var dateString = dayOfWeek + ', ' + monthOfYear + ' ' + dayOfMonth;

  $('#currentDay').text(dateString);
  for (var i = 0; i < schedule.length; i++) {
    if (i + 9 < currentHour) {
      $(schedule[i]).addClass('past');
    } 
    else if (i + 9 === currentHour) {
      $(schedule[i]).addClass('present');
    }
    else $(schedule[i]).addClass('future');
    console.log(i + 9, "current: ", currentHour);
  }

  $(document).ready(function() {
    // Load saved values from local storage and display them on page load
    
    $('.description').each(function() {
      console.log($(this).val());
      var key = $(this).data('key');
      var savedValue = localStorage.getItem(key);
      if (savedValue) {
        $(this).val(savedValue);
      }
    });
  
    // Add click event listener to each save button
    $('.saveBtn').click(function() {
      // Find the text input element within the same container element
      var input = $(this).closest('.time-block').find('.description');
      var inputValue = input.val();
  
      // Save the input value to local storage
      var key = input.data('key');
      localStorage.setItem(key, inputValue);
    });
  });

});
