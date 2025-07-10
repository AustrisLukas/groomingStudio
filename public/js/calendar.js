document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    select: function (info) {
      // Prompt user for event title
      var currentDate = new Date();
      var eventDate = info.start;
      //Check if slot is NOT in past
      if (eventDate < currentDate) {
        alert("That time has already passed. Please choose a future slot.");
        calendar.unselect();
        return;
      } else {
        registerBooking(info);
        const title = prompt("Enter Appointment Title:");
        if (title) {
          calendar.addEvent({
            title: title,
            start: info.start,
            end: info.end,
            allDay: info.allDay,
          });
        }
      }
      calendar.unselect();
    },
    // Calendar options
    initialView: window.innerWidth < 768 ? "custom_sm_timeGrid" : "custom_lg_timeGrid",
    slotDuration: "0:30:00",
    snapDuration: "2:00:00",
    allDaySlot: false,
    views: {
      custom_lg_timeGrid: {
        type: "timeGrid",
        duration: { days: 7 },
        slotMinTime: "09:00:00",
        slotMaxTime: "19:00:00",
        titleFormat: { day: "2-digit", month: "short" },
        dayHeaderFormat: { weekday: "short", day: "numeric", month: "short" },
      },
      custom_sm_timeGrid: {
        type: "timeGrid",
        duration: { days: 1 },
        slotMinTime: "09:00:00",
        slotMaxTime: "19:00:00",
        titleFormat: { day: "2-digit", month: "short" },
        dayHeaderFormat: { weekday: "short", day: "numeric", month: "short" },
      },
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
        start: "2025-07-06T10:00:00",
        end: "2025-07-06T12:00:00",
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
