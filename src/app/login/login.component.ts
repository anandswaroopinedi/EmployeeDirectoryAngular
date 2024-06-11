import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:FormGroup;
  dispLogin:boolean=true;
  constructor(private route:Router,private loginService:LoginService)
  {
    this.loginForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  onSubmit()
  {
    console.log(this.loginForm.value);
    if(this.loginForm.valid)
    {
      this.dispLogin=false;
      this.loginService.postLoginDetails(this.loginForm.value).subscribe((value)=>{
        sessionStorage.setItem('token',value);
        this.route.navigate(["/home"]);
      })
    }
  }
}
