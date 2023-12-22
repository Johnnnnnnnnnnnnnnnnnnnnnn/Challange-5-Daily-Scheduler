// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
    var hours = dayjs().format("H");
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function saveValues() {
    $(".saveBtn").on("click", function() {
      var itemKey = $(this).parent().attr("id");
      var itemValue = $(this).siblings(".description").val();
      localStorage.setItem(itemKey, itemValue);
    });
  };
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function manageColor () {
    $(".time-block").each(function() {
      var hour = parseInt(this.id);
      if (hour < hours) {
        $(this).removeClass("future present").addClass("past");
      } else if (hour == hours) {
        $(this).removeClass("future past").addClass("present");
      } else {
        $(this).removeClass("present past").addClass("future");
      } 
    })
  };

  function changeColor() {
    $(".time-block").each(function() {
      var hour = parseInt(this.id);
      $(this).toggleClass("future", hour > hours)
      $(this).toggleClass("present", hour == hours)
      $(this).toggleClass("past", hour < hours)
    })
  };

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".time-block").each(function() {
    var itemKey = $(this).attr("id");
    var itemValue = localStorage.getItem(itemKey);
    $(this).children(".description").val(itemValue);
  });
  
  // TODO: Add code to display the current date in the header of the page.
  function updatingTime() {
    var dateEl = $("#date");
    var dateCurrent = dayjs().format("dddd, MMMM D, YYYY");
    dateEl.text(dateCurrent);
  };

  saveValues();
  manageColor();
  changeColor();
  setInterval(updatingTime, 1000);
  });


