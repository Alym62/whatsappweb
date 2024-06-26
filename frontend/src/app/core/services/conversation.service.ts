import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Application } from "src/envorinments/envorinment.dev";
import { ConversationModel } from "../models/conversation.model";

@Injectable({
    providedIn: 'root',
})
export class ConversationService {
    private readonly apiUrl = Application.API_REST_CONVERSATION;

    constructor(
        private readonly http: HttpClient,
    ) { }

    fetchAllConversation(): Observable<ConversationModel[]> {
        return this.http.get<ConversationModel[]>(`${this.apiUrl}`);
    }
}