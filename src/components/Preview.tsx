import React from "react";
import { useLocation } from "react-router-dom";

const Preview = () => {
  const location = useLocation();
  const { html, css } = location.state || {};

  if (!html || !css) {
    return <div>Error: No preview content found!</div>;
  }

  return (
    <div>
      <h1>Preview</h1>
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Preview;
