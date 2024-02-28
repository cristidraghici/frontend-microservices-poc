import { render } from "@testing-library/react";

import App from "../App";

const TEST_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

describe("App", () => {
  it("should test a snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render", () => {
    render(<App />);
    const element = document.querySelector("div");
    expect(element?.textContent).toContain(TEST_TEXT);
  });
});
