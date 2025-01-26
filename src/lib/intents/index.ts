import { fetcher } from "@/utils/index";

export const getAllIntents = async () => {
  const response = await fetcher(`/chat-bot/intents`, {
    cache: "no-store",
    method: "GET",
  });
  const resJson = await response.json();
  const data: IIntents[] = resJson.data;
  return data;
};

export const updateIntent = async (
  id: number,
  payload: {
    intent: string;
    patterns: string[];
    responses: string[];
  },
  authToken: string
) => {
  const response = await fetcher(`/chat-bot/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const deleteIntent = async (id: number, authToken: string) => {
  const response = await fetcher(`/chat-bot/intents/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response;
};

export const createIntent = async (
  payload: {
    intent: string;
    patterns: string[];
    responses: string[];
  },
  authToken: string
) => {
  const response = await fetcher(`/chat-bot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};
