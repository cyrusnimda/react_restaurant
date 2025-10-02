
import { toaster } from '../components/ui/toaster';
import * as token_repository from './token_repository';
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = "http://127.0.0.1:8080";

class RestaurantApi {



  private static getHeaders() {
    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };
    const token = token_repository.getToken();
    if (token) {
      headers["x-access-token"] = token;
    }
    return headers;
  }

  private static async processResponse(response: Response) {
    
    
    const jsonResponse = await response.json();
    if (response.status === 401) {
      toaster.create({
        title: "⚠️ Error.",
        description: jsonResponse.message,
      });
      
      token_repository.removeToken();
      const navigate = useNavigate();
      navigate("/");
    }
    return jsonResponse;
  }

  static async post(endpoint: string, data: any) {
    const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    //const response = await this.processResponse(response);
    const jsonResponse = await response.json();

    return jsonResponse;
  }

  static async get(endpoint: string) {
    const response = await fetch(`${API_ENDPOINT}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    //const response = await this.processResponse(response);
    const jsonResponse = await response.json();

    return jsonResponse;
  }
}

export { RestaurantApi };