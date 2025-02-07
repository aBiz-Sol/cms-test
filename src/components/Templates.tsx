import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all projects/templates from localStorage
  useEffect(() => {
    const loadedTemplates: { id: string; name: string; pages: any }[] = [];

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("gjsProject-")) {
          const projectData = localStorage.getItem(key);

          if (projectData) {
            try {
              const parsedData = JSON.parse(projectData);
              const templateName = parsedData?.name || `Unnamed Project ${key}`;
              loadedTemplates.push({
                id: key.replace("gjsProject-", ""),
                name: templateName,
                pages: parsedData?.pages || [],
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
      name: newTemplateName, // Template name
      pages: [
        {
          id: "home",
          name: "Home",
          frames: [{ component: [] }],
          styles: [],
          assets: [],
        },
        {
          id: "contact",
          name: "Contact",
          frames: [{ component: [] }],
          styles: [],
          assets: [],
        },
        {
          id: "pricing",
          name: "Pricing",
          frames: [{ component: [] }],
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

    // Navigate to the new template/project builder
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
      <Header />
      <button
        onClick={addNewTemplate}
        style={{
          margin: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Create New Template
      </button>

      <h1>Templates</h1>
      <ul>
        {templates.length > 0 ? (
          templates.map((template) => (
            <li key={template.id}>
              <button
                onClick={() => handleTemplateClick(template.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
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
