export interface Profile extends Record<string, string | number> {
  username: string;
  gender: string;
  birthdate: string;
  city: string;
  id: number;
}

export interface User extends Record<string, string | Profile[] | number> {
  email: string;
  id: number;
  role: string;
  profiles: Profile[];
}
