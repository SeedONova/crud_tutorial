import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // get All Methods
  getAll(): Observable<any> {
    console.log('Making API call to:', this.apiUrl + '/posts/');
    return this.httpClient.get(this.apiUrl + '/posts/').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error.message);
        return throwError(() => new Error('Failed to load data from API'));
      })
    );
  }

  // create
  create(post: Post): Observable<any> {
    console.log('Making API call to:', this.apiUrl + '/posts/');
    return this.httpClient
      .post(this.apiUrl + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error.message);
          return throwError(error);
        })
      );
  }

  // find data
  find(id: number): Observable<any> {
    console.log('Making API call to:', this.apiUrl + '/posts/');
    return this.httpClient.get(this.apiUrl + '/posts/' + id).pipe(
      catchError(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error.message);
          return throwError(error);
        })
      )
    );
  }

  // update
  update(id: number, post: Post): Observable<any> {
    console.log('Making API call to:', this.apiUrl + '/posts/');
    return this.httpClient
      .put(this.apiUrl + '/posts/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(
          catchError((error: HttpErrorResponse) => {
            console.error('Error occurred:', error.message);
            return throwError(error);
          })
        )
      );
  }

  // delete
  delete(id:number){
    console.log('Making API call to:', this.apiUrl + '/posts/');
    return this.httpClient.delete(this.apiUrl+'/posts/'+id).pipe(catchError((error:
      HttpErrorResponse) => {
        console.error('Error occurred:', error.message);
        return throwError(error);
      }))
  }
}
