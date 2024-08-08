import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { Calendar as SmallCalender } from "react-calendar";
import moment, { format as formatMoment } from "moment";
import "./App.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    type: "Appointment",
    start: new Date(2024, 7, 8, 8, 30),
    end: new Date(2024, 7, 8, 9, 30),
  },
  {
    title: "Big Meeting 1",
    type: "Event",
    //allDay: true,
    start: new Date(2024, 7, 9, 10, 30),
    end: new Date(2024, 7, 9, 12),
  },
  {
    title: "Appointment",
    type: "Appointment",
    //allDay: true,
    start: new Date(2024, 7, 9, 13, 30),
    end: new Date(2024, 7, 9, 15),
  },
  {
    title: "Big Meeting 2",
    type: "Event",
    //allDay: true,
    start: new Date(2024, 7, 10, 14, 30),
    end: new Date(2024, 7, 10, 15),
  },
];

function App() {
  const [value, onChange] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [listofDates, setListofDates] = useState([]);
  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }
  const handleChangeSmallCalender = (date) => {
    onChange(date);
  };
  useEffect(() => {
    const list = allEvents.filter((event) => {
      const eventDate =
        event.start.getDate() +
        event.start.getMonth() +
        event.start.getFullYear() +
        "";
      const chosenDate =
        value.getDate() + value.getMonth() + value.getFullYear() + "";
      return eventDate === chosenDate;
    });
    setListofDates(list);
  }, [value]);
  //  const formattedData = data.map(item => ({
  //    ...item,
  //    formattedStartDate: moment(item.startDate).format('HH/mm/ss')
  //}));
  return (
    <div className="App">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl">Calendar</h1>
        <h2 className="text-xl">Add New Event</h2>
      </div>
      <div className="flex w-full justify-between">
        <div className="w-2/6 p-2 flex flex-col items-center">
          <SmallCalender
            className="w-full"
            onChange={handleChangeSmallCalender}
            value={value}
          />
          <div className="w-full border-1 border-black m-1"></div>
          <div className="p-2 w-full">
            <div className="flex justify-between w-full">
              <h1 className="text-xl text-[#0F4C81] font-bold">
                Upcoming Events
              </h1>
              <button className="bg-[#0F4C81] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View All
              </button>
            </div>
            <span>{moment(value).format("dddd, MMMM Do YYYY")}</span>
            {listofDates.length > 0 ? (
              listofDates.map((event) => {
                return (
                  <>
                    <div className={`w-full border-2 border-black m-1 border-solid p-2 ${event.type == "Event" ? "bg-[#0F4C81] text-white" : ""}` }>
                      <div className="w-full flex justify-between">
                        <p className="text-xl font-bold">{event.title}</p>
                        <p className="text-xl font-bold">{event.type}</p>
                      </div>
                      <p className=" font-bold">
                        {moment(event.start).format("HH:mm A")} -{" "}
                        {moment(event.end).format("HH:mm:ss Z")}{" "}
                      </p>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="text-xl font-bold">No Events</p>
            )}
          </div>
        </div>
        <div className="w-4/6">
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
