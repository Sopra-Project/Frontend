export type AuthUser = {
    name: string,
    building: string,
    role: "ADMIN" | "USER" | "INSPETOR" | "SUPER_ADMIN",
    expiresIn: number,
    token: string
}

export type ParkingSpot = {
    id: string,
    registrationNumber: string,
    user: User,
    startTime: string,
    endTime: string
}

export type Building = {
    id: string,
    name: string,
    totalParkingSpots: number,
}


export type Role = {
    id: number;
    authority: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
    building: Building;
}