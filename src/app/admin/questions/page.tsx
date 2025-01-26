import React from "react";
import { getAllQuestion } from "@/lib/questions";
import { QuestionList } from "./_component";
import { getAuthToken } from "@/actions";

const Page = async () => {
  const questions = await getAllQuestion();
  const authToken = await getAuthToken();

  return (
    <div>
      <QuestionList questions={questions} authToken={authToken!} />
    </div>
  );
};

export default Page;
