import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Preview = () => {
  const { pageId } = useParams(); // Get the pageId from the URL
  const [htmlContent, setHtmlContent] = useState<string>(""); // HTML content
  const [cssContent, setCssContent] = useState<string>(""); // CSS content
  const [pageContent, setPageContent] = useState<any>(null); // Store the specific page content

  useEffect(() => {
    if (pageId) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("gjsProject-")) {
          const savedProjectData = localStorage.getItem(key);

          if (!savedProjectData) {
            console.error(`No project data found for key: ${key}`);
            return;
          }

          let projectData = {} as any;

          try {
            // Parse the project data stored in localStorage
            projectData = JSON.parse(savedProjectData);
          } catch (error) {
            console.error(`Failed to parse JSON for key ${key}:`, error);
            return;
          }

          // Find the page with the matching id (e.g., 'home', 'pricing')
          const page = projectData.pages?.find((p: any) => p.id === pageId);

          if (page) {
            setPageContent(page);

            const projectId = projectData.id;
            const pageHtmlKey = `gjsProject-${projectId}-page-${pageId}-html`;
            const pageCssKey = `gjsProject-${projectId}-page-${pageId}-css`;

            // Fetch the HTML content directly as a string
            const savedHtml = localStorage.getItem(pageHtmlKey);
            if (savedHtml) {
              setHtmlContent(savedHtml); // Apply the HTML content if available
            } else {
              console.error("No HTML content found for this page!");
            }

            // Fetch the CSS content directly as a string
            const savedCss = localStorage.getItem(pageCssKey);
            if (savedCss) {
              setCssContent(savedCss); // Apply the CSS content if available
            } else {
              console.error("No CSS content found for this page!");
            }
          } else {
            console.error("Page not found in this project!");
          }
        }
      });
    }
  }, [pageId]);

  return (
    <div>
      {pageContent ? (
        <>
          <Header />
          {/* Apply the CSS to the page */}
          {cssContent && <style>{cssContent}</style>}
          {/* Inject the HTML content */}
          <div
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          />
        </>
      ) : (
        <p>Page not found or loading failed. Please try again later.</p>
      )}
    </div>
  );
};

export default Preview;
