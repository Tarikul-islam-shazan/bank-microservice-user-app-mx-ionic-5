import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 *  Generic class to expose http api functionality
 *
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = '';

  constructor(private http: HttpClient) {}

  /**
   *  Generic Implentation of http post method.
   *
   * @template S The type of the model to be sent to the server
   * @template T The type of the model to be returned from the server
   * @param {S} postViewModel
   * @param {string} destinationUrl - The additional portion of the url to add to the base path for a specific request
   * @returns {Observable<T>} - The type of the model to return from the server
   * @memberof ApiService
   */
  public post<S, T>(postViewModel: S, destinationUrl: string): Observable<T> {
    return this.http.post<T>(this.baseUrl + destinationUrl, postViewModel);
  }

  /**
   *
   *
   * @template T
   * @param {string} destinationUrl
   * @returns {Observable<T>}
   * @memberof ApiService
   */
  public get<T>(destinationUrl: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + destinationUrl);
  }

  /**
   *
   *
   * @template T
   * @param {string} destinationUrl
   * @returns {Observable<T>}
   * @memberof ApiService
   */
  public delete<T>(destinationUrl: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + destinationUrl);
  }

  /**
   *  Generic Implentation of http post method.
   *
   * @template S The type of the model to be sent to the server
   * @template T The type of the model to be returned from the server
   * @param {S} postViewModel
   * @param {string} destinationUrl - The additional portion of the url to add to the base path for a specific request
   * @returns {Observable<T>} - The type of the model to return from the server
   * @memberof ApiService
   */
  public patch<S, T>(postViewModel: S, destinationUrl: string): Observable<T> {
    return this.http.patch<T>(this.baseUrl + destinationUrl, postViewModel);
  }

  /**
   *  Generic Implentation of http post method.
   *
   * @template S The type of the model to be sent to the server
   * @template T The type of the model to be returned from the server
   * @param {S} postViewModel
   * @param {string} destinationUrl - The additional portion of the url to add to the base path for a specific request
   * @returns {Observable<T>} - The type of the model to return from the server
   * @memberof ApiService
   */
  public put<S, T>(postViewModel: S, destinationUrl: string): Observable<T> {
    return this.http.put<T>(this.baseUrl + destinationUrl, postViewModel);
  }
}
