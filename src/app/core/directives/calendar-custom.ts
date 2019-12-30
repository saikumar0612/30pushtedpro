import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
  } from 'angular-calendar';

export interface CustomCalendar extends CalendarEvent {
    description?: any;
    jobTitle?: any;
    duration?: any;
    branchName?: any;
    candidateName?: any;
    clientCompany?: any;
}