import * as React from "react";
import { PagesResultProps as OriginalPagesResultProps } from "@grapesjs/react";
import { BTN_CLS, MAIN_BORDER_COLOR, cx } from "./common";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

export default function CustomPageManager({
  pages,
  editor,
  select,
  add,
  remove,
}: any) {
  const addNewPage = () => {
    const nextIndex = pages.length + 1;
    add({
      name: `New page ${nextIndex}`,
      component: `<h1>Page content ${nextIndex}</h1>`,
    });
  };

  // React.useEffect(() => {
  //   if (editor && editor.Pages) {
  //     const pages = editor.Pages.getAll(); // Get all pages
  //     pages.forEach((page: any) => {
  //       console.log(page.name); // Access the 'name' property directly
  //       console.log(page.id); // Log the ID of each page
  //     });
  //   }
  // }, [editor]); // Only runs when editor is available

  return (
    <div className="gjs-custom-page-manager">
      <div className="p-2">
        <button type="button" className={BTN_CLS} onClick={addNewPage}>
          Add new page
        </button>
      </div>
      {pages.map((page: any, index: number) => (
        <div
          key={page.id} // Use page.id as the key
          className={cx(
            "flex items-center py-2 px-4 border-b",
            index === 0 && "border-t",
            MAIN_BORDER_COLOR
          )}
        >
          <button
            type="button"
            className="flex-grow text-left"
            onClick={() => select(page)}
          >
            {page.name || "Untitled page"} {/* Use page.name directly */}
          </button>
          <button type="button" onClick={() => remove(page)}>
            <Icon size={0.7} path={mdiDelete} />
          </button>
        </div>
      ))}
    </div>
  );
}
