class WebApi {
  private baseUrl = "https://localhost:5001/api/";

  async getRowData(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`);
    const json = await response.json();
    return json?.data || [];
  }
}

export const webApi = new WebApi();
