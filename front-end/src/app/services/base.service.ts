import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class BaseService {
    
    constructor(private http: HttpClient, private controller: string) {}

    getAll() {
        return this.http.get<any>(`${environment.urlApi}/${this.controller}`, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        });
    }
}