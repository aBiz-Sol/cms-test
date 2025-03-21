import React, { useEffect, useState } from "react";

const NotFound = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the content of the not-found.html file
    const fetchHTMLContent = async () => {
      try {
        const response = await fetch("/not-found.html"); // Path to your not-found.html in the public folder
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error("Error loading the 404 page:", error);
      }
    };

    fetchHTMLContent();
  }, []);

  return (
    <div
      className="not-found-page"
      dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
    />
  );
};

export default NotFound;
