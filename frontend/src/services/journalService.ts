import api from "./api";

export const getAllJournals = async () => {
  const response = await api.get("/journals");
  return response.data.data;
};

export const getJournalById = async (id: string) => {
  const response = await api.get(`/journals/${id}`);
  return response.data.data;
};

export const createJournal = async (content: string) => {
  const response = await api.post("/journals", {
    content,
  });

  return response.data.data;
};

export const deleteJournal = async (id: string) => {
  const response = await api.delete(`/journals/${id}`);
  return response.data;
};

export const updateJournal = async (
  id: string,
  content: string
) => {
  const response = await api.put(`/journals/${id}`, {
    content,
  });

  return response.data.data;
};