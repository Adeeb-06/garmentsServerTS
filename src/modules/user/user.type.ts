export interface IUser {
    name: string;
    email: string;
    photoURL: string;
    role: string;
    status: "pending" | "approved" | "rejected";
}