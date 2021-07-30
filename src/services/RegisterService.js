import { api } from "boot/axios";

export class RegisterService {
  doRegister(registerRequest) {
    return api.post("/register", registerRequest);
  }
}

export class RegisterRequest {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
