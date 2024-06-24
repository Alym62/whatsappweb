import { UserModel } from "./user.model";

export interface ConversationModel {
    id?: number;
    participants: UserModel[];
}