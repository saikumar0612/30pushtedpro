import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';
import { VmsCandidateService } from '../../../core/services/vmsCandidate.service';
import { FormsModule, NgForm } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CustomCalendar} from '../../../core/directives/calendar-custom';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green:{
    primary: '#325e09',
    secondary: '##325e09'
  }
};

@Component({
  selector: 'app-candidate-calendar',
  templateUrl: './candidate-calendar.component.html',
  styleUrls: ['./candidate-calendar.component.css']
})
export class CandidateCalendarComponent implements OnInit {
  tmpDate:any;
  loading;
  eventData:any={};
  showCalendar:any=[]
  eventsList:any={};
  copyEvent:any={};
  singleEvent:any={};
  currentUser:any={
    id:''
  };
  id:any;
  currentDate=new Date();
  today:any;
 
  constructor(private route: ActivatedRoute, public http: Http, private router: Router, public backLoc: Location, private service:VmsCandidateService, private modal: NgbModal) { }

  ngOnInit() {
    this.today=new DatePipe('en-US').transform ( this.currentDate, 'yyyy-MM-dd');
    this.loading=true;
    this.currentUser = JSON.parse(localStorage.getItem('candidateUserData'));
    this.id=this.currentUser.id;
    this.service.getCalendarEventsCandidate()
    .subscribe(response => {
      this.eventsList = response.json().data;
      if(this.eventsList){
        if(this.eventsList.length>1){
          this.eventsList.forEach(obj => {
            this.copyEvent = "";
            this.singleEvent.start = new Date(obj.startDate);
            this.singleEvent.duration= obj.duration;
            this.singleEvent.jobTitle=obj.jobTitle;
            this.singleEvent.title=obj.notes;
            this.singleEvent.description=obj.description;
            this.tmpDate=new DatePipe('en-US').transform ( obj.startDate, 'yyyy-MM-dd');
            if(this.tmpDate<this.today){
              this.singleEvent.color= colors.green;
            }
            else{
              this.singleEvent.color= colors.red;
            }
            // actions: this.actions,
            this.singleEvent.allDay= true;
            this.singleEvent.resizable= {
              beforeStart: true,
              afterEnd: true
            };
            this.singleEvent.draggable= true;
            this.singleEvent.actions= this.actions;
          
            this.copyEvent=this.singleEvent;
            this.showCalendar.push(this.singleEvent);
            this.singleEvent = {
              start:'',
              duration:'',
              title:'',
              color:'',
              allDay:'',
              resizable:{},
              draggable:'',
              description:'',
              jobTitle:''
            }
            this.refresh.next();
            this.loading=false;
          });
        }
        else{
          this.copyEvent = "";
            this.singleEvent.start=  new Date(this.eventsList[0].startDate);
            this.singleEvent.end=  new Date(this.eventsList[0].endDate);
            this.singleEvent.title=this.eventsList[0].notes;
            this.singleEvent.description=this.eventsList[0].description;
            this.singleEvent.jobTitle=this.eventsList[0].jobTitle;
            this.singleEvent.duration=this.eventsList[0].duration;
            this.tmpDate=new DatePipe('en-US').transform ( this.eventsList[0].startDate, 'yyyy-MM-dd');
            if(this.tmpDate<this.today){
              this.singleEvent.color= colors.green;
            }
            else{
              this.singleEvent.color= colors.red;
            }
            // actions: this.actions,
            this.singleEvent.allDay= true;
            this.singleEvent.resizable= {
              beforeStart: true,
              afterEnd: true
            };
            this.singleEvent.draggable= true;
            this.singleEvent.actions= this.actions;
          
            this.copyEvent=this.singleEvent;
            this.showCalendar.push(this.singleEvent);
            this.singleEvent = {
              start:'',
              end:'',
              title:'',
              color:'',
              allDay:'',
              resizable:{},
              draggable:'',
              description:'',
              jobTitle:'',
              duration:''
            }
            this.refresh.next();
            this.loading=false;
        }
      }
      else{
        this.loading=false;
      }
      
      console.log(this.showCalendar);


    },
      error => {
        console.log(error);
      }
    );
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CustomCalendar;
  };

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();
  events:CustomCalendar[]=this.showCalendar;
  activeDayIsOpen: boolean = true;

  
  dayClicked({ date, events }: { date: Date; events: CustomCalendar[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged(event: any): void {
    // this.events.filter(e => e.id === event.id).map(em => { 
    //   em.start = event.start;
    //   em.end = event.end;
    //   return em;
    // });
    this.events.map(em => {
     if(em.id === event.id) {
       em.start = event.start;
      em.end = event.end;
     }
      return em;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CustomCalendar): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  submitEvent(){
    this.events = [
      ...this.events,
      {
        title: this.eventData.note,
        start:this.eventData.startDate,
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];


  }
  

  deleteEvent(eventToDelete: CustomCalendar) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
