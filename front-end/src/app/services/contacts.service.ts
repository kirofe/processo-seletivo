import { HttpClient } from "@angular/common/http";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:  'root'
})
export class ContactsService extends BaseService {
    constructor(private https: HttpClient) {
        super(https, 'Contacts');
    }
}