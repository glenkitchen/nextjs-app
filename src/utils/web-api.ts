export const webApi = {
  getRowData: async (url: string) => {
    const response = await fetch(`https://localhost:5001/api/${url}`);
    const json = await response.json();
    return json?.data || [];
  },
};
