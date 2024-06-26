import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Application } from "src/envorinments/envorinment.dev";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly apiUrl = Application.API_REST_USER;

    constructor(
        private readonly http: HttpClient,
    ) { }

    register(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.apiUrl}`, user);
    }

    fetchFilter(username: string): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.apiUrl}?name=${username}`);
    }

    fetchProfile(): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.apiUrl}profile`);
    }
}