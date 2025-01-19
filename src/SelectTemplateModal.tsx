import React, { useState } from "react";
import TEMPLATES, { TEMPLATE_CATEGORIES } from "./core/Template.const";
import { useEditor } from "@grapesjs/react";
import { Button, Modal } from "@mui/material";

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
      className={
        "max-w-[1050px] bg-white w-full max-h-[580px] h-full rounded-3xl"
      }
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <div className="h-full w-full flex flex-col relative pr-[80px]">
        <Button
          variant="contained"
          onClick={() => setOpenModal(false)}
          className="absolute right-0 inline-block p-8 border-none"
        >
          ++
        </Button>
        <div className="flex items-center justify-center h-full">
          <div className="w-[30%] border-r-[1px] border-blue-207 h-full py-[80px] px-8">
            <Button
              variant={"contained"}
              className="flex gap-4 border-none text-gray-201"
              onClick={() => {
                const wrapper = editor.getWrapper();

                if (wrapper) {
                  wrapper.setStyle({
                    "background-color": "white",
                    "border-radius": "8px",
                  });
                }
                editor.setComponents("<div></div>");
              }}
            >
              + Add a Blank Template
            </Button>

            <hr className="bg-blue-207 my-7" />
            <h3 className="mb-6 text-xl font-bold text-blue-211">Templates</h3>
            <div className="flex flex-col gap-6">
              {Object.values(TEMPLATE_CATEGORIES).map((category) => {
                return (
                  <Button
                    onClick={() => {
                      setSelectedTab(category);
                    }}
                    variant="outlined"
                    className={
                      category === selectedTab
                        ? "rounded-xl py-2.5 bg-blue-211 text-white"
                        : "rounded-xl py-2.5 bg-transparent text-black hover:bg-blue-211 hover:text-white"
                    }
                    key={"category"}
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="w-full h-full px-16 py-20">
            <div className="grid grid-cols-2 gap-4 space-x-2">
              {TEMPLATES[selectedTab].map((template, index) => (
                <Button
                  variant="outlined"
                  key={index}
                  className="hover:bg-white/70 flex border-none p-0 gap-3 flex-col items-center max-w-[279px] "
                  onClick={() => {
                    const wrapper = editor.getWrapper();
                    if (wrapper) {
                      wrapper.setStyle({
                        "background-color": template.backgroundColor,
                        "border-radius": "8px",
                      });
                    }
                    editor.setComponents(template.components);
                    //editor.setStyle(template.style);
                  }}
                >
                  <img
                    src={template.thumbnail}
                    className="w-full h-[176px] rounded-3xl overflow-hidden"
                  />
                  <div>{template.heading}</div>
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
