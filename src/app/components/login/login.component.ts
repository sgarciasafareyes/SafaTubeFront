// import { Component } from '@angular/core';
// import {RouterLink} from "@angular/router";
//
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     RouterLink
//   ],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//
//
// }


// _________________________________


// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {FormsModule} from "@angular/forms";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   standalone: true,
//   imports: [
//     FormsModule
//   ],
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private http: HttpClient) {}
//
//   login() {
//     const credentials = {
//       username: 'tu_usuario',
//       password: 'tu_contraseña'
//     };
//
//     this.http.post('https://127.0.0.1:8000/api/login_check', credentials)
//       .subscribe(response => {
//         console.log('Inicio de sesión exitoso', response);
//         // Maneja la respuesta del backend, por ejemplo, guarda el token de sesión.
//       }, error => {
//         console.error('Error en el inicio de sesión', error);
//         // Maneja los errores, por ejemplo, muestra un mensaje al usuario.
//       });
//   }
// }
//
//
// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
// });
//
// this.http.post('https://127.0.0.1:8000/api/login_check', data, { headers: headers })
//   .subscribe(response => {
//     console.log('Inicio de sesión exitoso', response);
//     // Manejar la respuesta del backend
//   }, error => {
//     console.error('Error en el inicio de sesión', error);
//     // Manejar los errores
//   });

//
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
//
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   standalone: true,
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private http: HttpClient) {}
//
//   login() {
//     const credentials = {
//       username: '',
//       password: ''
//     };
//
//     this.http.post('https://127.0.0.1:8000/api/login_check', credentials)
//       .subscribe(response => {
//         console.log('Inicio de sesión exitoso', response);
//         // Maneja la respuesta del backend, por ejemplo, guarda el token de sesión.
//       }, error => {
//         console.error('Error en el inicio de sesión', error);
//         // Maneja los errores, por ejemplo, muestra un mensaje al usuario.
//       });
//   }
// }


import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Generalservice} from "../../service/generalservice";
import {Login} from "../../models/Login";
import {Router, RouterLink} from "@angular/router";
import {Injectable} from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {NgClass} from "@angular/common";
import {ToastrModule, ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";



@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass

  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  // Logear: any = FormGroup;
  // generalservice: any = Generalservice;
  Logear: any = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  passwordFieldType: string = 'password';
  constructor(private generalservice: Generalservice, private formBuilder: FormBuilder,  private router: Router) {

  }


  async login() {
    const credentials = new Login(this.Logear.value.username, this.Logear.value.password);
    try {
      const response = await this.generalservice.loginUser(credentials);
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', <string>credentials.username);

        console.log('Inicio de sesión exitoso', response);
        Swal.fire('Usuario Logueado con éxito', '', 'success');
        this.router.navigate(['/safaTube/home']);


      } else {
        console.error('Error en el inicio de sesión', 'Token no válido');
        Swal.fire('¡error! Token no válido', '', 'error');

      }
    } catch (error) {
      console.error('Error en el inicio de sesión', error);
      Swal.fire('¡error!', '', 'error');

    }
    // finally {
    //   this.router.navigate(['/safaTube/home']);
    // }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }

  ngAfterViewInit(): void {
  }

}
