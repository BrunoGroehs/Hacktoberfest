import { useState } from "react";
import "./InnerOpenSource.css";

const crosswordData = {
  across: [
    {
      number: 1,
      clue: "Popular version control system",
      answer: "GIT",
      row: 0,
      col: 0,
    },
    {
      number: 4,
      clue: "Container orchestration platform",
      answer: "KUBERNETES",
      row: 2,
      col: 2,
    },
    {
      number: 6,
      clue: "Popular JavaScript runtime",
      answer: "NODE",
      row: 4,
      col: 1,
    },
    {
      number: 7,
      clue: "Microsoft's code editor",
      answer: "VSCODE",
      row: 5,
      col: 6,
    },
    {
      number: 8,
      clue: "Programming language created by Google",
      answer: "GO",
      row: 6,
      col: 0,
    },
  ],
  down: [
    {
      number: 1,
      clue: "Code hosting platform owned by Microsoft",
      answer: "GITHUB",
      row: 0,
      col: 0,
    },
    {
      number: 2,
      clue: "Apache web server project",
      answer: "HTTPD",
      row: 0,
      col: 2,
    },
    {
      number: 3,
      clue: "Popular CSS framework",
      answer: "BOOTSTRAP",
      row: 1,
      col: 4,
    },
    {
      number: 5,
      clue: "Machine learning library",
      answer: "TENSORFLOW",
      row: 2,
      col: 8,
    },
  ],
};

