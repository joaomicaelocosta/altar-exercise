import React from "react";

import "../styles/components/CodeComponent.scss";

interface CodeComponentProps {
  code: string;
}

const CodeComponent: React.FC<CodeComponentProps> = (props) => {

  return (
      <div className="code">
        <div className="code-live">Live</div>
        <div className="code-info">your code: {props.code}</div>
      </div>
  );
};

export default CodeComponent;
