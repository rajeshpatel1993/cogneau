import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router  ) { 


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
    this.loginService.login(this.loginForm.value).subscribe(data => {
      if(data){
        this.router.navigate(['news']);

      }
    }, error=>{
      console.log(error);
    });
    
  }
}
