import { useNavigate, useSearchParams } from 'react-router-dom';
import './pagination.scss';

const Pagination = ({ currentPage, totalPages }) => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const getPageRange = () => {
    const range = [];
    const maxButtons = 7;
    let start = currentPage - Math.floor(maxButtons / 2);

    if (start < 1) {
      start = 1;
    } else if (start + maxButtons > totalPages) {
      start = totalPages - maxButtons + 1;
    }

    for (let i = start; i < start + maxButtons; i++) {
      if (i <= totalPages) {
        range.push(i);
      }
    }

    return range;
  };

  const increasePage = () => {
    searchParams.set('page', String(currentPage + 1))
    navigate(location.pathname+'?'+searchParams.toString())
  }

  const decreasePage = () => {
    searchParams.set('page', String(currentPage - 1))
    navigate(location.pathname+'?'+searchParams.toString())
  }

  const changePage = (pageNumber) => {
    searchParams.set('page', String(pageNumber))
    navigate(location.pathname+'?'+searchParams.toString())
  }

  return (
    <div className="pagination">
      <button
        onClick={decreasePage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {getPageRange().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => changePage(pageNumber)}
          disabled={currentPage === pageNumber}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={increasePage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;