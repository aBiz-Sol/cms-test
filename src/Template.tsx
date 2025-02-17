import { useEditor } from "@grapesjs/react";
import React, { useState, useEffect } from "react";
import SelectTemplateModal from "./SelectTemplateModal";

const Template = () => {
  const editor = useEditor();

  const [draggingStart, setDraggingStart] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [componentsAdded, setComponentsAdded] = useState(false);

  const setVisibleSection = () => {
    const wrapper = editor?.getWrapper();

    if (wrapper && wrapper?.components?.()?.length >= 1) {
      setComponentsAdded(true);
    } else {
      setComponentsAdded(false);
    }
  };

  useEffect(() => {
    setVisibleSection();
    const setDragging = () => {
      setVisibleSection();
      setDraggingStart(true);
    };
    const endDragging = () => {
      setVisibleSection();
      setDraggingStart(false);
    };
    editor.on("block:drag:start", setDragging);
    editor.on("block:drag:stop", endDragging);
    editor.on("component:add", setVisibleSection);
    editor.on("component:remove", setVisibleSection);

    return () => {
      editor.off("component:add", setVisibleSection);
      editor.off("component:remove", setVisibleSection);
      editor.off("block:drag:start", setDragging);
      editor.off("block:drag:stop", endDragging);
    };
  }, [editor]);

  return (
    <div>
      {draggingStart || componentsAdded ? null : (
        <div
          key="empty-section"
          className=" absolute h-[calc(100vh-72px)] mx-auto z-10  p-6 flex flex-col items-center justify-center w-3/4 gap-4 "
        >
          <h1 className="text-2xl font-bold text-gray-700">
            This Page is Empty
          </h1>
          <p className="text-center text-gray-500">
            Add a page from a template, <br />
            or drag blocks from the right panel.
          </p>
          <button
            className="px-6 py-3 font-semibold text-white transition-all bg-[#10BAAC] rounded-lg shadow-lg hover:bg-blue-600"
            onClick={() => {
              const components = editor.getHtml();
              const style = editor.getCss();
              console.log(components, style);
              setOpenModal(true);
            }}
          >
            + Add a Page
          </button>
        </div>
      )}
      <SelectTemplateModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Template;
