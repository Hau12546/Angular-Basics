import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css']
})
export class AlertComponentComponent implements OnInit {
  @Input('Message') Message:string = '';
  @Output('alertModal') alertModal:EventEmitter<any>= new EventEmitter();
  constructor(private el:ElementRef, private render:Renderer2) {}

  ngOnInit(): void {
  }

  CloseModal(){
    // this.render.setStyle(this.el.nativeElement,'display','none');
     this.alertModal.emit();
     return this.alertModal;
  }

}
