import { api } from "boot/axios";

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
    return api.post("/doSimplePostRequest", new DummyRequestBody("dummy"), {
      headers: {
        Authorization: "Bearer " + jwt,
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
