import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



const getArticleOptions = {
  responseType: 'json' as const
};
export const api = "https://api.github.com";


@Injectable({
  providedIn: 'root'
})
export class GetMDService {

  constructor(private http: HttpClient) { }

  getReadmeFromGithub(name: string): Observable<any> {
    return this.http.get(api + '/repos/dashuai009/' + encodeURI(name) + '/readme', getArticleOptions)
      .pipe(
        retry(3),
      )
  }
}
