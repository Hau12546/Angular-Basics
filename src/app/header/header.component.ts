import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';



class CommonAction {
  constructor() {

  }
  ExecuteTryCatch(Event: Function = () => {
    console.log('No event found')
  }) {
    try {
      Event();
    } catch (error) {
      alert(error);
    }
  }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CommonAction implements OnInit {
  @ViewChild('RecipeLink') RecipeLink: ElementRef | undefined;
  @ViewChild('ShoppingLink') ShoppingLink: ElementRef | undefined;
  @Output('Emitter') Emitter: EventEmitter < string > = new EventEmitter();
  private CommonAction = new CommonAction();
  constructor() {
    super();
  }

  ngOnInit() {}


  NavigateToRecipe() {
    console.log(this.RecipeLink?.nativeElement.innerText);
    try {
      if (this.RecipeLink?.nativeElement.innerText.toString()) {
        this.Emitter.emit(this.RecipeLink?.nativeElement.innerText.toString());
        return;
      }
      throw new Error('No Recipe Link found');
    } catch (error) {
      alert(error);
    }
  }

  NavigateToShopping() {
    console.log(this.ShoppingLink?.nativeElement.innerText);
    try {
      if (this.ShoppingLink?.nativeElement.innerText.toString()) {
        this.Emitter.emit(this.ShoppingLink?.nativeElement.innerText.toString());
        return;
      }
      throw new Error('No Shopping Link found');
    } catch (error) {
      alert(error);
    }
  }
}
