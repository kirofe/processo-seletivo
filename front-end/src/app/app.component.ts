import { Component } from '@angular/core';
import { ContactsService } from './services/contacts.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

interface contacts {
  firsName: string;
  lasName: string;
  email: string;
  phone: string;
  cpf: string;
  cep: string;
  [key: string]: string; // Definição de índice de assinatura para permitir qualquer chave de string
}

interface nameColumns {
  [key: string]: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'agenda';
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

  constructor(private contactService: ContactsService) {}

  ngOnInit() {    
    this.contactService.getAll().subscribe(res => {
      console.log(res);     
      this.dataSource.data = res; 
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: contacts): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
