import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<any>(null);

  // Load templates from localStorage
  useEffect(() => {
    const loadedTemplates = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("gjsProject-")) {
          const projectData = localStorage.getItem(key);
          if (projectData) {
            try {
              const parsedData = JSON.parse(projectData);
              const templateName =
                parsedData?.pages?.[0]?.name || `Unnamed Project ${key}`;
              loadedTemplates.push({
                id: key.split("-")[1],
                name: templateName,
              });
            } catch (error) {
              console.error("Error parsing project data:", error);
            }
          }
        }
      }
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setLoading(false);
  }, []);
  const addNewTemplate = () => {
    const newTemplateName = prompt("Enter the name for the new template:");
    if (!newTemplateName) return; // If user cancels or doesn't provide a name, do nothing.

    const newTemplate = {
      id: Date.now(),
      name: newTemplateName, // Set the name of the template
      pages: [
        {
          id: Date.now(),
          name: "Home page", // Default page name
          frames: [],
          styles: [],
          assets: [],
        },
      ],
    };

    // Save the new template (template can contain multiple pages)
    localStorage.setItem(
      `gjsTemplate-${newTemplate.id}`,
      JSON.stringify(newTemplate)
    );

    // Optionally, you can update the state for templates if you are keeping a list of templates
    setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);

    // Automatically navigate to the newly created template (optional)
    navigate(`/builder/${newTemplate.id}`);
  };

  const handleTemplateClick = (id: string) => {
    navigate(`/builder/${id}`); // Navigate to the builder page with projectId

    // After navigating, load the first page by default
    const savedData = localStorage.getItem(`gjsProject-${id}`);
    if (savedData) {
      const projectData = JSON.parse(savedData);
      const firstPage = projectData.pages?.[0]; // Get the first page of the project
      if (firstPage) {
        // Set the first page as the selected one
        setSelectedPage(firstPage);
      }
    }
  };

  if (loading) {
    return <div>Loading templates...</div>;
  }
  console.log("------------selected", templates);
  return (
    <div>
      <button onClick={addNewTemplate}>Create New Template</button>
      <h1>Templates</h1>
      <ul>
        {templates.length > 0 ? (
          templates.map((template) => (
            <li key={template.id}>
              <button
                onClick={() => handleTemplateClick(template.id)}
                style={{
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
          ))
        ) : (
          <li>No templates found. Add a new template!</li>
        )}
      </ul>
    </div>
  );
};

export default Templates;
