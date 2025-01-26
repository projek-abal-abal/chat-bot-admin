import { getAllIntents } from "@/lib/intents";
import React from "react";
import { IntentsList } from "./_component";
import { getAuthToken } from "@/actions";

const Page = async () => {
  const intents = await getAllIntents();
  const authToken = await getAuthToken();
  return (
    <div>
      <IntentsList intents={intents} authToken={authToken!} />
    </div>
  );
};

export default Page;
