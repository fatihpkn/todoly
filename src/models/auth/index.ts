export interface UserModel {
  id: number;
  name: string;
  email: string;
}

export interface LoginUserModel {
  accessToken: string;
  user: UserModel;
}

export interface RegisterRequestModel {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequestModel {
  email: string;
  password: string;
}
