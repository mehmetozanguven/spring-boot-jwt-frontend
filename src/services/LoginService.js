import { api } from "boot/axios";
import { removeJwtTokenFromStorage } from "src/utils/LocalStorageUtils";

export class LoginService {
  doLogin(loginRequest) {
    return api.post("/login", loginRequest);
  }

  doLogout() {
    removeJwtTokenFromStorage();
  }
}

export class LoginRequest {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
