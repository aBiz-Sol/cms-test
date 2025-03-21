import React, { Suspense, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadPage = ({ page }: { page: string }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    // Fetch HTML content for the requested page (home.html, pricing.html, contact.html)
    const fetchHTMLContent = async () => {
      try {
        const response = await fetch(`/${page}`); // Fetch HTML from the public folder
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error("Error loading HTML file:", error);
      }
    };

    fetchHTMLContent();
  }, [page]);

  return (
    <Suspense fallback={<CircularProgress />}>
      {/* Render the HTML content */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent || "" }} />
    </Suspense>
  );
};

export default LoadPage;
