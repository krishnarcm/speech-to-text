import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { SpeechService } from 'src/app/shared/speech.service';
import { HttpService } from './shared/http.service';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //Text to speeech

  speechText = 'Your queries';
  finalSpeech: any = [];
  isCallActive = false;
  recognition: any;
  speechTimer: any;
  doneSpeechInterval = 1000; // 1 second

  startCall() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US'; // Set language to English
    this.isCallActive = true;

    this.recognition.onstart = () => {
      this.isCallActive = true;
    };

    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Use NgZone to run the code inside Angular's zone
      console.log(interimTranscript);
      this.zone.run(() => {
        this.speechText = finalTranscript + interimTranscript;
        clearTimeout(this.speechTimer);
        this.speechTimer = setTimeout(() => {
          if (this.finalSpeech.indexOf(this.speechText) == -1) {
            this.finalSpeech.push({ type: 0, text: this.speechText });
            this.connectToAI(this.speechText);
          }
        }, 1000);
      });
    };

    this.recognition.start();
  }

  stopCall() {
    this.recognition.stop();
    this.isCallActive = false;
  }

  playResponse(text: any) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }

  connectToAI(data: string) {
    let body = {
      text: data,
    };
    this.http.connectToAI(body).subscribe((res: any) => {
      console.log(res);
      this.finalSpeech.push({ type: 1, text: res.reply });
      this.playResponse(res.reply);
    });
  }

  constructor(private zone: NgZone, private http: HttpService) {}
}
