import getSession from "./get-session";

export const getAuthHeader = async () => {
  const session = await getSession();
  return { Authorization: `Bearer ${session?.access_token}` };
};
