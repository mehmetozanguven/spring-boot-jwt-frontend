import { api } from "boot/axios";
import { getCookieWithName } from "src/utils/CookieUtils";

export class ProtectedService {
  getUserInfo(jwt) {
    return api.get("/protected", {
      headers: {
        Authorization: "Bearer " + jwt,
      },
      withCredentials: true,
    });
  }

  doSimplePostRequest(jwt) {
    return api.post("/doSimplePostRequest",new DummyRequestBody("dummy") ,{
      headers: {
        Authorization: "Bearer " + jwt,
        "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
      },
      withCredentials: true,
    });
  }
}

class DummyRequestBody {
  constructor(name) {
    this.name = name;
  }
}
