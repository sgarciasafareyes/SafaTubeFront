// import { Component } from '@angular/core';
// import {HeaderComponent} from "../../header/header.component";
// import {Generalservice} from "../../../service/generalservice";
// import {ActivatedRoute, Router, RouterLink} from "@angular/router";
// import {HttpClient} from "@angular/common/http";
// import {FormsModule} from "@angular/forms";
// import {Video} from "../../../models/Video";
//
// @Component({
//   selector: 'app-crear-video',
//   standalone: true,
//   imports: [
//
//     FormsModule,
//     RouterLink
//   ],
//   templateUrl: './crear-video.component.html',
//   styleUrl: './crear-video.component.css'
// })
// export class CrearVideoComponent {
//
//   videoNuevo: Video = new Video();
//   datos: any;
//   usuarioLogeadoId: any;
//   canalLogeadoId: any;
//
//
//   constructor(private service:Generalservice, private router: Router, private route: ActivatedRoute, private http: HttpClient,) {
//   }
//
//   crearVideo(){
//     console.log('Valor recibido:', this.videoNuevo);
//     this.route.params.subscribe(params =>
//     {
//       if (this.videoNuevo){
//         this.service.CrearVideo(this.videoNuevo)
//           .subscribe(data=> {
//               this.datos=data;
//               console.log(data);
//             },
//             error => {
//               console.error("no funciona", error);
//             })
//       }
//     })
//   }
//
//   crearVideo2(){
//     this.service.getUsuarioLogeado(localStorage.getItem('username'))
//       .subscribe(
//         usuario => {
//           this.service.getCanalUsuarioLogeado(usuario.id)
//             .subscribe(
//               canal => {
//                 this.videoNuevo.canal = canal;
//                     this.service.CrearVideo(this.videoNuevo)
//                       .subscribe(data=> {
//                           this.datos=data;
//                           console.log(data);
//                         },
//                         error => {
//                           console.error("no funciona", error);
//                         })
//
//               }
//             )
//       }
//     )
//   }
//
//
//
// }
//
