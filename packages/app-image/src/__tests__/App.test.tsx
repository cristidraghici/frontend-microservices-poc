import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  it("should test a snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render", () => {
    render(<App />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
