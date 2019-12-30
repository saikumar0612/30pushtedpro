import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services';
import { Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { BehaviorSubject, from } from 'rxjs';
import { EventEmitterService } from '../../../core/services/event-emitter.service';
declare var $: any;

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit, OnDestroy {
  
// added image attribute - sharmistha - 08-06-2019 - start
  userData:any;
  orgData = {};
  loading = false;
  title1 = 'Tour of Heroes';
  orgChartDataSubscription = new BehaviorSubject<any>(null);
  orgChartData = this.orgChartDataSubscription.asObservable();
  // added image attribute - sharmistha - 08-06-2019 - end
  triggerChangeSubject = new BehaviorSubject<any>(null);
  triggerChange = this.triggerChangeSubject.asObservable();
  ispermesion:boolean = false;
  data;
	logger:any={};
  log:any={};

  constructor(public http: Http, public auth: AuthenticationService, public service: UserService,private router: Router,private eventEmitterService: EventEmitterService) {
    this.getOrgChart();
    this.logger.actionPath=this.router.url;
		this.logger.actionTitle='Organization Chart';
		this.logger.comment='Organization Chart';
		this.service.adduserLogs(this.logger)
		.subscribe(response=>{
		this.log = response.json().data;   
		this.eventEmitterService.onRecentActivityRefresh();    
		});
   }
  
  getOrgChart(){
    this.loading = true;
    this.service.getOrgChart()
      .subscribe(response => {
        this.userData = response.json().data;
        this.loading = false;
        this.orgData = this.userData[0];
        this.orgChartDataSubscription.next(this.orgData);
      })
  }

  ngOnDestroy() {
    this.orgChartDataSubscription.unsubscribe();
  }

  closePopup(){
    this.ispermesion = false;
   
    this.getOrgChart();
  }

  updateTree(fromID, toID) {
    this.loading=true;
    this.service.updateTree(fromID, toID).subscribe(response => {
      this.data = response.json();
      this.userData =this.data.data; 
      console.log(this.userData);
      if(this.data.statusCode.code === '200'){
        this.loading = false;  
        this.orgData = this.userData[0];
        this.orgChartDataSubscription.next(this.orgData);
      }else {
        this.loading = false;
        this.ispermesion = true;
      }
    })
  }

  ngOnInit() {
    this.loading = true;
    this.triggerChange.subscribe(res => {
      console.log(res);
      if(!res)
        return;
      if((res.fromID  && res.fromID.length) && (res.toID && res.toID.length))
        this.updateTree(res.fromID, res.toID);
      else
        this.getOrgChart();
    })

    $(document).ready(function () {
      console.log('this ', this);
      let component = this;
      this.orgChartData
      .subscribe(response => {
        if(!response)
          return;
        this.loading = false;
        setTimeout(() => {
         var oc = $('#org').orgchart({
            'data': response,
            'nodeContent': 'type',
            'direction': 'l2r',
            'visibleLevel': 4,
            'verticalLevel': 3,
            'draggable': true,
            'createNode': function($node, data) {
              $node.children('.node').wrapInner('<a href="/usersView/view-user-profile/' + data.id + '" style="color:#fff;"></a>');
            },
            'dropCriteria': function($draggedNode, $dragZone, $dropZone) {
              return true;
            } 
            // 'nodeTemplate': nodeTemplate
          });
        }, 500);
      });
        $('#org').on('init.orgchart', function(chart) {
              console.log('chart ', chart)
        });

        $('#org').on('nodedrop.orgchart', function(event, params) {
          console.log('node ', params);
          this.loading = true;
          let fromID = params.draggedNode[0].id;
          let toID  = params.dropZone[0].id;
          rearrangeTree(fromID, toID);          
        });

        $("#btn-filter-node").on("click", function() {                                                                                     
          filterNodes($("#key-word").val());
        });
    
        $("#btn-cancel").on("click", function() {
          clearFilterResult();
        });

        function filterNodes(keyWord) {
          if (!keyWord.length) {
            window.alert("Please type key word firstly.");
            return;
          } else {
            var $chart = $(".orgchart");
            // disalbe the expand/collapse feture
            $chart.addClass("collapsable");
            // distinguish the matched nodes and the unmatched nodes according to the given key word
            $chart
              .find(".node")
              .filter(function(index, node) {
                return (
                  $(node)
                    .text()
                    .toLowerCase()
                    .indexOf(keyWord) > -1
                );
              })
              .addClass("matched")
              .addClass("product-dept")
              .closest("table")
              .parents("table")
              .find("tr:first")
              .find(".node")
              .addClass("retained");
            // hide the unmatched nodes
            $chart.find(".matched,.retained").each(function(index, node) {
              $(node)
                .removeClass("slide-up")
                .closest(".nodes")
                .removeClass("hidden")
                .siblings(".lines")
                .removeClass("hidden");
              var $unmatched = $(node)
                .closest("table")
                .parent()
                .siblings()
                .find(".node:first:not(.matched,.retained)")
                .closest("table")
                .parent()
                .addClass("hidden");
              $unmatched
                .parent()
                .prev()
                .children()
                .slice(1, $unmatched.length * 2 + 1)
                .addClass("hidden");
            });
            // hide the redundant descendant nodes of the matched nodes
            $chart.find(".matched").each(function(index, node) {
              if (
                !$(node)
                  .closest("tr")
                  .siblings(":last")
                  .find(".matched").length
              ) {
                $(node)
                  .closest("tr")
                  .siblings()
                  .addClass("hidden");
              }
            });
          }
        }

        function clearFilterResult() {
          $(".orgchart")
            .removeClass("noncollapsable")
            .find(".node")
            .removeClass("matched retained")
            .end()
            .find(".hidden")
            .removeClass("hidden")
            .end()
            .find(".slide-up, .slide-left, .slide-right")
            .removeClass("slide-up slide-right slide-left");

          $("#key-word").val("");
        }

        function rearrangeTree(fromID, toID) {
          $('#org').empty();
          component.loading = true;
          console.log('component ', component);
          component.triggerChangeSubject.next({fromID, toID});
        }

        $("#key-word").on("keyup", function(event) {
          if (event.which === 13) {
            filterNodes(this.value);
          } else if (event.which === 8 && this.value.length === 0) {
            clearFilterResult();
          }
        });
    }.bind(this));
  }

}
