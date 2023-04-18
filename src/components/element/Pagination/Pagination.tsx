import React from "react";
import classNames from "classnames";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  curPage: number;
  pageCount: number;
  onPageChange: (page: Record<string, number>) => void;
}

/**
 * A pagination component wrapped around react-paginate with custom styles added
 * @param props
 * @returns
 */
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
      forcePage={props.curPage}
    />
  );
};

export default Pagination;
