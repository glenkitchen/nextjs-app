import { unstable_cache } from "next/cache";

class WebApi {
  //TODO env variable
  private baseUrl = "https://localhost:5001/api/";

  //TODO header bearer token
  private rowData = async (url: string) => {
    const response = await fetch(`${this.baseUrl}${url}`);
    const json = await response.json();
    return json?.data || [];
  };

  public getRowData = unstable_cache(this.rowData);
  //public getRowData = this.rowData;
}

export const webApi = new WebApi();
