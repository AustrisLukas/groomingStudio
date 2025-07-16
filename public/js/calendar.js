
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    //SELECT ACTION
    select: function (info) {
      var currentDate = new Date();
      var eventDate = info.start;
      //CHECK IF EVENT SLOT NOT IN THE PAST
      if (eventDate < currentDate) {
        alert("That time has already passed. Please choose a future slot.");
        calendar.unselect();
        return;
      } else {
        //PROCEED EVENT BOOKING
        registerBooking(info);
      }
      calendar.unselect();
    },
    initialView: "dayGridMonth",
    views: {
      custom_sm_timeGrid: {
        type: "timeGrid",
        duration: { days: 1 },
        slotMinTime: "09:00:00",
        slotMaxTime: "19:00:00",
        allDaySlot: false,
        titleFormat: {    year: 'numeric',month: 'long',day: 'numeric'},
        dayHeaders: false,    
      },
      dayGridMonth: {
        eventContent: function(){
            return false;;
        }
      }
    },
    headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth'
      },
    //SWITCH TO custom_sm_timeGrid WHEN A DAY IS SELECTED
    dateClick: function (info) {
      calendar.changeView("custom_sm_timeGrid", info.dateStr);
    },
    //DISABLE 'SELECT' WHEN IN dayGridMonth VIEW
    viewDidMount: function (arg) {
      if (arg.view.type === "dayGridMonth") {
        calendar.setOption("selectable", false);
      } else {
        calendar.setOption("selectable", true);
      }
    },
    validRange: function (currentDate) {
      var minDate = new Date(currentDate.valueOf());
      var maxDate = new Date(currentDate.valueOf());
      maxDate.setDate(maxDate.getDate() + 21);
      return { start: minDate, end: maxDate };
    },
    height: "auto",
    events: [
      {
        title: "first event",
        start: "2025-07-13T10:00:00",
        end: "2025-07-13T12:00:00",
      },
      {
        title: "My Event",
        start: "2025-07-10T10:00:00",
        end: "2025-07-10T12:00:00",
        backgroundColor: "red", // background color of the event
        borderColor: "darkred", // border color of the event
        textColor: "white", // text color of the event
      },
    ],
  });
  calendar.render();
});

function registerBooking(info) {
  //Trigger modal to open
  const modalElement = document.getElementById("myModal");
  const myModal = new bootstrap.Modal(modalElement);
  myModal.show();
}
