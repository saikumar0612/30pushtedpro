import { Component, OnInit, HostListener, EventEmitter, Output  } from '@angular/core';
import { Directive } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Location } from '@angular/common';
import { PatternsService } from 'src/app/core/services/patterns.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  checkPaaData;
  currentUser:any; 
  changesData:any ={
    userId:'',
    oldPassword:'',
    password:'',
    cpassword:''
  };
  checkData:any;
  id;
  passwordError;
  result;
  isSuccess:boolean = false;
  isFailure:boolean = false;
  passwordLength;
  capsOn;
  capsError;
  constructor(private service:UserService, private location:Location, private pattern:PatternsService) {
    this.passwordLength = this.pattern.passwordLength;
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    
    this.id = this.currentUser.id;
    console.log(this.id);
    this.changesData.userId = this.currentUser.id;
    
    const input = document.getElementById("myInput");   

    const text = document.getElementById("text");
    input.addEventListener("keyup", function(event) {

    if (event.getModifierState("CapsLock")) {
        text.style.display = "block";
      } else {
        text.style.display = "none"
      }
    });

    const input1 = document.getElementById("myInput1");

    input1.addEventListener("keyup", function(event) {

      if (event.getModifierState("CapsLock")) {
          text.style.display = "block";
        } else {
          text.style.display = "none"
        }
      });
      
    const input2 = document.getElementById("myInput2");

    input2.addEventListener("keyup", function(event) {

      if (event.getModifierState("CapsLock")) {
          text.style.display = "block";
        } else {
          text.style.display = "none"
        }
      });

    
  }


  // checkOldPassword(){
  //   console.log(this.id);
  //   this.passwordError = "";
  //   this.checkData.userId =  this.id;
  //   this.checkData.oldPassword = this.changesData.oldPassword;
  //   console.log(this.checkData);
  //   this.service.checkPassword(this.checkData).subscribe(res=>{
  //     this.checkPaaData = res.json();
  //     console.log(this.checkPaaData);
  //     if(this.checkPaaData.statusCode.code === '200'){
  //       this.passwordError = "";
  //     }else if(this.checkPaaData.statusCode.code === '409'){
  //       this.passwordError = this.checkPaaData.data.errorMessages;
  //     }
  //   });
  // }


  changePassword(passwordForm:NgForm){
    this.service.changeUserPassword(this.changesData).subscribe(res=>{
      this.result = res.json();
      console.log(this.result);
      if(this.result.statusCode.code === '200'){
        this.isSuccess = true;
        passwordForm.resetForm();
      }else if(this.result.statusCode.code === '409') {
        this.passwordError = this.result.errorMessages;
        
      }else{
        this.isFailure = true;
      }
    })
  }

  closePopup(){
    this.isFailure = false;
  }
  close(){
    this.isSuccess = false;
  }

  cancel(){
    this.location.back();
  }

}

