import React, { useState } from "react";
import { useCode } from "../contexts/CodeContext";

import CodeComponent from "./CodeComponent";

import "../styles/components/GridComponent.scss";
import clock from "../assets/clock.svg";

const GridComponent: React.FC = () => {
  const [lastInputTime, setLastInputTime] = useState<number>(Date.now());
  const { code, grid, updateWeightChar, updateIsGenerating } = useCode();

  const startGenerating = () => {
    updateIsGenerating(true);
  };

  const handleWeightCharChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const now = Date.now();
    //check if last user input was more than 4 seconds ago
    if (now - lastInputTime >= 4000) {
      const char = event.target.value.trim().toLowerCase();
      updateWeightChar(char);
      setLastInputTime(now);
    }
  };

  return (
    <div className="grid">
      <div className="grid-input">
        <div>
          <span>character</span>
          <input
            type="text"
            maxLength={1}
            onChange={handleWeightCharChange}
            placeholder="Character"
          />
        </div>
        <img height={50} src={clock} alt="clock" />
        <button onClick={startGenerating}>generate 2d grid</button>
      </div>
      <div className="grid-table">
        {grid.map((row, i) => (
          <div key={i} className="grid-table-row">
            {row.map((char, j) => (
              <span key={j}>{char}</span>
            ))}
          </div>
        ))}
      </div>
      <CodeComponent code={code}/>
    </div>
  );
};

export default GridComponent;
