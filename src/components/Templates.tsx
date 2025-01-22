import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<any[]>([]);

  // Load templates from localStorage
  useEffect(() => {
    const loadedTemplates = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("gjsProject-")) {
        const projectData = localStorage.getItem(key);
        if (projectData) {
          try {
            const parsedData = JSON.parse(projectData);
            const templateName =
              parsedData?.pages?.[0]?.name || `Unnamed Project ${key}`;
            loadedTemplates.push({ id: key.split("-")[1], name: templateName });
          } catch (error) {
            console.error("Error parsing project data:", error);
          }
        }
      }
    }
    setTemplates(loadedTemplates);
  }, []);

  const handleTemplateClick = (id: any) => {
    navigate(`/builder/${id}`); // Navigate to the builder page with projectId
  };

  return (
    <div>
      <h1>Templates</h1>
      <ul>
        {templates.length > 0 ? (
          templates.map((template) => (
            <li key={template.id}>
              <button onClick={() => handleTemplateClick(template.id)}>
                {template.name}
              </button>
            </li>
          ))
        ) : (
          <li>No templates found</li>
        )}
      </ul>
    </div>
  );
};

export default Templates;
