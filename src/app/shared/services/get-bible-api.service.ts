import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetBibleApiService {

  constructor(
    private http:HttpClient
  ) { }

  apiCall()
  {
    return this.http.get('https://bible-api.com/john 3:16')
  }
}
