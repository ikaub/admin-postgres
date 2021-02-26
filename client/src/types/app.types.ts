export interface Profile extends Record<string, string | number> {
  username: string;
  gender: string;
  birthdate: string;
  city: string;
  id: number;
}
