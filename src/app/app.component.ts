import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'TimerTool';
  isRunning=false;
  isPaused=false;

  displayTime !: string;
  countdownValue=300 //5 min
  countdownInterval:any;

  ngOnInit(): void {
    this.displayTime=this.formateTime(this.countdownValue);
  }
  startTimer(){
     this.isRunning=true;
     this.isPaused=false;

     this.countdownInterval=setInterval(()=>{
      if(this.isRunning && this.countdownValue >0){
        this.countdownValue--;
        this.displayTime=this.formateTime(this.countdownValue);

      }else{
        this.isRunning=false;
        clearInterval(this.countdownInterval);
      }
     },1000);
  }
  pauseTimer(){
    this.isRunning=false;
    this.isPaused=true;
    clearInterval(this.countdownInterval);
  }
  resumeTimer(){
    this.isRunning=true;
    this.isPaused=false;

    this.countdownInterval=setInterval(()=>{
      if(this.isRunning && this.countdownValue >0){
        this.countdownValue--;
        this.displayTime=this.formateTime(this.countdownValue);
      }else{
        this.isRunning=false;
        clearInterval(this.countdownInterval);
      }
    },1000);
  }
  resetTimer(){
    this.isRunning=false;
    this.isPaused=false;
    this.countdownValue=300// Reset to 5 min
    this.displayTime=this.formateTime(this.countdownValue);
    clearInterval(this.countdownInterval);
  }

  private formateTime(seconds: number): string{
    const formattedMinutes = Math.floor(seconds/60);
    const formattedSeconds = seconds%60;

    const displayMinutes = formattedMinutes <10 ? `0${formattedMinutes}`:`${formattedMinutes}`;
    const displaySeconds = formattedSeconds <10 ? `0${formattedSeconds}`:`${formattedSeconds}`;
    
    return `${displayMinutes}:${displaySeconds}`;
  }
}
