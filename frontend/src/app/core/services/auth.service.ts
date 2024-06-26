import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Application } from "src/envorinments/envorinment.dev";
import { Credentials } from "../models/credentials.model";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl = Application.API_REST_AUTH;

    constructor(
        private readonly http: HttpClient,
    ) { }

    login(credentials: Credentials): Observable<any> {
        return this.http.post<Credentials>(`${this.apiUrl}login`, credentials)
            .pipe(
                tap((res: any) => this.saveToken(res.acess_token)),
            );
    }

    private saveToken(token: string): void {
        localStorage.setItem('acess_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('acess_token');
    }

    logout(): void {
        localStorage.removeItem('acess_token');
    }
}