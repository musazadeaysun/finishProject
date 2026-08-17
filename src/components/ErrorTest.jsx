import { useState } from "react";

function ErrorTest() {
  const [shouldThrow, setShouldThrow] =
    useState(false);

  if (shouldThrow) {
    throw new Error(
      "Test xətası: Error Boundary uğurla işə düşdü!"
    );
  }

  return (
    <div className="error-test">
      <h3>Error Boundary Testi</h3>

      <p>
        Aşağıdakı düymə qəsdən xəta yaradaraq
        Error Boundary-ni test edir.
      </p>

      <button
        type="button"
        onClick={() => setShouldThrow(true)}
      >
        Sistemi Çökdür
      </button>
    </div>
  );
}

export default ErrorTest;