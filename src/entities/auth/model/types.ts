export interface LogInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest extends LogInRequest {
  email: string;
}

export interface LogInResponse {
  token: string;
}
