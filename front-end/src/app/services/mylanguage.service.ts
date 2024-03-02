import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyLanguageService {
  private languageSubject = new BehaviorSubject<string>('br');
  currentLanguage = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {}

  setLanguage(language: string) {
    this.translate.use(language);
    this.languageSubject.next(language);
  }
}