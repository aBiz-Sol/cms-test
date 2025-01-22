import * as React from "react";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  WithEditor,
  ModalProvider,
} from "@grapesjs/react";
import type { Editor, EditorConfig } from "grapesjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MAIN_BORDER_COLOR } from "./components/common";
import CustomModal from "./components/CustomModal";
import CustomAssetManager from "./components/CustomAssetManager";
import Topbar from "./components/Topbar";
import RightSidebar from "./components/RightSidebar";
import "./style.css";
import { BlockCategory, WIDGET_BLOCK } from "./core/Blocks.const";
import LoadOverrides from "./components/Overrides";
import LeftSidebar from "./components/LeftSidebar";
import Template from "./Template";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { projectId } = useParams();
  console.log(projectId);
  const navigate = useNavigate();
  const [pages, setPages] = React.useState<any[]>([]);
  const [editorInstance, setEditorInstance] = React.useState<Editor | null>(
    null
  );

  const gjsOptions: EditorConfig = {
    height: "100vh",
    storageManager: {
      type: "local",
    },
    undoManager: { trackSelection: false },
    selectorManager: { componentFirst: true },
    blockManager: {
      custom: true,
      blocks: [
        ...WIDGET_BLOCK.map((wid) => ({
          ...wid,
          category: BlockCategory.WidgetBlock,
        })),
      ],
    },
    canvas: {
      scripts: ["https://cdn.tailwindcss.com"],
      styles: ["./style.css"],
    },
    style: "body { background-color: #000000; }",
    // projectData: {
    //   assets: [
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABA_u6Dih7mxnm56-hIy2JQ5t7D05TvzwQQ&s",
    //     "https://via.placeholder.com/350x250/459ba8/fff",
    //     "https://via.placeholder.com/350x250/79c267/fff",
    //     "https://via.placeholder.com/350x250/c5d647/fff",
    //     "https://via.placeholder.com/350x250/f28c33/fff",
    //   ],
    //   content: "<h1>GrapesJS React Custom UI</h1>",
    //   // pages: [
    //   //   {
    //   //     name: "Home page",
    //   //     component: `<h1>GrapesJS React Custom UI</h1>`,
    //   //   },
    //   // ],
    // },
  };
  const onEditor = (editor: Editor) => {
    console.log("Editor loaded");
    (window as any).editor = editor;
    setEditorInstance(editor);

    // Load the project data based on projectId
    const savedData = localStorage.getItem(`gjsProject-${projectId}`);
    if (savedData) {
      const projectData = JSON.parse(savedData);
      console.log("projectData loaded", projectData);
      const loadedPages = projectData.pages || [];
      setPages(loadedPages);

      // Load the components for the selected page
      const selectedPage = projectData.pages?.find(
        (page: any) => page.name === "Home page"
      );
      if (selectedPage) {
        // Ensure that selectedPage.frames is available and properly formatted
        const frames = selectedPage.frames || [];
        if (frames.length > 0) {
          // Pass the components from the frames to the editor
          const pageComponents = frames.map((frame: any) => frame.component);
          editor.setComponents(pageComponents);
        }
      }

      // Load styles (if any)
      if (projectData?.styles) {
        console.log("Applying styles:", projectData.styles);
        editor.setStyle(projectData.styles);
      }

      // Load assets (if any)
      if (projectData?.assets) {
        console.log("Adding assets:", projectData.assets);
        projectData.assets.forEach((asset: string) => {
          editor.AssetManager.add(asset);
        });
      }
    } else {
      console.log("No project data found for this projectId:", projectId);
    }
    const wrapper = editor.getWrapper();
    // Get the HTML and CSS from the editor
    if (wrapper) {
      // Clear existing components
      editor.DomComponents.clear();
    }

    const htmlContent = editor.getHtml(); // Get the HTML content
    const cssContent = editor.getCss(); // Get the CSS styles

    // Log the HTML and CSS content to the console
    console.log("HTML Content:", htmlContent);
    console.log("CSS Content:", cssContent);
    editor.setComponents(htmlContent);
    editor.setStyle(cssContent);
  };

  const handleSaveClick = () => {
    const editor = (window as any).editor;
    if (editor) {
      saveTemplate(editor);
    }
  };

  const saveTemplate = (editor: Editor) => {
    const projectData = editor.getProjectData();
    localStorage.setItem(
      `gjsProject-${projectId}`,
      JSON.stringify(projectData)
    );
    console.log("Template saved:", projectData);
  };
  console.log("--------", pages);
  return (
    <ThemeProvider theme={theme}>
      <GjsEditor
        className="gjs-custom-editor text-white bg-[#454545]"
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: "gjs-blocks-basic",
            src: "https://unpkg.com/grapesjs-blocks-basic",
          },
          {
            id: "grapesjs-rulers",
            src: "https://unpkg.com/grapesjs-rulers",
          },
          LoadOverrides,
        ]}
        onEditor={onEditor}
      >
        <Topbar className="min-h-[48px] bg-[#555]" />
        <div className="save-button-container">
          <button onClick={handleSaveClick} className="save-button">
            Save Template
          </button>
        </div>

        <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
          <RightSidebar
            editor={editorInstance}
            pages={pages}
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
          <div className="flex flex-col flex-grow gjs-column-m">
            <WithEditor>
              <Template />
            </WithEditor>
            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
          <LeftSidebar
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
        </div>
        <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider>
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider>
      </GjsEditor>
    </ThemeProvider>
  );
};

export default App;
