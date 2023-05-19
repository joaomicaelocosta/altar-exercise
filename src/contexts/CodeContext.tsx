import React, { createContext, useState, useContext, useEffect } from "react";

interface CodeContextType {
  code: string;
  grid: string[][];
  isGenerating: boolean;
  updateWeightChar: (char: string) => void;
  updateIsGenerating: (val: boolean) => void;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCode = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error("useCode must be used within a CodeProvider");
  }
  return context;
};

export const CodeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [code, setCode] = useState<string>("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [weightChar, setWeightChar] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    if (!isGenerating) return;
    generateGrid();
    const interval = setInterval(() => {
      generateGrid();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isGenerating, weightChar]);

  //generate random char from a to z;
  const getRandomChar = (): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const randomChar = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    //if random number is less than 0.2 return the weight char
    return Math.random() < 0.2 && weightChar ? weightChar : randomChar;
  };

  //generate grid
  const generateGrid = (): void => {
    let newGrid: string[][] = [];
    for (let i = 0; i < 10; i++) {
      let row: string[] = [];
      for (let j = 0; j < 10; j++) {
        //push chars to row
        row.push(getRandomChar());
      }
      //push row to grid
      newGrid.push(row);
    }
    setGrid(newGrid);
    generateCode(newGrid);
  };

  //generate code from grid
  const generateCode = (grid: string[][]): void => {
    if (grid.length) {
      const now = new Date();
      //calculate indices based on current second to get chars from grid
      const secondsString = now.getSeconds().toString();
      const pos1 =
        Number(secondsString.length > 1 ? secondsString[0] : "0") % 10;
      const pos2 =
        Number(secondsString.length > 1 ? secondsString[1] : secondsString[0]) %
        10;

      //get chars from grid
      const char1 = grid[pos1][pos2];
      const char2 = grid[pos2][pos1];
      //count times char appears in grid
      const count1 = grid.flat().filter((char) => char === char1).length;
      const count2 = grid.flat().filter((char) => char === char2).length;
      //generate the code
      const code1 =
        count1 > 9 ? Math.ceil(count1 / (Math.floor(count1 / 10) + 1)) : count1;
      const code2 =
        count2 > 9 ? Math.ceil(count2 / (Math.floor(count2 / 10) + 1)) : count2;

      setCode(`${code1}${code2}`);
    }
  };

  const updateWeightChar = (char: string): void => {
    setWeightChar(char);
  };

  const updateIsGenerating = (val: boolean): void => {
    setIsGenerating(val);
  };

  const codeContextValue: CodeContextType = {
    code,
    grid,
    isGenerating,
    updateWeightChar,
    updateIsGenerating,
  };

  return <CodeContext.Provider value={codeContextValue}>{children}</CodeContext.Provider>;
};
