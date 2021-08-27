import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

const Pagination = ({ pageSize, currentPage, source, totalItemsCount }) => {
  const totalPages = Math.ceil(totalItemsCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = prevPage > 0;
  const hasNextPage = nextPage <= totalPages;

  return (
    <PaginationStyles>
      <Link
        className="word"
        title="Prev Page"
        disabled={!hasPrevPage}
        to={
          currentPage > 1
            ? `/${source}/${prevPage > 1 ? prevPage : ''}`
            : `/${source}/`
        }
      >
        ⇜ <span className="word">Prev</span>
      </Link>
      {/* // here go the page numbers */}
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          key={i + 1}
          to={`/${source}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        className="word"
        title="Next Page"
        disabled={!hasNextPage}
        to={`/${source}/${nextPage}`}
      >
        <span className="word">Next</span> ⇝
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
