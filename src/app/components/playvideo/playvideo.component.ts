import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Generalservice} from "../../service/generalservice";
import {NgForOf, NgIf} from "@angular/common";
import {YouTubePlayer} from "@angular/youtube-player";

@Component({
  selector: 'app-playvideo',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    NgForOf,
    YouTubePlayer
  ],
  templateUrl: './playvideo.component.html',
  styleUrl: './playvideo.component.css'
})
export class PlayvideoComponent implements OnInit,AfterViewInit, OnDestroy {
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  constructor(private route:ActivatedRoute, private dataservice: Generalservice,private _changeDetectorRef: ChangeDetectorRef) {
    this.demoYouTubePlayer = this.video;
  }
  video:any;
  darLikeVideo: any;
  darDislikeVideo: any;
  comentarios: any;
  respuestas:any;
  recomendaciones:any;
  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    this.videoWidth = Math.min(this.demoYouTubePlayer.nativeElement.clientWidth, 1200);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }
  ngOnInit() {
    this.route.params.subscribe(params =>
      {const videoId= +params['id'];
        if (videoId) {
          this.dataservice.enviarIdVideoPlayingBaseDatos(videoId)
            .subscribe(
              data => {
                this.video = data;
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
      }
    )

    this.route.params.subscribe(params =>
      {const videoId= +params['id'];
        if (videoId) {
          this.dataservice.enviarIdVideoRecibirComentarios(videoId)
            .subscribe(
              data => {
                this.comentarios = data;
                this.comentarios = this.comentarios.videos;
              },
              error => {
                console.error("no funciona", error);
              }
            )
        }
      }
    )


    this.dataservice.getVideosRecomendadosAPartirDeVideo(this.video)
      .subscribe(
        data => {
          this.recomendaciones = data;
          this.recomendaciones = this.recomendaciones.videos;
        },
        error => {
          console.error("no funciona", error);
        }
      )



  }

  verRespuestas(comentario:object){
    this.dataservice.enviarComentarioPadreRecibirRespuestasLista(comentario)
      .subscribe(
        data =>{
          this.respuestas = data;
          this.respuestas = this.respuestas.videos;
        },error => {
          console.error("no funciona", error);
        }
      )

  }
}
