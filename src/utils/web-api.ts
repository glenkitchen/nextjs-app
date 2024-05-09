// TODO
// next-auth
// error

class WebApi {
  private baseUrl = process.env.NEXT_PUBLIC_WEB_API_URL;

  public getRowData = async (url: string) => {
    const response = await fetch(`${this.baseUrl}${url}`);
    const json = await response.json();
    return json?.data || [];
  };

  public getData = async (url: string) => {
    const response = await fetch(`${this.baseUrl}${url}`);
    const json = await response.json();
    return json || {};
  };
}

export const webApi = new WebApi();
