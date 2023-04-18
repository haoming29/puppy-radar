import * as React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navigation from "./Navigation";

jest.mock("next/router", () => require("next-router-mock"));

let mockAuthStatus = 0;

jest.mock("../../../store/useStore", () => {
  return jest.fn(() => ({
    authStatus: mockAuthStatus,
  }));
});

describe("Navigation", () => {
  it("renders correctly", () => {
    const navigation = render(<Navigation />);

    expect(navigation).toMatchSnapshot();
  });

  it("shows the logo of the website", () => {
    const { getByAltText } = render(<Navigation />);
    expect(getByAltText("website logo")).toBeTruthy();
  });

  it("does not show up logout and list option when user is not logged in", () => {
    const { queryByText, queryByTitle } = render(<Navigation />);

    expect(queryByText("Logout")).toBeNull();
    expect(queryByTitle("Dogs You Liked")).toBeNull();
  });

  it("shows logout and list option when user logged in", () => {
    mockAuthStatus = 2;
    const { getByText, getByTitle } = render(<Navigation />);

    expect(getByText("Logout")).toBeTruthy();
    expect(getByTitle("Dogs You Liked")).toBeTruthy();
    mockAuthStatus = 0;
  });
});
