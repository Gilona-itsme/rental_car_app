import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingDraft } from "@/types/car";


type BookingDraftStore = {
  draft: BookingDraft;
  setDraft: (draft: BookingDraft) => void;
  clearDraft: () => void;
};

const initialDraft: BookingDraft = {
  name: "",
  email: "",
  comment: "",
};

export const useBookingDraftStore = create<BookingDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "booking-draft",
    }
  )
);