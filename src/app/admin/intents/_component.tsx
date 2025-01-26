"use client";

import React, { useState } from "react";
import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import Modal from "../_components/modal";
import { createIntent, deleteIntent, updateIntent } from "@/lib/intents";
import { customRevalidation } from "@/actions";

interface Props {
  intents: IIntents[];
  authToken: string;
}

export const IntentsList = ({ intents, authToken }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [intent, setIntent] = useState<string>("");
  const [patterns, setPatterns] = useState<string>("");
  const [responses, setResponses] = useState<string>("");

  const handleOpenModal = (id?: number) => {
    setOpenModal(true);
    if (id) {
      setSelectedId(id);
      const selectedIntent = intents.find((intent) => intent.id === id);
      if (selectedIntent) {
        setIntent(selectedIntent.intent);
        setPatterns(JSON.stringify(selectedIntent.patterns).slice(1, -1));
        setResponses(JSON.stringify(selectedIntent.responses).slice(1, -1));
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedId(null);
    setIntent("");
    setPatterns("");
    setResponses("");
  };

  const handleSubmit = async () => {
    try {
      if (!intent || !patterns || !responses) {
        onErrorAlert("Intent, Patterns, and Responses are required.");
        return;
      }

      const parsedPatterns = JSON.parse(`[${patterns}]`);
      const parsedResponses = JSON.parse(`[${responses}]`);

      const payload = {
        intent,
        patterns: parsedPatterns,
        responses: parsedResponses,
      };

      if (selectedId) {
        const response = await updateIntent(selectedId, payload, authToken);
        if (response.ok) {
          onSuccessAlert("Intent updated successfully!");
          customRevalidation("/admin/intents");
          handleCloseModal();
        } else {
          onErrorAlert("Failed to update intent.");
        }
      } else {
        const response = await createIntent(payload, authToken);
        if (response.ok) {
          onSuccessAlert("Intent added successfully!");
          customRevalidation("/admin/intents");
          handleCloseModal();
        } else {
          onErrorAlert("Failed to add intent.");
        }
      }
    } catch (error) {
      onErrorAlert("An error occurred. Please try again.");
    }
  };

  const handleDeleteIntent = async (id: number) => {
    try {
      const response = await deleteIntent(id, authToken);
      if (response.ok) {
        onSuccessAlert("Intent deleted successfully!");
        customRevalidation("/admin/intents");
      } else {
        onErrorAlert("Failed to delete intent.");
      }
    } catch (error) {
      onErrorAlert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <div className="bg-[#111111] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#A1A1A1] font-bold text-xl">List Intents</h2>
          <button
            onClick={() => handleOpenModal()}
            className="border-white bg-white font-semibold text-black border-opacity-20 rounded-lg py-2.5 px-3"
          >
            Add Intent
          </button>
        </div>
        <div className="mt-5">
          <table className="min-w-full rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Intent
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Patterns
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Responses
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider bg-[#202244]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {intents.map((intent, index) => (
                <tr key={intent.id} className="border-b">
                  <td className="px-6 py-4 text-sm font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {intent.intent}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="max-h-24 overflow-y-auto">
                      <ul className="list-disc list-inside">
                        {intent.patterns.map((pattern, idx) => (
                          <li key={idx}>{pattern}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="max-h-24 overflow-y-auto">
                      <ul className="list-disc list-inside">
                        {intent.responses.map((response, idx) => (
                          <li key={idx}>{response}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleOpenModal(intent.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteIntent(intent.id)}
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
          <h1 className="font-bold text-xl mb-8">
            {selectedId ? "Edit Intent" : "Add Intent"}
          </h1>
          <div className="mb-4">
            <label className="block mb-2">Intent</label>
            <input
              type="text"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              required
              className="w-full p-2 border rounded peer text-black"
            />
            <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
              Intent is required
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Patterns</label>
            <textarea
              value={patterns}
              onChange={(e) => setPatterns(e.target.value)}
              required
              className="w-full p-2 border rounded peer text-black"
              placeholder='Enter patterns as JSON array, e.g., ["halo", "hai", "apa kabar"]'
            />
            <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
              Patterns are required
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Responses</label>
            <textarea
              value={responses}
              onChange={(e) => setResponses(e.target.value)}
              required
              className="w-full p-2 border rounded peer text-black"
              placeholder='Enter responses as JSON array, e.g., ["Halo!", "Hai juga!", "Apa kabar?"]'
            />
            <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
              Responses are required
            </p>
          </div>
          <div className="flex justify-end mt-10">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
