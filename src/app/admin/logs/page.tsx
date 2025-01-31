import React from "react";
import { getAllLogs } from "@/lib/logs";
import LogsList from "./_component";
import { getAuthToken } from "@/actions";

const Page = async () => {
  const logs = await getAllLogs();
  const authToken = await getAuthToken();

  return (
    <div>
      <LogsList logs={logs} authToken={authToken!} />
    </div>
  );
};

export default Page;
