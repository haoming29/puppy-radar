import * as React from "react";
import Pagination from "./Pagination";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  const CUR_PAGE = 10;
  const PAGE_COUNT = 100;

  it("renders correctly", () => {
    const pagination = render(
      <Pagination curPage={CUR_PAGE} pageCount={100} onPageChange={() => {}} />
    );

    expect(pagination).toMatchSnapshot();
  });

  it("shows the correct total page number", () => {
    const { getByText } = render(
      <Pagination
        curPage={CUR_PAGE}
        pageCount={PAGE_COUNT}
        onPageChange={() => {}}
      />
    );

    expect(getByText(PAGE_COUNT)).toBeInTheDocument();
  });
});
