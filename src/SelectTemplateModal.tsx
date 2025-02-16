import React, { useState } from "react";
import TEMPLATES, { TEMPLATE_CATEGORIES } from "./core/Template.const";
import {
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEditor } from "@grapesjs/react";

export interface SelectTemplateModalProps {
  openModal: boolean;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
}

const SelectTemplateModal = ({
  openModal,
  setOpenModal,
}: SelectTemplateModalProps) => {
  const [selectedTab] = useState(TEMPLATE_CATEGORIES.PERSONAL_PAGES);
  const editor = useEditor();

  return (
    <Dialog
      open={openModal}
      onClose={() => setOpenModal(false)}
      maxWidth="md"
      fullWidth
    >
      {/* Modal Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Select a Page</Typography>
        <IconButton onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
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
              }}
            >
              <img
                src={template.thumbnail}
                alt={template.heading}
                className="w-full h-[176px] rounded-lg object-cover"
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {template.heading}
              </Typography>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectTemplateModal;
