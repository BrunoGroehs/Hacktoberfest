import { useState } from "react";
import "./innovation.css";

// Import team member pictures
import MatheusZeuchImg from "./teamPictures/MatheusZeuch.jpeg";
import AndriellePereinaImg from "./teamPictures/AndriellePereira.jpeg";
import GabriellaToyo from "./teamPictures/GabiellaToyo.jpg";
import BrunoHaefligerImg from "./teamPictures/BrunoHaefliger.jpeg";
import CarlosWendling from "./teamPictures/CarlosWendling.jpeg";

const cards = [
  {
    id: 1,
    frontTitle: "Matheus Zeuch",
    frontText: "SAP Labs Latin America Head of Innovation",

    image: MatheusZeuchImg,
  },
  {
    id: 2,
    frontTitle: "Andrielle Pereira",
    frontText: "Marketing and Communication Expert",

    image: AndriellePereinaImg,
  },
  {
    id: 3,
    frontTitle: "Gabriella Toyo",
    frontText: "Operational Assistant",

    image: GabriellaToyo,
  },
  {
    id: 4,
    frontTitle: "Bruno Haefliger",
    frontText: "Designer and Developer",

    image: BrunoHaefligerImg,
  },
  {
    id: 5,
    frontTitle: "Carlos Wendling",
    frontText: "Developer",

    image: CarlosWendling,
  },
];

const initiatives = [
  {
    id: "i1",
    title: "SAP Innoweeks",
    description:
      "A dynamic hackathon where creativity flourishes, teamwork shines, and game-changing solutions emerge, leaving a lasting impact on the business and technology landscape.",
    url: "https://sap.sharepoint.com/sites/202133/SitePages/Innoweeks.aspx",
  },
  {
    id: "i2",
    title: "Innovation Academy",
    description:
      "SAP Labs Latin America's flagship program that empowers employees with practical skills to drive innovation, acting as both a learning journey and a project incubator.",
    url: "https://sap.sharepoint.com/sites/202133/SitePages/Innovation%20Academy.aspx?csf=1&web=1&e=3BAU7b&CID=39cab720-856a-4d00-b8cf-43f314cb7d34",
  },
  {
    id: "i3",
    title: "Exploration Boards",
    description:
      "Exploration Boards are key hubs for sharing and receiving experience and information, connecting individuals with experts in their fields to foster collaboration and learning.",
    url: "https://sap.sharepoint.com/sites/202133/SitePages/Practice%20&%20Exploration%20Boards.aspx?csf=1&web=1&e=vG5caK&CID=18beeb94-3697-42fe-acaa-e864209a5e0b",
  },
  {
    id: "i4",
    title: "Patents",
    description:
      "Assisting inventors and researchers in bringing innovative concepts to life, offering crucial support throughout the patenting process to harness intellectual property's power in driving progress and competitiveness.",
    url: "https://sap.sharepoint.com/sites/202133/SitePages/Patents.aspx?csf=1&web=1&e=GhAQhu&CID=d778309c-fbc6-48ea-81b7-3528e03b5b31",
  },
  {
    id: "i5",
    title: "Innovation Talks",
    description:
      "Held monthly, they invite you to reshape your perspectives, invigorate your creativity, and connect with a community of like-minded innovators, creating a vibrant exchange of ideas and inspiration.",
    url: "https://sap.sharepoint.com/sites/202133/SitePages/Innovation-Talks.aspx?csf=1&web=1&e=9DSTS2&CID=331bee35-bcf2-4704-89dd-de57887af1d0",
  },
];

const eventImagesModules = import.meta.glob(
  "./eventsPictures/*.{jpg,jpeg,png}",
  { eager: true }
);
const eventImages = Object.keys(eventImagesModules)
  .sort()
  .map((path) => eventImagesModules[path].default);

