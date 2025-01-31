import { fetcher } from "@/utils/index";

export const getAllLogs = async () => {
  const response = await fetcher(`/chat-bot/logs`, {
    cache: "no-store",
    method: "GET",
  });
  const resJson = await response.json();
  const data: ILogs[] = resJson.data;
  return data;
};

export const deleteLog = async (id: number, authToken: string) => {
  const response = await fetcher(`/chat-bot/logs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response;
};
