import * as React from "react";
import Pagination from "./Pagination";

import { getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  const PAGE_COUNT = 100;

  it("renders correctly", () => {
    const pagination = render(
      <Pagination pageCount={100} onPageChange={() => {}} />
    );

    expect(pagination).toMatchSnapshot();
  });

  it("shows the correct current page number and total page number", () => {
    const { container } = render(
      <Pagination pageCount={PAGE_COUNT} onPageChange={() => {}} />
    );

    expect(getByText(container, PAGE_COUNT)).toBeInTheDocument();
  });
});
