import { getAuthHeader } from "./get-auth-header";
import getSession from "./get-session";

class WebApi {
  private baseUrl = process.env.NEXT_PUBLIC_WEB_API_URL;

  public getRowData = async (url: string) => {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: await getAuthHeader(),
    });

    if (!response.ok) {
      console.error(`HTTP getRowData. Status: ${response.status}`);
      throw new Error(`HTTP getRowData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data || [];
  };

  public getData = async (url: string) => {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: await getAuthHeader(),
    });

    if (!response.ok) {
      console.error(`HTTP getData. Status: ${response.status}`);
      throw new Error(`HTTP getData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json || {};
  };
}

export const webApi = new WebApi();
