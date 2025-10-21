import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./AimTrackingGame.css";

// Constants
const GAME_DURATION_MS = 40_000; // 40 seconds
const TARGET_SIZE = 42; // px (moving mode)
const REACTION_SIZE = 68; // px (larger target for reaction mode)
const BASE_SPEED_PX_PER_SEC = 150; // starting speed
const ACCEL_PER_SEC = 18; // acceleration (px/s^2)

// Modes
const MODES = {
  REACTION: "Modo Reação",
  MOVING: "Mira em Movimento",
};

const randomUnitVector = () => {
  const a = Math.random() * Math.PI * 2;
  return { dx: Math.cos(a), dy: Math.sin(a) };
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const AimTrackingGame = () => {
  // Flow: login -> menu -> playing -> result
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [phase, setPhase] = useState(() => (playerName ? "menu" : "login"));
  const [mode, setMode] = useState(null);

  // Game runtime refs
  const areaRef = useRef(null);
  const animRef = useRef(0);
  const lastTsRef = useRef(undefined);
  const elapsedRef = useRef(0);
  const hoveredMsRef = useRef(0);
  const hoveringRef = useRef(false);
  const scoreRef = useRef(0);
  const accuracyRef = useRef(0);
  const dirRef = useRef(randomUnitVector());
  const posRef = useRef({ x: 80, y: 80 }); // top-left of target
  const speedRef = useRef(BASE_SPEED_PX_PER_SEC);
  const boundsRef = useRef({ w: 0, h: 0 });
  const reactionTimerRef = useRef(0);
  const reactionSpawnsRef = useRef(0);
  const reactionHitsRef = useRef(0);
  const changeDirTimerRef = useRef(0);
  const changeDirEveryMsRef = useRef(900 + Math.random() * 900);

  // UI state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS);
  const [accuracy, setAccuracy] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 80, y: 80 });
  const [particles, setParticles] = useState([]);
  const [results, setResults] = useState(null); // { player, score }
  const [top3, setTop3] = useState([]); // leaderboard for current mode

  // Derived mode parameters
  const modeParams = useMemo(() => {
    switch (mode) {
      case MODES.REACTION:
        return { accel: 0, teleportEveryMs: 700 };
      case MODES.MOVING:
        return { accel: ACCEL_PER_SEC, teleportEveryMs: 0 };
      default:
        return { accel: 0, teleportEveryMs: 0 };
    }
  }, [mode]);

  const currentTargetSize = useMemo(
    () => (mode === MODES.REACTION ? REACTION_SIZE : TARGET_SIZE),
    [mode]
  );

  // Helpers
  const centerWithinBounds = useCallback(() => {
    const el = areaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    boundsRef.current = { w: rect.width, h: rect.height };
    const size = currentTargetSize;
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    posRef.current = { x, y };
    setTargetPos({ x, y });
  }, [currentTargetSize]);

  const randomPosInBounds = useCallback(() => {
    const { w, h } = boundsRef.current;
    const size = currentTargetSize;
    const x = Math.random() * Math.max(1, (w - size));
    const y = Math.random() * Math.max(1, (h - size));
    posRef.current = { x, y };
    setTargetPos({ x, y });
  }, [currentTargetSize]);

  const pushParticle = useCallback((x, y, color = "#00e5ff") => {
    const id = crypto.randomUUID();
    const p = { id, x, y, color };
    setParticles((prev) => [...prev, p]);
    // auto-remove after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((q) => q.id !== id));
    }, 600);
  }, []);

  // Reaction mode: spawn and count
  const spawnReactionTarget = useCallback(() => {
    randomPosInBounds();
    reactionSpawnsRef.current += 1;
  }, [randomPosInBounds]);

  // Start game
  const startGame = useCallback(() => {
    elapsedRef.current = 0;
    hoveredMsRef.current = 0;
    scoreRef.current = 0;
    speedRef.current = BASE_SPEED_PX_PER_SEC;
    dirRef.current = randomUnitVector();
    reactionTimerRef.current = 0;
    reactionSpawnsRef.current = 0;
    reactionHitsRef.current = 0;
    changeDirTimerRef.current = 0;
    changeDirEveryMsRef.current = 900 + Math.random() * 900;
    setScore(0);
    setAccuracy(0);
    setTimeLeft(GAME_DURATION_MS);
    setResults(null);
    centerWithinBounds();
    if (mode === MODES.REACTION) {
      // ensure first spawn counts for accuracy denominator
      setTimeout(() => spawnReactionTarget(), 0);
    }
    setPhase("playing");
  }, [centerWithinBounds, mode, spawnReactionTarget]);

  // Finish game
  // Persistence helpers (per mode)
  const saveScoreToStorage = useCallback((entryMode, entry) => {
    try {
      const raw = localStorage.getItem("aimScoresByMode");
      let scores = raw ? JSON.parse(raw) : { reaction: [], moving: [] };
      if (!scores.reaction) scores.reaction = [];
      if (!scores.moving) scores.moving = [];
      const key = entryMode === MODES.REACTION ? "reaction" : "moving";
      scores[key].push(entry);
      localStorage.setItem("aimScoresByMode", JSON.stringify(scores));
    } catch (_) {}
  }, []);

  const recomputeTop3 = useCallback(() => {
    try {
      const raw = localStorage.getItem("aimScoresByMode");
      let scores = raw ? JSON.parse(raw) : { reaction: [], moving: [] };
      const key = mode === MODES.REACTION ? "reaction" : "moving";
      const arr = Array.isArray(scores[key]) ? scores[key] : [];
      const sorted = [...arr].sort((a, b) => b.score - a.score).slice(0, 3);
      setTop3(sorted);
    } catch (_) {
      setTop3([]);
    }
  }, [mode]);

  // Download scores.json (per-mode format)
  const downloadScores = useCallback(() => {
    // Prefer per-mode structure
    const raw = localStorage.getItem("aimScoresByMode");
    let scoresByMode;
    try {
      if (raw) {
        scoresByMode = JSON.parse(raw);
      } else {
        // Back-compat: migrate from old flat array if present
        const legacy = JSON.parse(localStorage.getItem("aimScores") || "[]");
        scoresByMode = { reaction: [], moving: [] };
        legacy.forEach((r) => scoresByMode.moving.push(r));
      }
    } catch (_) {
      scoresByMode = { reaction: [], moving: [] };
    }
    const blob = new Blob([JSON.stringify(scoresByMode, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "scores.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const finishGame = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    animRef.current = 0;
    setPhase("result");
    const final = { player: playerName, score: Math.round(scoreRef.current) };
    setResults(final);

    // Save per-mode and update leaderboard
    saveScoreToStorage(mode, final);
    recomputeTop3();

    // Auto-download updated JSON as requested
    downloadScores();
  }, [playerName, mode, saveScoreToStorage, downloadScores, recomputeTop3]);

  

  // Handle resize
  useEffect(() => {
    const onResize = () => centerWithinBounds();
    window.addEventListener("resize", onResize);
    // initial bounds
    setTimeout(onResize, 0);
    return () => window.removeEventListener("resize", onResize);
  }, [centerWithinBounds]);

  // Update leaderboard when mode changes
  useEffect(() => {
    if (!mode) return;
    recomputeTop3();
  }, [mode, recomputeTop3]);

  // Main loop
  useEffect(() => {
    if (phase !== "playing") return;
    const el = areaRef.current;
    if (!el) return;

    lastTsRef.current = undefined;

    const step = (ts) => {
      if (lastTsRef.current === undefined) {
        lastTsRef.current = ts;
        animRef.current = requestAnimationFrame(step);
        return;
      }
      const dt = ts - lastTsRef.current; // ms
      lastTsRef.current = ts;

      // update elapsed and timers
      elapsedRef.current += dt;
      setTimeLeft((t) => clamp(GAME_DURATION_MS - elapsedRef.current, 0, GAME_DURATION_MS));
      const size = currentTargetSize;

      if (mode === MODES.MOVING) {
        if (hoveringRef.current) {
          hoveredMsRef.current += dt;
          scoreRef.current += dt; // movement mode: ms hovering
          setScore(Math.round(scoreRef.current));
        }
        const acc = hoveredMsRef.current / Math.max(1, elapsedRef.current);
        accuracyRef.current = acc;
        setAccuracy(acc);
      } else if (mode === MODES.REACTION) {
        // accuracy = hits/spawns
        const sp = Math.max(1, reactionSpawnsRef.current);
        const acc = reactionHitsRef.current / sp;
        accuracyRef.current = acc;
        setAccuracy(acc);
      }

      // handle mode behavior
      const { accel, teleportEveryMs } = modeParams;
      const { w, h } = boundsRef.current;

      if (mode === MODES.REACTION && teleportEveryMs > 0) {
        reactionTimerRef.current += dt;
        if (reactionTimerRef.current >= teleportEveryMs) {
          reactionTimerRef.current = 0;
          spawnReactionTarget();
          // small effect
          pushParticle(
            posRef.current.x + size / 2,
            posRef.current.y + size / 2,
            "#ff2bd6"
          );
        }
      } else if (mode === MODES.MOVING) {
        // continuous movement with acceleration
        speedRef.current += (accel * dt) / 1000;
        const dx = dirRef.current.dx * (speedRef.current * (dt / 1000));
        const dy = dirRef.current.dy * (speedRef.current * (dt / 1000));
        let nx = posRef.current.x + dx;
        let ny = posRef.current.y + dy;
        // bounce on edges
        if (nx <= 0 || nx >= w - size) {
          dirRef.current.dx *= -1;
          nx = clamp(nx, 0, w - size);
          pushParticle(nx + size / 2, ny + size / 2, "#00e5ff");
        }
        if (ny <= 0 || ny >= h - size) {
          dirRef.current.dy *= -1;
          ny = clamp(ny, 0, h - size);
          pushParticle(nx + size / 2, ny + size / 2, "#7c4dff");
        }

        // randomize direction over time so it's not fixed
        changeDirTimerRef.current += dt;
        if (changeDirTimerRef.current >= changeDirEveryMsRef.current) {
          changeDirTimerRef.current = 0;
          changeDirEveryMsRef.current = 900 + Math.random() * 1200;
          // blend current direction with a new random vector for smoothness
          const r = randomUnitVector();
          const blend = 0.45 + Math.random() * 0.4; // 0.45..0.85
          const ndx = dirRef.current.dx * (1 - blend) + r.dx * blend;
          const ndy = dirRef.current.dy * (1 - blend) + r.dy * blend;
          const len = Math.hypot(ndx, ndy) || 1;
          dirRef.current = { dx: ndx / len, dy: ndy / len };
        }
        posRef.current = { x: nx, y: ny };
        setTargetPos({ x: nx, y: ny });
      }

      // victory condition
      if (elapsedRef.current >= GAME_DURATION_MS) {
        finishGame();
        return;
      }

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, modeParams, randomPosInBounds, pushParticle, finishGame]);

  // Target hover handlers
  const onEnter = useCallback(() => {
    hoveringRef.current = true;
    pushParticle(
      posRef.current.x + currentTargetSize / 2,
      posRef.current.y + currentTargetSize / 2,
      "#39ff14"
    );
  }, [pushParticle, currentTargetSize]);
  const onLeave = useCallback(() => {
    hoveringRef.current = false;
  }, []);

  const onClickTarget = useCallback(() => {
    if (phase !== "playing" || mode !== MODES.REACTION) return;
    reactionHitsRef.current += 1;
    scoreRef.current = reactionHitsRef.current; // reaction mode: score = hits
    setScore(reactionHitsRef.current);
    pushParticle(
      posRef.current.x + currentTargetSize / 2,
      posRef.current.y + currentTargetSize / 2,
      "#39ff14"
    );
    // immediately spawn new
    spawnReactionTarget();
  }, [phase, mode, spawnReactionTarget, currentTargetSize, pushParticle]);

  // Flow handlers
  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = playerName.trim();
      if (!trimmed) return;
      localStorage.setItem("playerName", trimmed);
      setPlayerName(trimmed);
      setPhase("menu");
    },
    [playerName]
  );

  const chooseMode = useCallback((m) => {
    setMode(m);
    startGame();
  }, [startGame]);

  const resetToMenu = useCallback(() => {
    setPhase("menu");
  }, []);

  // Render helpers
  const formattedTime = useMemo(() => {
    const ms = Math.max(0, timeLeft);
    const s = (ms / 1000).toFixed(1);
    return `${s}s`;
  }, [timeLeft]);

  const accuracyPct = useMemo(() => `${Math.round(accuracy * 100)}%`, [accuracy]);

  return (
    <div className="aim-root">
      {/* Background FX */}
      <div className="aim-bg-grid" />
      <div className="aim-bg-glow" />

      {/* Center reticle */}
      <div className="reticle">
        <div className="reticle-ring" />
        <div className="reticle-dot" />
      </div>

      {/* HUD */}
      <div className="hud">
        <div className="hud-card">
          <span className="hud-label">Pontuação</span>
          <span className="hud-value">{score}</span>
        </div>
        <div className="hud-card">
          <span className="hud-label">Tempo</span>
          <span className="hud-value">{formattedTime}</span>
        </div>
        <div className="hud-card">
          <span className="hud-label">Precisão</span>
          <span className="hud-value">{accuracyPct}</span>
        </div>
      </div>

      {/* Top 3 leaderboard (current mode) */}
      {mode && (
        <div className="hud-right">
          <div className="leaderboard">
            <div className="lb-title">Top 3 — {mode}</div>
            {top3.length === 0 ? (
              <div className="lb-empty">Sem registros</div>
            ) : (
              top3.map((r, i) => (
                <div key={`${r.player}-${i}`} className={`lb-row rank-${i + 1}`}>
                  <span className="pos">#{i + 1}</span>
                  <span className="name">{r.player}</span>
                  <span className="pts">{r.score}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Flow overlays */}
      {phase === "login" && (
        <div className="overlay">
          <div className="panel">
            <h2 className="title">Aim Tracking — Sci‑Fi Arena</h2>
            <p className="subtitle">Entre com seu nome para começar</p>
            <form onSubmit={handleLogin} className="form">
              <input
                className="input"
                placeholder="Seu nome"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <button className="btn primary" type="submit">
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {phase === "menu" && (
        <div className="overlay">
          <div className="panel">
            <h2 className="title">Menu Principal</h2>
            <p className="subtitle">Bem‑vindo, {playerName}.</p>
            <div className="menu-grid">
              <button className="btn neon" onClick={() => chooseMode(MODES.REACTION)}>
                {MODES.REACTION}
              </button>
              <button className="btn neon" onClick={() => chooseMode(MODES.MOVING)}>
                {MODES.MOVING}
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === "result" && results && (
        <div className="overlay">
          <div className="panel">
            <h2 className="title">Resultado</h2>
            <p className="subtitle">
              {results.player}: <b>{results.score}</b> pontos
            </p>
            <div className="menu-grid">
              <button className="btn primary" onClick={downloadScores}>
                Baixar scores.json
              </button>
              <button className="btn neon" onClick={() => startGame()}>
                Jogar Novamente
              </button>
              <button className="btn outline" onClick={resetToMenu}>
                Voltar ao Menu
              </button>
            </div>
            <p className="hint">
              Observação: por ser um app frontend, salvamos localmente no navegador
              e disponibilizamos o arquivo scores.json para download.
            </p>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="game-area" ref={areaRef}>
        {/* Particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{ left: p.x, top: p.y, background: p.color }}
          />
        ))}

        {/* Target */}
        <div
          className="target"
          style={{ left: targetPos.x, top: targetPos.y, width: currentTargetSize, height: currentTargetSize }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={onClickTarget}
        >
          <span className="target-core" />
        </div>
      </div>
    </div>
  );
};
 
export default AimTrackingGame;

