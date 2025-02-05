import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Preview = () => {
  const { pageId } = useParams(); // Get the pageId from the URL
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [cssContent, setCssContent] = useState<string>("");
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
            return; // Skip this project if parsing fails
          }

          const page = projectData.pages?.find((p: any) => p.id === pageId);

          if (page) {
            setPageContent(page);

            const projectId = projectData.id;
            const pageHtmlKey = `gjsProject-${projectId}-page-${pageId}-html`;
            const pageCssKey = `gjsProject-${projectId}-page-${pageId}-css`;

            const savedHtml = localStorage.getItem(pageHtmlKey);
            const savedCss = localStorage.getItem(pageCssKey);

            if (savedHtml) {
              setHtmlContent(savedHtml); // Apply the HTML content if available
            } else {
              console.error("No HTML content found for this page!");
            }

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
      <h1>Preview Template</h1>
      {pageContent ? (
        <>
          <h2>{pageContent.name}</h2>
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
        <p>Loading content...</p>
      )}
    </div>
  );
};

export default Preview;
