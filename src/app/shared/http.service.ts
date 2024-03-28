import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  connectToAI(data: any) {
    return this.http.post('http://localhost:5000/transcribe', data);
  }

  constructor(private http: HttpClient) {}
}
