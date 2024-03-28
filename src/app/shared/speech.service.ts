import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private readonly apiUrl = 'https://speech.googleapis.com/v1/speech:recognize';
  private readonly apiKey = 'YOUR_GOOGLE_API_KEY';

  constructor(private http: HttpClient) {}

  transcribe(audioData: any): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    const requestBody = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
      audio: {
        content: audioData,
      },
    };

    return this.http.post<any>(this.apiUrl, requestBody, { headers }).pipe(
      map((response) => response.results[0].alternatives[0].transcript),
      catchError((error) => {
        console.error('Speech-to-text error:', error);
        return throwError('Failed to transcribe speech.');
      })
    );
  }
}
