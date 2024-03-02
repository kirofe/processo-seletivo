import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyLanguageService } from './services/mylanguage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'agenda' 

  constructor(private translate: MyLanguageService) {
    translate.setLanguage('br');
  }

  onChange(event: any) {
    this.translate.setLanguage(event.target.value); 
  }
}
