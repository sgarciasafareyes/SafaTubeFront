import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Generalservice} from "../../service/generalservice";

@Component({
  selector: 'app-playvideo',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './playvideo.component.html',
  styleUrl: './playvideo.component.css'
})
export class PlayvideoComponent implements OnInit{
  constructor(private route:ActivatedRoute, private dataservice: Generalservice) {}
  video:any;
  ngOnInit() {
    // this.route.params.subscribe(params =>
    //   {const videoId= +params['id'];
    //     if (videoId) {
    //       this.dataservice.enviarIdVideoPlayingBaseDatos(videoId)
    //         .subscribe(
    //           data => {
    //             this.video = data;
    //           },
    //           error => {
    //             console.error("no funciona", error);
    //           }
    //         )
    //     }
    //   }
    // )
  }
}
