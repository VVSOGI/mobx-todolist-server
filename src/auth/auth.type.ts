export interface JwtPayload {
  username: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_user_date: Date;
}
