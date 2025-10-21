import { render, screen } from "@testing-library/react";
import App from "../App";

const setPath = (path) => {
  window.history.pushState({}, "", path);
};

describe("App routing", () => {
  it('renders Home on "/"', () => {
    setPath("/");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Groups Pages/i })
    ).toBeInTheDocument();
  });

  it('renders Innovation on "/innovation"', () => {
    setPath("/innovation");
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Innovation Team/i })
    ).toBeInTheDocument();
  });

  it('renders InnerOpenSource on "/inner-open-source"', () => {
    setPath("/inner-open-source");
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: /Open Source & InnerSource Exploration Board/i,
      })
    ).toBeInTheDocument();
  });
});
