import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConversationModel } from "../models/conversation.model";

@Injectable({
    providedIn: 'root',
})
export class ConversationService {
    private readonly apiUrl = 'http://localhost:3000/';

    constructor(
        private readonly http: HttpClient,
    ) { }

    fetchAllConversation(): Observable<ConversationModel[]> {
        return this.http.get<ConversationModel[]>(`${this.apiUrl}api/v1/conversation`);
    }
}