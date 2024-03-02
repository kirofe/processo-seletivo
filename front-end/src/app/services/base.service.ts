import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class BaseService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    constructor(private http: HttpClient, private controller: string) {}

    getAll() {
        return this.http.get<any>(`${environment.urlApi}/${this.controller}`, { headers: this.headers });
    }

    get(id: any) {
        return this.http.get<any>(`${environment.urlApi}/${this.controller}/${id}`, { headers: this.headers });
    }

    post(object: any) {
        return this.http.post<any>(`${environment.urlApi}/${this.controller}`, object, {headers: this.headers});
    }

    put(object: any, id: any) {
        return this.http.put<any>(`${environment.urlApi}/${this.controller}/${id}`, object, {headers: this.headers});
    }
    
    delete(id: any) {
        return this.http.delete<any>(`${environment.urlApi}/${this.controller}/${id}`, { headers: this.headers });
    }

    enviarNotificacao() {
        return this.http.get<any>(`https://run.mocky.io/v3/c9ec2ca3-a7f5-41d0-8550-b859508f4948`, { headers: this.headers });
    }
}