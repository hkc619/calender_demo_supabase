"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export default function AddMealModal({
  isOpen,
  onClose,
  onSaved,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [date, setDate] = useState("");

  const handleSave = async () => {
    if (!title || !date) return alert("Please fill in all fields");

    const startTime = new Date(date).toISOString();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        mealType,
        startTime,
        endTime: startTime,
      }),
    });

    setTitle("");
    setDate("");
    setMealType("breakfast");
    onSaved();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
          <DialogTitle className="text-lg font-semibold text-black mb-4">
            Add Meal
          </DialogTitle>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meal Type
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full border rounded-lg text-gray-600 px-3 py-2 mt-1"
              >
                <option value="breakfast">Breakfast 🍳</option>
                <option value="lunch">Lunch 🍱</option>
                <option value="dinner">Dinner 🍲</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg text-gray-600 px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meal Title
              </label>
              <input
                type="text"
                placeholder="e.g. Grilled Salmon Bowl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg text-gray-600 px-3 py-2 mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
