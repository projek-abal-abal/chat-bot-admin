import { fetcher } from "@/utils/index";

export const getAllQuestion = async () => {
  const response = await fetcher(`/chat-bot/questions`, {
    cache: "no-store",
    method: "GET",
  });
  const resJson = await response.json();
  const data: IQuestion[] = resJson.data;
  return data;
};

export const deleteQuestion = async (id: number, authToken: string) => {
  const response = await fetcher(`/chat-bot/questions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response;
};
