import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg, EventRenderedArgs } from "@fullcalendar/common";
import styled from "styled-components";
import { getCalendar } from "@/api";

interface EventObject {
  title: string;
  date: string;
}

const CalendarFormFullCalendar = () => {
  const [events, setEvents] = useState<EventObject[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const calendarRef = useRef<FullCalendar>(null);

  const initialRender = useRef<boolean>(true);

  const handleDateClick = (arg: DateClickArg) => {
    alert(arg.dateStr);
  };

  const handleDatesSet = (arg: any) => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const calendarApi = calendarRef.current!.getApi();
      const newDate = calendarApi.getDate();
      const newYear = newDate.getFullYear();
      const newMonth = newDate.getMonth() + 1;
      if (newYear !== year || newMonth !== month) {
        setYear(newYear);
        setMonth(newMonth);
        console.log("handleDatesSet-setYear, setMonth : ", newYear, newMonth);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCalendar(year, month, "ozazat");
        const eventsData = Object.entries(res).reduce((acc: EventObject[], [day, dayData]: [string, unknown]) => {
          const typedDayData = dayData as Record<string, unknown>[]; 
          const totalIncome = typedDayData.reduce((total: number, curr: any) => (curr.amount > 0 ? total + curr.amount : total), 0);
          const totalExpense = typedDayData.reduce((total: number, curr: any) => (curr.amount < 0 ? total - curr.amount : total), 0);
          const total: number = totalIncome - totalExpense;

          return [
            ...acc,
            {
              title: `${totalIncome ? totalIncome : "none"},${totalExpense ? totalExpense : "none"},${
                totalIncome && totalExpense ? total : "none"
              }`,
              date: `${year}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`
            }
          ];
        }, []);
        setEvents(eventsData);
        console.log("useEffect-fetchData-월일 : ", year, month);
        console.log("useEffect-fetchData-events : ", eventsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [year, month]);

  const renderEventContent = (eventInfo: EventRenderedArgs) => {
    let [income, expense, total] = eventInfo.event.title.split(",");
    return (
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: "0.4em", fontWeight: 900, color: "#34BE3A", visibility: income !== "none" ? "visible" : "hidden" }}>
          {Number(income).toLocaleString()}
        </div>
        <div style={{ fontSize: "0.4em", fontWeight: 900, color: "#ff7473", visibility: expense !== "none" ? "visible" : "hidden" }}>
          {Number(expense).toLocaleString()}
        </div>
        <div style={{ fontSize: "0.4em", fontWeight: 900, color: "#333333", visibility: total !== "none" ? "visible" : "hidden" }}>
          {Number(total).toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <CalendarContainer>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        datesSet={handleDatesSet}
        eventContent={renderEventContent}
        locale="ko"
        height="auto"
        dayCellContent={renderDayCellContent}
        dayMaxEventRows={true}
        eventDisplay="block"
        buttonText={{
          today: "오늘"
        }}
        buttonIcons={{
          prevYear: "chevron-double-left",
          nextYear: "chevron-double-right"
        }}
        customButtons={{
          moveYearBack: {
            icon: "chevrons-left",
            click: function () {
              let calendarApi = calendarRef.current!.getApi();
              calendarApi.prevYear();
            }
          },
          moveYearNext: {
            icon: "chevrons-right",
            click: function () {
              let calendarApi = calendarRef.current!.getApi();
              calendarApi.nextYear();
            }
          }
        }}
        headerToolbar={{
          left: "title",
          center: "moveYearBack,prev,next,moveYearNext",
          right: "today"
        }}
      />
    </CalendarContainer>
  );
};

function renderDayCellContent(dayRenderInfo: any) {
  return <>{dayRenderInfo.dayNumberText.replace("일", "")}</>;
}

export default CalendarFormFullCalendar;

const CalendarContainer = styled.div`
  margin-top: 2px;
  width: 440px;
  padding: 2px 32px 0;
  position: absolute; // relative 로 지정해야되는데 억지로 맞춰놨다.
  top : 170px;

  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0.5em; 
  }
  .fc-button {
    padding: 2px 4px;
    margin: 2px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  .fc-button .fc-icon {
    color: #d9d9d9;
  }
  .fc-button:not(:disabled) {
    color: white;
  }
  .fc-button:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  .fc-button.fc-today-button {
    color: gray;
  }
  .fc-daygrid-day {
    height: 80px;
  }
  .fc-daygrid-day.fc-event {
    background: none;
    border: none;
  }
  .fc-event {
    background-color: transparent;
    border: none;
  }
  .fc-daygrid-day-events {
    margin-bottom: 0 !important;
  }
`;
