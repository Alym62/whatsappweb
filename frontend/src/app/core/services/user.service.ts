import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly apiUrl = 'http://localhost:3000/';

    constructor(
        private readonly http: HttpClient,
    ) { }

    register(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.apiUrl}api/v1/auth`, user);
    }

    fetchFilter(username: string): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.apiUrl}api/v1/user?name=${username}`);
    }
}