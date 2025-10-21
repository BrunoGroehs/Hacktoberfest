import { useEffect, useRef, useState } from "react";

const GAME_DURATION_MS = 40_000; // 40 seconds
const TARGET_SIZE = 36; // px
const BASE_SPEED_PX_PER_SEC = 140; // starting speed
const ACCEL_PER_SEC = 10; // speed increases by this amount (px/s) per second

const AimTrackingGame = () => {
  // Login + flow
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("playerName") || ""
  );
  const [started, setStarted] = useState(!!playerName);
  const [finished, setFinished] = useState(false);

  // Game state
  const areaRef = useRef(null);
  const animRef = useRef(0);
  const lastTsRef = useRef(undefined);
  const elapsedRef = useRef(0);
  const hoveringRef = useRef(false);
  const scoreRef = useRef(0);
  const dirRef = useRef({ dx: 1, dy: 0 }); // unit vector
  const posRef = useRef({ x: 50, y: 50 }); // top-left of target
  const boundsRef = useRef({ w: 0, h: 0 });

  // UI state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });

  // Auto-start when a name already exists
  useEffect(() => {
    if (playerName && !started) {
      setStarted(true);
    }
    // we do NOT start game here; it starts in the effect below when started === true
  }, [playerName, started
