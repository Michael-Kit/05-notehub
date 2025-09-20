import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

const App = () => {
  // 🔍 Стан для пошуку
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  // 📄 Стан для пагінації
  const [page, setPage] = useState(1);

  // 📝 Стан для модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Скидаємо сторінку при новому пошуку
  };

  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Pagination page={page} onPageChange={handlePageChange} search={debouncedSearch} />
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={debouncedSearch} />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
