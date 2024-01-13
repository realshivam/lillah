$(document).ready(function () {
  $(".page").hide(); // Hide all pages initially
  $("#page1").show(); // Show the first page

  // Add event listeners for page switching
  $("#buttonPage1").click(function () {
    $(".page").hide();
    $("#page2").show();
  });

  $("#buttonPage2").click(function () {
    $(".page").hide();
    $("#page3").show();
  });
});
