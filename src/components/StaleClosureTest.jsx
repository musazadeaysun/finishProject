import { useEffect, useState } from "react";

function StaleClosureTest() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleClick = () => {
      setMessage(
        `Handler-in gördüyü count: ${count}`
      );
    };

    window.addEventListener(
      "stale-test",
      handleClick
    );

    return () => {
      window.removeEventListener(
        "stale-test",
        handleClick
      );
    };
  }, [count]);

  const triggerTest = () => {
    window.dispatchEvent(
      new Event("stale-test")
    );
  };

  return (
    <div className="error-test">
      <h3>Stale Closure Testi</h3>

      <p>
        Count: <strong>{count}</strong>
      </p>

      <button
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Count artır
      </button>

      <button
        type="button"
        onClick={triggerTest}
      >
        Handler-i işə sal
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default StaleClosureTest;