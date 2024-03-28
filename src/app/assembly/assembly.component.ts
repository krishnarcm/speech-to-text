import { Component, OnInit } from '@angular/core';
import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: '198933f41a8741009822a394a70d6221',
});

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.scss'],
})
export class AssemblyComponent implements OnInit {
  audioUrl =
    'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

  config = {
    audio_url: this.audioUrl,
  };

  run = async () => {
    alert(1);
    const transcript = await client.transcripts.create(this.config);
    console.log(transcript.text);
  };

  ngOnInit() {
    alert(1);
    // this.run();
  }
}
