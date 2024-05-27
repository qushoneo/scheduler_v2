export interface IUser {
  login: string;
  id: number;
  role_name: string;
  account_id: number;
  role_id: number;
}

export interface IProfile {
  user_dto: {
    login: string;
    id: number;
    account_id: number;
    role_name: string;
  };
  token: {
    access_token: string;
    refresh_token: string;
  };
}
