export type Order = {
    // _id: string;
    orderId: number,
    date: string;
    content: string[];
    usercomment: string;
    staffcomment: string;
    total: number;
    status: string;
    locked: boolean;
}