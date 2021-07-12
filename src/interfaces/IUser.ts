export interface IUser {
    email: string;
    password: string;
    date: Date;
    lastLoginDate: Date;
  }
  
  export interface IUserInputDTO {
    email: string;
    password: string;
  }