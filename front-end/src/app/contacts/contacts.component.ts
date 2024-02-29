import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalFire } from '../services/swal.service';
import { first } from 'rxjs/operators';
import { contacts } from '../model/contact';


interface nameColumns {
  [key: string]: string;
}
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'phone', 'cpf', 'cep'];
  dataSource: MatTableDataSource<contacts> = new MatTableDataSource();
  columnsName: nameColumns = {
    'firstName': 'Nome', 
    'lastName': 'Sobrenome', 
    'email': 'Email', 
    'phone': 'Telefone', 
    'cpf': 'CPF', 
    'cep': 'CEP'
  };

  selection = new SelectionModel<contacts>(true, []);

  constructor(private contactService: ContactsService, private route: Router) {}

  ngOnInit() {    
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAll().pipe(first()).subscribe(res => {
      this.dataSource.data = res; 
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  selectedRow(event:any, row: contacts) {
    if(row != this.selection.selected[0]){
      this.selection.clear();
      if(event)
        this.selection.toggle(row);
    } else {
      this.selection.clear();
    }
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  edit() {
    if(this.selection.selected[0])
      this.contactsForms(this.selection.selected[0].id)
  }

  contactsForms(id?: number) {
    if (id)    
      this.route.navigate(['/contacts-forms', id]);
    else
      this.route.navigate(['/contacts-forms']);
  }

  remover() {
    if(this.selection.selected[0]) {
      const contact = this.selection.selected[0]
      SwalFire.detele('Apagar', `Você tem certeza que quer apagar o contato: ${contact.firstName}`).then(
        (result) => {
          if (result.isDenied) {
            this.contactService.delete(contact.id).pipe(first()).subscribe(
              (res) => {
                this.getAllContacts();
                SwalFire.sucesso('Apagado com Sucesso');              
              }, (err) => {
                SwalFire.error('Erro!', `Erro ao apagar o contato`)
              }
            )            
          } 
        }
      );
    }
  }
}
