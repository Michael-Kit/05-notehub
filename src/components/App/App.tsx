import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import NoteList from '../NoteList/NoteList'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import Loader from '../Loader/Loader'
import ErrorMessage from '../Error/ErrorMessage'
import EmptyState from '../Empty/EmptyState'
import css from './App.module.css'
import type { FetchNotesResponse } from '../../services/noteService'

const App = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }),
    placeholderData: (prevData) => prevData,
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handlePageChange = (selected: number) => {
    setPage(selected)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const notes = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error?.message} />}
      {!isLoading && !isError && notes.length === 0 && <EmptyState />}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  )
}

export default App
