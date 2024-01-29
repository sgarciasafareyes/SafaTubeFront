import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/Video";
import {Mensaje} from "../models/Mensaje";
import {TipoCategoria} from "../models/TipoCategoria";
import {Canal} from "../models/Canal";

@Injectable({
  providedIn: 'root',
})
export class Generalservice {
  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }
  enviarIdVideoPlayingBaseDatos(id:number){
    return this.http.post<Video>('http://localhost:8080/api/video/get/', id)
  }

  crearMensaje(data: Mensaje){
    return this.http.post<object>(this.url + "/api/mensaje/crear", data);
  }

  getVideosParaTiPage(usuarioId: number) {
    return this.http.post<Video[]>('http://localhost:8080/api/video', usuarioId)
  }

  getVideosDeCanalesSuscritosPage(usuarioId: number) {
    return this.http.post<Video[]>('http://localhost:8080/api/video', usuarioId)
  }

  getTipoCategorias() {
    return this.http.get<TipoCategoria>('http://localhost:8000/api/categoria/listar')
  }
  getVideosSegunCategoria(categoria: object) {
    return this.http.post<Video[]>('http://localhost:8000/api/video/por_categoria', categoria)
  }

  BuscarVideo(palabraClave: string){
    return this.http.post<Video[]>('http://localhost:8000/api/video/buscar', palabraClave);
  }

  BuscarVideoPorCanal(canalId: number){
    return this.http.post<Video[]>('http://localhost:8000/api/video/por_canal', canalId);
  }

  BuscarCanal(palabraClave: string) {
    return this.http.post<Canal[]>('http://localhost:8000/api/canal/buscar', palabraClave);
  }
}
