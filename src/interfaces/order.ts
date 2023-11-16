export type Order = {
    _id: number;
    date: string;
    content: string[];
    usercomment: string;
    staffcomment: string;
    total: number;
    done: boolean
}