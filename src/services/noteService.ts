import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await instance.get('/notes', {
    params: { page, perPage, search },
  });
  console.log('Backend response:', data);
  return data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await instance.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete(`/notes/${id}`);
  return data;
};
