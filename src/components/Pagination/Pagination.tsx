import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  onPageChange: (selected: number) => void;
  search: string;
}

const Pagination = ({ page, onPageChange, search }: PaginationProps) => {
  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  if (!data || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
      breakClassName={css.page}
      pageLinkClassName={css.link}
      previousLinkClassName={css.link}
      nextLinkClassName={css.link}
      breakLinkClassName={css.link}
      pageCount={data.totalPages}
      forcePage={page - 1}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