const Innovation = () => {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // false = show back initially; true = flipped to show front
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));

  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = !prev[index];
      return next;
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(index);
    }
  };

  // Initiatives flip state: false = show back initially; true = show front
  const [initiativeFlipped, setInitiativeFlipped] = useState(
    Array(initiatives.length).fill(false)
  );

  const toggleInitiativeFlip = (index) => {
    setInitiativeFlipped((prev) => {
      const next = [...prev];
      next[index] = !prev[index];
      return next;
    });
  };

  const handleInitiativeKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleInitiativeFlip(index);
    }
  };

  // Carousel state and handlers for initiatives
  const [currentInitiative, setCurrentInitiative] = useState(0);

  const prevInitiative = () =>
    setCurrentInitiative(
      (i) => (i - 1 + initiatives.length) % initiatives.length
    );

  const nextInitiative = () =>
    setCurrentInitiative((i) => (i + 1) % initiatives.length);

  const handleCarouselKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevInitiative();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextInitiative();
    }
  };

  // Carousel state and handlers for Our Work images
  const [currentWork, setCurrentWork] = useState(0);

  const prevWork = () =>
    setCurrentWork((i) => (i - 1 + eventImages.length) % eventImages.length);

  const nextWork = () => setCurrentWork((i) => (i + 1) % eventImages.length);

  const handleWorkCarouselKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevWork();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextWork();
    }
  };

  return (
    <>
      <div
        className={`page-container innovation-page ${
          isDarkMode ? "dark-mode" : ""
        }`}
      >
        <div className="theme-toggle-container">
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="innovation-main-container">
          <h1 className="innovation-title">Innovation Team</h1>
          <p className="innovation-description">
            The <strong>Innovation Team</strong> is the driving force behind the
            pioneering spirit of our Labs, committed to{" "}
            <strong>
              fostering a culture of creativity, exploration, and future-focused
              development
            </strong>
            . Our core mission is to transform our Labs into the{" "}
            <strong>Labs of the Future</strong> — an epicenter of knowledge and
            experimentation, where artificial intelligence is seamlessly
            integrated into our workflows and development methodologies advance
            beyond traditional boundaries.
          </p>

          <h2 className="innovation-subtitle">Team Initiatives</h2>
          <p className="innovation-description">
            Through initiatives designed to propel our Labs toward becoming a
            <strong> hub of innovation</strong>, we equip teams to explore
            forward-thinking ideas and push technological boundaries. Programs
            like <strong>SAP Innoweeks</strong> and the{" "}
            <strong>Innovation Academy</strong> facilitate this journey, while
            engaging workshops and <strong>Innovation Talks</strong> foster
            vibrant cross-disciplinary discussions.{" "}
            <strong>Exploration Boards</strong> play a strategic role in
            examining emerging technologies, ensuring we remain pioneers in
            development.
          </p>
          <div
            className="initiatives-carousel"
            role="region"
            aria-label="Team Initiatives Carousel"
          >
            <button
              className="carousel-btn prev"
              onClick={prevInitiative}
              aria-label="Previous initiative"
            >
              ‹
            </button>

            <div
              className="carousel-viewport"
              tabIndex={0}
              onKeyDown={handleCarouselKeyDown}
              aria-live="polite"
            >
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentInitiative * 100}%)`,
                }}
              >
                {initiatives.map((item, idx) => (
                  <div
                    key={item.id}
                    className="carousel-slide"
                    aria-hidden={idx !== currentInitiative}
                  >
                    <div
                      className="flip-card initiative-card"
                      role="button"
                      tabIndex={0}
                      aria-pressed={initiativeFlipped[idx]}
                      onClick={() => toggleInitiativeFlip(idx)}
                      onKeyDown={(e) => handleInitiativeKeyDown(e, idx)}
                    >
                      <div
                        className={`flip-card-inner ${
                          initiativeFlipped[idx] ? "show-front" : ""
                        }`}
                      >
                        <div className="flip-card-front">
                          <h3 className="initiative-title">{item.title}</h3>
                          <p className="initiative-text">{item.description}</p>
                          <button
                            className="initiative-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(item.url, "_blank");
                            }}
                          >
                            Learn More
                          </button>
                        </div>
                        <div className="flip-card-back">
                          <h3 className="initiative-title">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-btn next"
              onClick={nextInitiative}
              aria-label="Next initiative"
            >
              ›
            </button>

            <div
              className="carousel-dots"
              role="tablist"
              aria-label="Carousel pagination"
            >
              {initiatives.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentInitiative ? "active" : ""}`}
                  onClick={() => setCurrentInitiative(idx)}
                  aria-label={`Go to initiative ${idx + 1}`}
                  aria-selected={idx === currentInitiative}
                  role="tab"
                />
              ))}
            </div>
          </div>

          <h2 className="innovation-subtitle">Team Members</h2>
          <div className="innovation-grid">
            {cards.map((card, idx) => (
              <div
                key={card.id}
                className="flip-card"
                role="button"
                tabIndex={0}
                aria-pressed={flipped[idx]}
                onClick={() => toggleFlip(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <div
                  className={`flip-card-inner ${
                    flipped[idx] ? "show-front" : ""
                  }`}
                >
                  <div className="flip-card-front">
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.frontTitle}
                        className="team-member-image"
                      />
                    )}
                    <h2>{card.frontTitle}</h2>
                    <p>{card.frontText}</p>
                  </div>
                  <div className="flip-card-back">
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.backTitle}
                        className="team-member-image"
                      />
                    )}
                    <h2>{card.backTitle}</h2>
                    <p>{card.backText}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="innovation-subtitle">Our Work</h2>
          <div
            className="initiatives-carousel"
            role="region"
            aria-label="Our Work Carousel"
          >
            <button
              className="carousel-btn prev"
              onClick={prevWork}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div
              className="carousel-viewport"
              tabIndex={0}
              onKeyDown={handleWorkCarouselKeyDown}
              aria-live="polite"
            >
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentWork * 100}%)`,
                }}
              >
                {eventImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="carousel-slide"
                    aria-hidden={idx !== currentWork}
                  >
                    <img
                      src={src}
                      alt={`Event photo ${idx + 1}`}
                      className="work-image"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-btn next"
              onClick={nextWork}
              aria-label="Next photo"
            >
              ›
            </button>

            <div
              className="carousel-dots"
              role="tablist"
              aria-label="Carousel pagination"
            >
              {eventImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentWork ? "active" : ""}`}
                  onClick={() => setCurrentWork(idx)}
                  aria-label={`Go to photo ${idx + 1}`}
                  aria-selected={idx === currentWork}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Innovation;