const InnerOpenSource = () => {
  const [userAnswers, setUserAnswers] = useState({});

  const createGrid = () => {
    // Create a 10x12 grid
    const grid = Array(10)
      .fill(null)
      .map(() => Array(12).fill(null));

    // Place answers in the grid
    [...crosswordData.across, ...crosswordData.down].forEach((item) => {
      const { answer, row, col, number } = item;
      const isAcross = crosswordData.across.includes(item);

      for (let i = 0; i < answer.length; i++) {
        const currentRow = isAcross ? row : row + i;
        const currentCol = isAcross ? col + i : col;

        if (currentRow < 10 && currentCol < 12) {
          grid[currentRow][currentCol] = {
            letter: answer[i],
            number: i === 0 ? number : null,
            isStart: i === 0,
          };
        }
      }
    });

    return grid;
  };

  const grid = createGrid();

  const handleInputChange = (row, col, value) => {
    const key = `${row}-${col}`;
    setUserAnswers((prev) => ({
      ...prev,
      [key]: value.toUpperCase(),
    }));
  };

  const checkAnswer = (item) => {
    const { answer, row, col } = item;
    const isAcross = crosswordData.across.includes(item);

    for (let i = 0; i < answer.length; i++) {
      const currentRow = isAcross ? row : row + i;
      const currentCol = isAcross ? col + i : col;
      const key = `${currentRow}-${currentCol}`;

      if (userAnswers[key] !== answer[i]) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <div className="inner-open-source-page">
        <div className="page-container">
          <h1 className="inner-open-source-title">
            Open Source & InnerSource Exploration Board
          </h1>
          <p className="inner-open-source-description">
            The New Exploration Board aims to cultivate a dynamic local
            community centered on Open Source and InnerSource initiatives. These
            principles champion innovation through collaboration and
            transparency, boosting product development and enriching global
            technological progress. Our focus is on enhancing industry
            leadership and fostering openness within our organization.
          </p>

          <hr className="section-divider" />

          <h2 className="crossword-subtitle">Crossword Challenge</h2>
          <p className="crossword-description">
            Test your knowledge with this interactive crossword puzzle featuring
            famous open source projects, tools, and technologies that have
            shaped the modern software development landscape.
          </p>

          <div className="crossword-container">
            <div className="crossword-grid">
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`crossword-cell ${cell ? "active" : "inactive"}`}
                  >
                    {cell && (
                      <>
                        {cell.number && (
                          <span className="cell-number">{cell.number}</span>
                        )}
                        <input
                          type="text"
                          maxLength="1"
                          value={userAnswers[`${rowIndex}-${colIndex}`] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              rowIndex,
                              colIndex,
                              e.target.value
                            )
                          }
                          className="cell-input"
                        />
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="clues-container">
              <div className="clues-section">
                <h3>Across</h3>
                <ul className="clues-list">
                  {crosswordData.across.map((item) => (
                    <li
                      key={`across-${item.number}`}
                      className={`clue-item ${
                        checkAnswer(item) ? "completed" : ""
                      }`}
                    >
                      <span className="clue-number">{item.number}.</span>
                      <span className="clue-text">{item.clue}</span>
                      {checkAnswer(item) && (
                        <span className="clue-check">✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="clues-section">
                <h3>Down</h3>
                <ul className="clues-list">
                  {crosswordData.down.map((item) => (
                    <li
                      key={`down-${item.number}`}
                      className={`clue-item ${
                        checkAnswer(item) ? "completed" : ""
                      }`}
                    >
                      <span className="clue-number">{item.number}.</span>
                      <span className="clue-text">{item.clue}</span>
                      {checkAnswer(item) && (
                        <span className="clue-check">✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="benefits-section">
            <h2 className="benefits-title">Why Open Source & InnerSource?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h4>Accelerated Innovation</h4>
                <p>Leverage proven solutions and focus on business value</p>
              </div>
              <div className="benefit-item">
                <h4>Cost Efficiency</h4>
                <p>Reduce licensing costs and development time</p>
              </div>
              <div className="benefit-item">
                <h4>Community Collaboration</h4>
                <p>Learn from and contribute to global developer communities</p>
              </div>
              <div className="benefit-item">
                <h4>Quality & Security</h4>
                <p>Benefit from peer review and continuous improvement</p>
              </div>
            </div>
          </div>

          <div className="contacts-section">
            <h2 className="contacts-title">Get Involved & Connect</h2>
            <div className="contacts-grid">
              <div className="contact-item">
                <h4>Tiago Ceccon</h4>
                <p>Co-Lider</p>
                <a href="mailto:tiago.ceccon@sap.com" className="contact-link">
                  tiago.ceccon@sap.com
                </a>
              </div>
              <div className="contact-item">
                <h4>Martina Toebe</h4>
                <p>Co-Lider</p>
                <a href="mailto:martina.toebe@sap.com" className="contact-link">
                  martina.toebe@sap.com
                </a>
              </div>
              <div className="contact-item">
                <h4>SharePoint</h4>
                <p>Exploration Board SharePoint page</p>
                <a
                  href="https://sap.sharepoint.com/sites/202133/SitePages/[New-Exploration-Board]-Open-and-Inner-Source.aspx"
                  target="_blank"
                  className="contact-link"
                >
                  See here
                </a>
              </div>
              <div className="contact-item">
                <h4>SAP Open Source Manifesto</h4>
                <p>Guidelines and Commitments</p>
                <a
                  href="https://d.dam.sap.com/x/mvNj4Tf/Open%20Source_Hochformat%20A4-extended.pdf"
                  className="contact-link"
                >
                  Open Manifesto
                </a>
              </div>
              <div className="contact-item">
                <h4>SAP Lead Open Source Projects</h4>
                <p>Check the main topics about it!</p>
                <a
                  href="https://pages.community.sap.com/topics/open-source"
                  target="_blank"
                  className="contact-link"
                >
                  Go to Page
                </a>
              </div>
              <div className="contact-item">
                <h4>Open Source & InnerSource Teams Channels</h4>
                <p>Enter and meet with new collegues!</p>
                <a
                  href="https://teams.microsoft.com/l/channel/19:1be8ef1a242748eebb065b788024e582%40thread.tacv2/Open%20Source%20and%20InnerSource%20SAP%20Labs%20LatAm?groupId=7871246a-b6af-45d8-96bd-a9b9212df058&tenantId=42f7676c-f455-423c-82f6-dc2d99791af7"
                  target="_blank"
                  className="contact-link"
                >
                  Open Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerOpenSource;
