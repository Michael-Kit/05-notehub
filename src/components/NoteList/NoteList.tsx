import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../Error/ErrorMessage';
import EmptyState from '../Empty/EmptyState';


interface NoteListProps {
  page: number;
  search: string;
}

const NoteList = ({ page, search }: NoteListProps) => {
  const queryClient = useQueryClient();

 const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', page, search],
  queryFn: () => fetchNotes({ page, perPage: 12, search }),
  placeholderData: (prev) => prev,

});


  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    console.log('Deleting note with ID:', id);
    mutate(id);
  };

if (isLoading) return <Loader />;
if (isError) return <ErrorMessage />;
if (!data || data.notes.length === 0) return <EmptyState />;

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => handleDelete(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
