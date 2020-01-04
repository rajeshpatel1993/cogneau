import { Component, OnInit } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup;
  constructor(private fb: FormBuilder  ) { 


  }

  ngOnInit() {
    this.initializeLoginForm();
  }

  get formControls() { return this.loginForm.controls; }


  initializeLoginForm(){
    this.loginForm  =  this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
  });
  }


  login(){
    let {username, role} = this.loginForm.value;
    console.log(username);
  }
}
