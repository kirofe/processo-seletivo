import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';
import { filter, first, switchMap } from 'rxjs/operators';
import { SwalFire } from '../services/swal.service';
import { contacts } from '../model/contact';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss']
})
export class ContactsFormComponent implements OnInit {
  contact: contacts = {};

  constructor(private formBuilder: FormBuilder, 
              private route: Router,
              private activeRoute: ActivatedRoute,
              private service: ContactsService) { 
    this.activeRoute.paramMap.pipe(
      filter(params => params.has('id')),
      switchMap((params: ParamMap) => this.service.get(params.get('id')!))
    ).pipe(first()).subscribe(
      (res) => {
        this.contact = res;
        this.setFormGroup(res);
      }, (err) => {     
        SwalFire.error('Error!', 'Erro durante a consulta') 
      }
    );
  }

  form: FormGroup = this.formBuilder.group({
    'firstName': ['', Validators.required], 
    'lastName': ['', Validators.required], 
    'email': ['', Validators.required], 
    'phone': [''], 
    'cpf': ['', Validators.required], 
    'cep': ['', Validators.required]
  });

  get controls() { return this.form.controls }

  ngOnInit() {
    console.log(this.controls);    
  }

  voltar() {
    this.route.navigate(['']);
  }

  salvar() {
    if(this.form.valid) {
      const contact = this.form.getRawValue();
      if (this.contact?.id){
        this.service.put(contact, this.contact?.id).pipe(first()).subscribe((res) => {
          SwalFire.sucesso('Contato cadastrado com sucesso');  
          this.route.navigate(['']);     
        }, (err) => {          
          if(err.error?.length > 0)             
            SwalFire.errorValidator('Error!', err.error)  
          else           
            SwalFire.error('Error!', 'Erro durante o cadastro')    
        })
      } else {
        this.service.post(contact).pipe(first()).subscribe((res) => {
          SwalFire.sucesso('Contato cadastrado com sucesso');  
          this.service.enviarNotificacao().subscribe((res) => {
            console.log(res);            
            this.route.navigate(['']);   
          });  
        }, (err) => {
          if(err.error?.length > 0)             
            SwalFire.errorValidator('Error!', err.error)  
          else           
            SwalFire.error('Error!', 'Erro durante a edição')    
        })
      }
      
    }
  }

  setFormGroup(contact?: contacts) {
    this.form = this.formBuilder.group({
      'firstName': [contact?.firstName, Validators.required], 
      'lastName': [contact?.lastName, Validators.required], 
      'email': [contact?.email, Validators.required], 
      'phone': [contact?.phone], 
      'cpf': [contact?.cpf, Validators.required], 
      'cep': [contact?.cep, Validators.required]
    });
  }

}
