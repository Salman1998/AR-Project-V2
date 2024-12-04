export interface ChatModel{
    uid: string;
    createAt: Date;
    time?: string;
    date?: string;
    message: string;
    name?: string;
    reactions?: [];
}