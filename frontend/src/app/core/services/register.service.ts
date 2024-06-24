import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterModel } from "../models/register.model";

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private readonly apiUrl = 'http://localhost:3000/';

    constructor(
        private readonly http: HttpClient,
    ) { }

    register(user: RegisterModel): Observable<RegisterModel> {
        return this.http.post<RegisterModel>(`${this.apiUrl}api/v1/auth`, user);
    }
}