import { getAuthHeader } from "./get-auth-header";

class WebApi {
  private getUrl = (url: string) => {
    return `${process.env.NEXT_PUBLIC_WEB_API_URL}${url}`;
  };

  private throwError = (message: string) => {
    console.error(message);
    throw new Error(message);
  };

  public getRowData = async <TData>(url: string) => {
    const response = await fetch(this.getUrl(url), {
      headers: await getAuthHeader(),
      cache: "force-cache",
      next: { tags: [url] },
    });

    if (!response.ok) {
      this.throwError(`getRowData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json?.data as TData[];
  };

  public getData = async <TData>(url: string) => {
    const response = await fetch(this.getUrl(url), {
      headers: await getAuthHeader(),
      cache: "force-cache",
      next: { tags: [url] },
    });

    if (!response.ok) {
      this.throwError(`getData. Status: ${response.status}`);
    }

    const json = await response.json();
    return json as TData;
  };
}

export const webApi = new WebApi();
