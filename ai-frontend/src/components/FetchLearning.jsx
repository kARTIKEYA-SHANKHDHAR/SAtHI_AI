import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./FetchLearning.css";

function FetchLearning({ setFullData }) {
  const [languageName, setLanguageName] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [preparingFor, setPreparingFor] = useState("");
  const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate(); // Use navigate hook

  const handleFetchTopics = async () => {
    try {
      setLoading(true); // Show loader
      console.log("Sending API call");
const backendURL = import.meta.env.VITE_BACKEND_URL;
const response = await axios.post(`${backendURL}/api/prompt-post`, {
        prompt: `Provide a learning plan for ${languageName} for ${days} days where I can spend ${hours} hours as I am preparing for ${preparingFor}.`
      });

      setFullData(response.data); // Store fetched data in state
      navigate("/topics"); // Navigate to LanguageTopics page after data is fetched
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false); // Hide loader after API call completes
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>QuestForge: Your Personalized Training Arc</h1>
        <input
          type="text"
          value={languageName}
          onChange={(e) => setLanguageName(e.target.value)}
          placeholder="Which Language will you master?🧑‍💻"
        />
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Set Your Training Arc Duration🔥"
        />
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Daily XP Grind?🎮"
        />
        <input
          type="text"
          value={preparingFor}
          onChange={(e) => setPreparingFor(e.target.value)}
          placeholder="Choose Your Final Boss⚔️"
        />
        <button onClick={handleFetchTopics} disabled={loading}>
          {loading ? "Loading..." : "Start Your Quest!"}
        </button>
        {loading && <div className="loader"></div>} {/* Loader element */}
      </div>
    </div>
  );
}

export default FetchLearning;
