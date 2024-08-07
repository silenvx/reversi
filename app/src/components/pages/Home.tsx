import { useNavigate } from "react-router-dom";

import { appURL } from "@/config/url";

export function Home() {
  const navigate = useNavigate();

  const handleClickGameStart = () => {
    navigate(appURL.top);
  };

  const neonText = {
    color: "#FFFFFF",
    textShadow:
      "0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00",
  };

  const neonButton = {
    color: "#FFFFFF",
    backgroundColor: "#000000",
    textShadow:
      "0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00",
    border: "2px solid #ff8c00",
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl" style={neonText}>
          ド派手アクション
          <br />
          リバシニア
        </h1>
        <button
          className="mt-20 text-2xl text-orange-400"
          style={neonButton}
          type="button"
          onClick={handleClickGameStart}
        >
          START
        </button>
      </div>
    </div>
  );
}

export default Home;
