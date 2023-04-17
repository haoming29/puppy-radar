import React from "react";
import classNames from "classnames";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  curPage: number;
  pageCount: number;
  onPageChange: (page: Record<string, number>) => void;
}

const Pagination = (props: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={props.onPageChange}
      pageRangeDisplayed={5}
      pageCount={props.pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageClassName={styles.pageItem}
      breakClassName={classNames(styles.pageItem)}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.prevNextItem}
      nextClassName={styles.prevNextItem}
      containerClassName={styles.container}
      activeClassName={styles.activeItem}
    />
  );
};

export default Pagination;