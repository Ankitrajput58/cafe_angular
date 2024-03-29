import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { StorageService } from '../../auth-services/storage-service/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm: FormGroup;
  isSpinning: BooleanInput;

  constructor(private service:AuthService,
    private fb: FormBuilder ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null,Validators.required],
      password:[null,Validators.required]
    })
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
      if(res.userId != null){
        const user ={
          id:res.userId,
          role:res.userRole
        }
        console.log(user);
        StorageService.saveToken(res.jwt);
        StorageService.saveUser(user)
      }else{
        console.log("Wrong credentials !!")
      }
    });
    
    }
}
