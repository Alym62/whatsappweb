export interface ChatAdapter {
    sendMessage(sender: string, message: string): void;
}