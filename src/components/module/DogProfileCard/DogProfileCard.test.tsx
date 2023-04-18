import * as React from "react";

import { getByText, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DogProfileCard from "./DogProfileCard";

describe("DogProfileCard", () => {
  const FAKE_DOG_PROPS = {
    id: "fake_id",
    img: "https://www.google.com",
    name: "fake dog name",
    age: 2,
    zip_code: "12345",
    breed: "Some Fake Breed",
    liked: false,
    onToggleLike: () => {},
  };
  it("renders correctly", () => {
    const dogProfileCard = render(<DogProfileCard {...FAKE_DOG_PROPS} />);

    expect(dogProfileCard).toMatchSnapshot();
  });

  it("shows all the information feeded but id", () => {
    const { container } = render(<DogProfileCard {...FAKE_DOG_PROPS} />);

    expect(getByText(container, FAKE_DOG_PROPS.name)).toBeVisible();
    expect(getByText(container, FAKE_DOG_PROPS.age + " YO")).toBeVisible();
    expect(getByText(container, FAKE_DOG_PROPS.zip_code)).toBeVisible();
    expect(getByText(container, FAKE_DOG_PROPS.breed)).toBeVisible();
  });
});
