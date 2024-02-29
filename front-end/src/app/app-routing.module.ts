import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full'},
  { path: 'contacts', component: ContactsComponent },
  { path: 'contacts-forms/:id', component: ContactsFormComponent },
  { path: 'contacts-forms', component: ContactsFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
