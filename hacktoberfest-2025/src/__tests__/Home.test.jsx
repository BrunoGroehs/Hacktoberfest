import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("Home page", () => {
  it("renders page header and card titles", () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Groups Pages/i })
    ).toBeInTheDocument();

    // Ensure at least two known initial cards render
    expect(
      screen.getByRole("heading", { level: 2, name: /Innovation Team/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Open Source & InnerSource/i,
      })
    ).toBeInTheDocument();

    // Ensure cards container exists
    const cardsContainer = container.querySelector(".pages-links");
    expect(cardsContainer).not.toBeNull();

    // Ensure cards exist
    const cards = cardsContainer.querySelectorAll("a.card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has unique link targets for all Home cards", () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const cards = container.querySelectorAll(".pages-links a.card");
    const pathnames = Array.from(cards).map((a) => new URL(a.href).pathname);

    // All card paths must be unique (no duplicated routes in Home card links)
    const uniqueCount = new Set(pathnames).size;
    expect(uniqueCount).toBe(pathnames.length);
  });
});
