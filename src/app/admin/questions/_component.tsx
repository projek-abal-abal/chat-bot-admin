"use client";

import React, { useState } from "react";
import Modal from "../_components/modal";
import { deleteQuestion } from "@/lib/questions";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { customRevalidation } from "@/actions";

interface Props {
  questions: IQuestion[];
  authToken: string;
}

export const QuestionList = ({ questions, authToken }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );

  const handleOpenModal = (question?: IQuestion) => {
    setOpenModal(true);
    if (question) {
      setSelectedQuestion(question);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedQuestion(null);
  };

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      const response = await deleteQuestion(questionId, authToken);

      if (response.ok) {
        onSuccessAlert("Intent deleted successfully!");
        customRevalidation("/admin/questions");
      } else {
        onErrorAlert("Failed to delete intent.");
      }
    } catch (error) {
      onErrorAlert("An error occurred while deleting the question:" + error);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">
            Unanswered Questions
          </h2>
        </div>
        <div className="mt-5">
          <table className="min-w-full rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Question
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.id} className="border-b">
                  <td className="px-6 py-4 text-sm font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {question.question}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(question.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleOpenModal(question)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div className="w-full p-16 overflow-y-auto h-full">
          <h1 className="font-bold text-xl mb-8">Question Details</h1>
          {selectedQuestion && (
            <div>
              <div className="mb-4">
                <label className="block mb-2">Question</label>
                <p className="text-sm">{selectedQuestion.question}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Created At</label>
                <p className="text-sm">
                  {new Date(selectedQuestion.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
