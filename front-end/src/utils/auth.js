// import webtoken dependency
import decode from "jwt-decode";

// auth and token handling
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // get any currently active tokens
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // get user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // save user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    // delete user session token data
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
