import React, { useState } from "react";
import TEMPLATES, { TEMPLATE_CATEGORIES } from "./core/Template.const";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "@mui/material";
import { useEditor } from "@grapesjs/react";

export interface SelectTemplateModalProps {
  openModal: boolean;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
}

const SelectTemplateModal = ({
  openModal,
  setOpenModal,
}: SelectTemplateModalProps) => {
  const [selectedTab, setSelectedTab] = useState(
    TEMPLATE_CATEGORIES.PERSONAL_PAGES
  );
  const editor = useEditor();

  return (
    <Modal
      open={openModal}
      className="flex items-center justify-center px-4"
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <div className="bg-white w-full max-w-[1050px] max-h-[580px] h-full rounded-3xl shadow-lg p-6 relative overflow-hidden">
        {/* Close Button */}
        <Button
          variant="contained"
          onClick={() => setOpenModal(false)}
          className="absolute px-4 py-2 text-white bg-red-500 rounded-lg top-4 right-4 hover:bg-red-600"
        >
          ✖
        </Button>

        <div className="flex h-full">
          {/* Sidebar for Template Categories */}
          <div className="w-[30%] border-r border-gray-200 h-full py-6 px-4">
            <Button
              variant="contained"
              className="w-full py-3 mb-6 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
              onClick={() => {
                const wrapper = editor.getWrapper();
                if (wrapper) {
                  // Clear existing components
                  editor.DomComponents.clear();

                  // Set wrapper styles
                  wrapper.setStyle({
                    "background-color": "#ffffff",
                    "border-radius": "8px",
                    padding: "20px",
                    "min-height": "400px", // Ensures the blank template is visible
                  });

                  // Add a blank container component
                  editor.setComponents([
                    {
                      type: "text",
                      content: "Your blank template is ready!",
                      style: {
                        "text-align": "center",
                        "font-size": "20px",
                        color: "#333",
                        "margin-top": "100px",
                      },
                    },
                  ]);
                }
              }}
            >
              + Add a Blank Template
            </Button>

            <hr className="my-6 border-gray-300" />
            <h3 className="mb-4 text-lg font-bold text-gray-700">Templates</h3>
            <div className="flex flex-col gap-4">
              {Object.values(TEMPLATE_CATEGORIES).map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedTab(category)}
                  variant="outlined"
                  className={`py-2 rounded-lg ${
                    category === selectedTab
                      ? "bg-blue-500 text-white"
                      : "bg-transparent text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Template Previews */}
          <div className="w-[70%] h-full px-8 py-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
              {TEMPLATES[selectedTab].map((template, index) => (
                <Button
                  variant="outlined"
                  key={index}
                  className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-lg"
                  onClick={() => {
                    const wrapper = editor.getWrapper();
                    if (wrapper) {
                      wrapper.setStyle({
                        "background-color": template.backgroundColor,
                        "border-radius": "8px",
                      });
                    }
                    editor.setComponents(template.components);
                    setOpenModal(false);
                    // editor.setStyle(template.style);
                  }}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.heading}
                    className="w-full h-[176px] rounded-lg object-cover"
                  />
                  <div className="font-medium text-gray-700">
                    {template.heading}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectTemplateModal;
