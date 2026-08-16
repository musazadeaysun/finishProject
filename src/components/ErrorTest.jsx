import { useState } from "react";

function ErrorTest() {
  const [hasError, setHasError] =
    useState(false);

  if (hasError) {
    throw new Error(
      "Test xətası: Error Boundary işləyir!"
    );
  }

  return (
    <button
      onClick={() => setHasError(true)}
    >
      Error Boundary-ni test et
    </button>
  );
}

export default ErrorTest;