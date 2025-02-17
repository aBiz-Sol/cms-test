import * as React from "react";
import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from "@grapesjs/react";
import {
  mdiBrush,
  mdiLayers,
  mdiViewGridPlus,
  mdiTextBoxMultiple,
  mdiCog,
} from "@mdi/js";
import Icon from "@mdi/react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import CustomBlockManager from "./CustomBlockManager";
import { MAIN_BORDER_COLOR, cx } from "./common";
import CustomPageManager from "./CustomPageManager";
import CustomLayerManager from "./CustomLayerManager";
import CustomSelectorManager from "./CustomSelectorManager";
import CustomStyleManager from "./CustomStyleManager";
import CustomTraitManager from "./CustomTraitManager";
import { AddOptions, Silenceable } from "backbone";
import {
  Page,
  SetOptions,
  PageProperties,
  SelectableOption,
  AbortOption,
} from "grapesjs";

const defaultTabProps = {
  className: "!min-w-0",
};

export default function RightSidebar({
  className,
  pages,
  editor,
  selectedPage,
  handleChangePage,
  addNewPage,
  handleRenamePage,
}: React.HTMLAttributes<HTMLDivElement> & {
  pages: any;
  selectedPage: any;
  editor: any;
  addNewPage: any;
  handleChangePage: any;
  handleRenamePage: any;
}) {
  // Set default selected tab to 3 (Pages tab)
  const [selectedTab, setSelectedTab] = useState(3);

  React.useEffect(() => {
    // Automatically select the Pages tab when the component mounts
    if (pages && selectedPage) {
      setSelectedTab(3); // Set tab to 'Pages' by default
    }
  }, [pages, selectedPage]);

  return (
    <div className={cx("gjs-right-sidebar flex flex-col", className)}>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        variant="fullWidth"
      >
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiBrush} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiCog} />} />
        <Tab {...defaultTabProps} label={<Icon size={1} path={mdiLayers} />} />
        <Tab
          {...defaultTabProps}
          label={<Icon size={1} path={mdiTextBoxMultiple} />}
        />
      </Tabs>
      <div
        className={cx("overflow-y-auto flex-grow border-t", MAIN_BORDER_COLOR)}
      >
        {selectedTab === 0 && (
          <>
            <SelectorsProvider>
              {(props) => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {(props) => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}
        {selectedTab === 1 && (
          <TraitsProvider>
            {(props) => <CustomTraitManager {...props} />}
          </TraitsProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {(props) => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
        {selectedTab === 3 && (
          <CustomPageManager
            pages={pages} // Pass pages here directly
            editor={editor} // Make sure editor is passed to CustomPageManager
            // select={selectPage}
            addNewPage={addNewPage}
            selectedPage={selectedPage}
            handleChangePage={handleChangePage}
            handleRenamePage={handleRenamePage}
          />
        )}
      </div>
    </div>
  );
}
