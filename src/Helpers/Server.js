class Server {
  static getURL() {
    return "http://10.10.1.6:3000";
  }

  static async interact(method, path, body) {
    try {
      let requestInit = {
        method: method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }

      if (body)
        requestInit.body = body;

      let response = await fetch(Server.getURL() + path, requestInit);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async getJson(path) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async postJson(path, requestBody) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async patchJson(path, requestBody) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteJson(path) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Server;