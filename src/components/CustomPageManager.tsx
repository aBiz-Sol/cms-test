import * as React from "react";
import { PagesResultProps as OriginalPagesResultProps } from "@grapesjs/react";
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from "./common";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

export default function CustomPageManager({
  pages,
  editor,
  handleChangePage,
  selectedPage,
  addNewPage,
  handleRenamePage,
}: any) {
  return (
    <div className="gjs-custom-page-manager">
      {pages.map((page: any, index: number) => (
        <div
          key={page.id} // Use page.id as the key
          onClick={() => handleChangePage(page)}
          className={cx(
            "flex items-center py-2 px-4 border-b",
            index === 0 && "border-t",
            MAIN_BORDER_COLOR
          )}
          style={{
            cursor: "pointer",
            fontWeight: selectedPage?.name === page.name ? "bold" : "normal",
          }}
        >
          <button type="button" className="flex-grow text-left">
            {page.name || "Untitled page"} {/* Use page.name directly */}
          </button>

          <button
            type="button"
            onClick={() => handleRenamePage(page)} // Trigger the rename logic
          >
            Rename
          </button>
        </div>
      ))}
    </div>
  );
}
