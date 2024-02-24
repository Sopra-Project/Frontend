export type User = {
    name: string,
    building: string,
    role: "ADMIN" | "USER" | "INSPETOR",
    expiresIn: number,
    token: string
}