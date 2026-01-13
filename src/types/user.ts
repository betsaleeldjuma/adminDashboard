export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: "male" | "female"; 
  image: string
}