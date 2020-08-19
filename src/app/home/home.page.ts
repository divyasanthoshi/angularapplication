import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, query, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations:[
    trigger('PageFrom',[
      state('show', style({
        opacity:0
      })),
      transition('* => show', [
        animate('0.8s cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ])
    ])
  ]
})

export class HomePage implements OnInit{

  showBlue: boolean = false
  blueAnimation: string = "show"

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    const pagename = this.route.snapshot.paramMap.get('pagename');
    if(pagename){
      this.showBlue = true;
      setTimeout(()=>{
        if(this.showBlue){
          
        }
      },500)
    }
  }
}
