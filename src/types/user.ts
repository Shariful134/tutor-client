export interface IUser {
  userId: string;
  name: string;
  email: string;
  hasShop: boolean;
  isActive: boolean;
  role: "user" | "admin";
  exp: number;
  iat: number;
}
