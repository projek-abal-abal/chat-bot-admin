"use client";

import React, { useState } from "react";
import Modal from "../_components/modal";
import { deleteLog } from "@/lib/logs";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { customRevalidation } from "@/actions";

interface Props {
  logs: ILogs[];
  authToken: string;
}

const LogsList = ({ logs, authToken }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<ILogs | null>(null);

  const handleOpenModal = (log?: ILogs) => {
    setOpenModal(true);
    if (log) {
      setSelectedLog(log);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLog(null);
  };

  const handleDeleteLog = async (logId: number) => {
    try {
      const response = await deleteLog(logId, authToken);
      if (response.ok) {
        customRevalidation("/admin/logs");
        onSuccessAlert("Log deleted successfully!");
      } else {
        onErrorAlert("Failed to delete log.");
      }
    } catch (error) {
      onErrorAlert("An error occurred while deleting the log:" + error);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">Logs</h2>
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
                  Answer
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
              {logs.map((log, index) => (
                <tr key={log.id} className="border-b">
                  <td className="px-6 py-4 text-sm font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {log.question}
                  </td>
                  <td className="px-6 py-4 text-sm">{log.answer}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleOpenModal(log)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
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
          <h1 className="font-bold text-xl mb-8">Log Details</h1>
          {selectedLog && (
            <div>
              <div className="mb-4">
                <label className="block mb-2">Question</label>
                <p className="text-sm">{selectedLog.question}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Answer</label>
                <p className="text-sm">{selectedLog.answer}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Created At</label>
                <p className="text-sm">
                  {new Date(selectedLog.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LogsList;
