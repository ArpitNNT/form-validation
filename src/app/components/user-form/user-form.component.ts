import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserServiceService } from 'src/app/service/user-service.service';

interface IDType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  noOfdaysIn2021='';
  status = '';
  userRegister: FormGroup;
  belowData: boolean = true;

  idsList: IDType[] = [
    { value: 'aadhar', viewValue: 'Aadhar' },
    { value: 'pancard', viewValue: 'pancard' },
    { value: 'voterID', viewValue: 'VoterId' },
    { value: 'passport', viewValue: 'Passport' }
  ];

  constructor(private formBuilder: FormBuilder, private userService: UserServiceService) { }


  ngOnInit(): void {

    this.userRegister = this.formBuilder.group({
   
      status: ['Yes',Validators.required],
      idType: [null, [Validators.required]],
      noOfdaysIn2020: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      noOfdaysIn2021: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
    });
  }
  
  
  
  sendForm() {
    let formDetails = <any>this.userRegister.value;
    this.status = this.userRegister.get("status").value;
    this.noOfdaysIn2021 = this.userRegister.get("noOfdaysIn2021").value;
    console.log(formDetails)
    this.userService.sendUserFormData(formDetails).subscribe(res => {
      this.userRegister.reset()
    },
      (error: any) => {
        this.userRegister.reset()
      }
    );

    
  }
}





