// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () 
{
var today = dayjs().format("ddd, MMM DD YYYY");
//show date on header
// console.log(today);
$("#currentDay").text(today);

//show time blocks dynamically
var dayPlan = 
[
  { time: "9 AM", id:9, 
      event: "" },
  { time: "10 AM", id:10, 
      event: "" },
  { time: "11 AM", id:11, 
      event: "" },
  { time: "12 PM", id:12, 
      event: "" },
  { time: "1 PM", id:1, 
      event: "" },
  { time: "2 PM", id:2, 
      event: "" },
  { time: "3 PM", id:3, 
      event: "" },
  { time: "4 PM", id:4, 
      event: "" },
  { time: "5 PM", id:5, 
      event: "" },
];

/* Local Storage auto pull*/
var toDo = JSON.parse(localStorage.getItem("banana"));
if (toDo) 
{
  dayPlan = toDo;
}

// create rows
dayPlan.forEach(function(hourDay, index) 
{
	var label = hourDay.time;
  var id = hourDay.id;
	var ppp = color(id);
	var row =
  ///jquery or jqurey UI??
		'<div class="hour-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		label +
		'</div><textarea class="form-control ' +
		ppp +
		'">' +
		hourDay.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adding rows to container div */
	$(".container").append(row);
});
// color each color block
function color(time) 
{
  var currentHour = dayjs().format('h');
  var futureHour = time;

  if (currentHour < futureHour){
    return "past";
  }else if(currentHour>futureHour){
    return "future";
  }else{return "present"}
}


/// saving to local

$(".saveBtn").on("click", function() {
	var localTimeBlock = parseInt(
		$(this)
			.closest(".hour-block")
			.attr("id")
	);
	var inputTodo = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	dayPlan[localTimeBlock].event = inputTodo;

	/* Set local storage */
	localStorage.setItem("banana", JSON.stringify(dayPlan));
});
  });

