import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all projects/templates from localStorage
  useEffect(() => {
    const loadedTemplates = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("gjsProject-")) {
          const projectData = localStorage.getItem(key);
          console.log("projectData", projectData);
          if (projectData) {
            try {
              const parsedData = JSON.parse(projectData);
              // Use the template's name property instead of the first page's name
              const templateName = parsedData?.name || `Unnamed Project ${key}`;
              loadedTemplates.push({
                id: key.replace("gjsProject-", ""),
                name: templateName,
              });
            } catch (error) {
              console.error("Error parsing project data:", error);
            }
          }
        }
      }
      console.log("Loaded templates:", loadedTemplates);
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setLoading(false);
  }, []);

  // Create a new template (project with predefined content)
  const addNewTemplate = () => {
    const newTemplateName = prompt("Enter the name for the new template:");
    if (!newTemplateName) return;

    const newTemplate = {
      id: Date.now().toString(), // Unique ID
      name: newTemplateName, // Use the template's name property
      pages: [
        {
          id: "page1",
          name: "Home Page",
          frames: [{ component: [] }], // Ensure frames is an array with a component property
          styles: [],
          assets: [],
        },
      ],
    };

    // Save the new template/project
    localStorage.setItem(
      `gjsProject-${newTemplate.id}`,
      JSON.stringify(newTemplate)
    );

    // Update the templates list
    setTemplates((prev) => [...prev, newTemplate]);

    // Navigate to the new template/project
    navigate(`/builder/${newTemplate.id}`);
  };

  // Handle template/project selection
  const handleTemplateClick = (id: string) => {
    navigate(`/builder/${id}`);
  };

  if (loading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div>
      <button onClick={addNewTemplate}>Create New Template</button>
      <h1>Templates</h1>
      <ul>
        {templates.length > 0 ? (
          templates.map((template: { id: any; name: any }) => {
            console.log(template);
            return (
              <li key={template.id}>
                <button
                  onClick={() => handleTemplateClick(template.id as string)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {template.name}
                </button>
              </li>
            );
          })
        ) : (
          <li>No templates found. Add a new template!</li>
        )}
      </ul>
    </div>
  );
};

export default Templates;
