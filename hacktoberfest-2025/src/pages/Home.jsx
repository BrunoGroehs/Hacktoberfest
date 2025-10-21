import CardLink from "./components/CardLink";

const Home = () => {
  return (
    <>
      <div className="container-app">
        <header>
          <h1 className="home-title">Groups Pages</h1>
        </header>

        <CardLink
          // to: route name (same in App.jsx)
          // title: title shown in the card
          // footer: message shown in the card
          items={[
            {
              to: "innovation",
              title: "Innovation Team",
              footer: "Come here to meet our Team!",
            },
            {
              to: "inner-open-source",
              title: "Open Source & InnerSource",
              footer:
                "Get to know and try our knowladge about the new Exploration Board!",
            },
            {
              to: "aim-tracking-game",
              title: "Aim Tracking Game",
              footer: "Treine sua mira com um jogo simples.",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Home;
