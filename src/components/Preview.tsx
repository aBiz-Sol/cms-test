import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";

const Preview = () => {
  const { pageId } = useParams();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [cssContent, setCssContent] = useState<string>("");
  const [pageContent, setPageContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    if (pageId) {
      setLoading(true); // Start loading

      setTimeout(() => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("gjsProject-")) {
            const savedProjectData = localStorage.getItem(key);

            if (!savedProjectData) {
              console.error(`No project data found for key: ${key}`);
              return;
            }

            let projectData = {} as any;

            try {
              projectData = JSON.parse(savedProjectData);
            } catch (error) {
              console.error(`Failed to parse JSON for key ${key}:`, error);
              return;
            }

            const page = projectData.pages?.find((p: any) => p.id === pageId);

            if (page) {
              setPageContent(page);

              const projectId = projectData.id;
              const pageHtmlKey = `gjsProject-${projectId}-page-${pageId}-html`;
              const pageCssKey = `gjsProject-${projectId}-page-${pageId}-css`;

              const savedHtml = localStorage.getItem(pageHtmlKey);
              if (savedHtml) {
                setHtmlContent(savedHtml);
              } else {
                console.error("No HTML content found for this page!");
              }

              const savedCss = localStorage.getItem(pageCssKey);
              if (savedCss) {
                setCssContent(savedCss);
              } else {
                console.error("No CSS content found for this page!");
              }

              setLoading(false); // Stop loading once content is set
              return;
            }
          }
        });

        setLoading(false); // Stop loading if no page is found
      }, 1000); // Simulate a slight delay for better UX
    }
  }, [pageId]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loader">
            <Loader />
          </span>
        </div>
      ) : pageContent ? (
        <>
          <Header />
          {cssContent && <style>{cssContent}</style>}
          <div
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          />
        </>
      ) : (
        <p className="text-center text-red-500">Page not found.</p>
      )}
    </div>
  );
};

export default Preview;
