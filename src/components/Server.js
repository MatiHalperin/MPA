class Server {
  static getURL() {
    return "http://10.10.5.35:3000";
  }

  static async pullJson(path, connectionMethod, requestBody) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: connectionMethod,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async getJson(path, requestBody) {
    let responseJson = await Server.pullJson(path, "GET", requestBody);
    return responseJson;
  }

  static async postJson(path, requestBody) {
    let responseJson = await Server.pullJson(path, "POST", requestBody);
    return responseJson;
  }
}

export default Server;
