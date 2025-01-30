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
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewContent, setPreviewContent] = React.useState({
    html: "",
    css: "",
  });
  const [editorInstance, setEditorInstance] = React.useState<Editor | null>(
    null
  );
  const [selectedPage, setSelectedPage] = React.useState<any>(null);
  React.useEffect(() => {
    // Load pages from localStorage when the component mounts
    const savedData = localStorage.getItem(`gjsProject-${projectId}`);
    if (savedData) {
      const projectData = JSON.parse(savedData);
      const loadedPages = projectData.pages || [];
      setPages(loadedPages);

      // Set the first page as the selected page
      if (loadedPages.length > 0) {
        const firstPage = loadedPages[0];
        setSelectedPage(firstPage);

        // Load the first page's components into the editor
        if (editorInstance && firstPage) {
          loadPageContent(firstPage, editorInstance);
        }
      }
    }
  }, [projectId, editorInstance]); // Add editorInstance as dependency to ensure it's ready

  const gjsOptions: EditorConfig = {
    height: "100vh",
    storageManager: {
      type: "local",
      autosave: true,
      autoload: false,
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
    projectData: {
      assets: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABA_u6Dih7mxnm56-hIy2JQ5t7D05TvzwQQ&s",
        "https://via.placeholder.com/350x250/459ba8/fff",
        "https://via.placeholder.com/350x250/79c267/fff",
        "https://via.placeholder.com/350x250/c5d647/fff",
        "https://via.placeholder.com/350x250/f28c33/fff",
      ],
    },
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
    editor.DomComponents.addType("header", {
      isComponent: (el) => el.tagName === "HEADER",
      model: {
        defaults: {
          editable: false, // Prevent editing
          draggable: true, // Allow dragging
          droppable: true, // Prevent dropping other components inside
          attributes: { class: "non-editable-header" }, // Add a class for styling
        },
      },
    });

    // Load the project data based on projectId
    const savedData = localStorage.getItem(`gjsProject-${projectId}`);
    if (savedData) {
      const projectData = JSON.parse(savedData);
      console.log("projectData loaded", projectData);
      const loadedPages = projectData.pages || [];
      setPages(loadedPages);

      const initialPage = projectData.pages?.find(
        (page: any) => page.name === "Home page"
      );
      setSelectedPage(initialPage);
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
  const addNewPage = () => {
    const newPage = {
      id: Date.now(),
      name: `Page ${pages.length + 1}`,
      frames: [],
      styles: [],
      assets: [],
    };

    setPages((prevPages) => {
      const updatedPages = [...prevPages, newPage];
      // Save to localStorage
      const projectData = { pages: updatedPages };
      localStorage.setItem(
        `gjsProject-${projectId}`,
        JSON.stringify(projectData)
      );
      return updatedPages;
    });

    setSelectedPage(newPage);
  };

  const loadPageContent = (page: any, editor: Editor) => {
    editor.DomComponents.clear(); // Clear any existing components

    // Ensure that frames is an array before using it
    const frames = page.frames || [];

    editor.setComponents(frames.map((frame: any) => frame.component || "")); // Set components
    editor.setStyle(page.styles || []); // Set styles

    // Ensure assets are loaded when switching pages
    page.assets.forEach((asset: string) => {
      editor.AssetManager.add(asset); // Add each asset to the editor
    });
  };

  const handleChangePage = (page: any) => {
    setSelectedPage(page);
    if (editorInstance) {
      loadPageContent(page, editorInstance);
    }
  };
  const savePages = (updatedPages: any[]) => {
    setPages(updatedPages);
    const projectData = { pages: updatedPages };
    localStorage.setItem(
      `gjsProject-${projectId}`,
      JSON.stringify(projectData)
    );
  };

  const saveTemplate = (editor: Editor) => {
    if (!selectedPage) {
      console.error("No page selected to save!");
      return;
    }

    const components = editor.getComponents();
    const styles = editor.getStyle();
    const assets = editor.AssetManager.getAll().map(
      (asset: { attributes: { src: any } }) => asset.attributes.src
    );

    // Always refer to the latest pages state
    setPages((prevPages) => {
      const updatedPages = prevPages.map((page) =>
        page.id === selectedPage.id
          ? { ...page, frames: [{ component: components }], styles, assets }
          : page
      );

      // Save to localStorage
      const projectData = { pages: updatedPages };
      localStorage.setItem(
        `gjsProject-${projectId}`,
        JSON.stringify(projectData)
      );
      return updatedPages;
    });
    console.log("Template saved for page:", selectedPage.name);
  };

  const handleRenamePage = (page: any) => {
    const newPageName = prompt("Enter a new name for the page:", page.name);
    if (newPageName && newPageName !== page.name) {
      const updatedPages = pages.map((p) =>
        p.id === page.id ? { ...p, name: newPageName } : p
      );
      setPages(updatedPages);

      // Save updated page name in localStorage
      const projectData = { pages: updatedPages };
      localStorage.setItem(
        `gjsProject-${projectId}`,
        JSON.stringify(projectData)
      );
    }
  };
  if (editorInstance) {
    editorInstance.on("run:preview", () => {
      // Get HTML and CSS content from the editor
      const htmlContent = editorInstance.getHtml();
      const cssContent = editorInstance.getCss();

      if (!htmlContent || !cssContent) {
        console.error("HTML or CSS content missing!");
        return;
      }

      // Navigate to the preview route with HTML and CSS as state
      navigate("/preview", {
        state: { html: htmlContent, css: cssContent },
      });
    });
  }

  const renderPublishedTemplate = (projectId: string) => {
    if (editorInstance) {
      const pages = editorInstance.Pages;

      const selectedPage = pages.getSelected();
      if (!selectedPage) {
        console.error("No selected page to render!");
        return;
      }

      const html = editorInstance.getHtml();
      const css = editorInstance.getCss();

      if (!html || !css) {
        console.error("HTML or CSS content missing!");
        return;
      }

      // Add the JavaScript to handle dropdown toggle in the preview
      const script = `
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            const dropdownBtn = document.getElementById('dropdownNavbarLink');
            const dropdownMenu = document.getElementById('dropdownNavbar');
            if (dropdownBtn && dropdownMenu) {
              dropdownBtn.addEventListener('click', function() {
                dropdownMenu.classList.toggle('hidden');
              });
            }
          });
        </script>
      `;

      // Combine the HTML, CSS, and the new script
      const renderedTemplate = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>${html}</body>
          ${script}
        </html>
      `;

      const newWindow = window.open();
      newWindow?.document.write(renderedTemplate);
      newWindow?.document.close();
    } else {
      console.error("Editor instance not found!");
    }
  };

  const handleRenderClick = () => {
    if (projectId) {
      renderPublishedTemplate(projectId);
    }
  };

  console.log("Selected page:", selectedPage);
  console.log("Pages array:", pages);
  console.log(
    "Editor components:",
    editorInstance ? editorInstance.getComponents() : "Editor instance is null"
  );
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
        waitReady
        onEditor={onEditor}
      >
        <Topbar className="min-h-[48px] bg-[#555]" />
        <button onClick={handleRenderClick} className="render-button">
          Render Template
        </button>
        <div className="save-button-container">
          <button onClick={handleSaveClick} className="save-button">
            Save Template
          </button>
        </div>
        <button onClick={() => editorInstance?.runCommand("preview")}>
          Preview Template
        </button>

        <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
          <RightSidebar
            editor={editorInstance}
            addNewPage={addNewPage}
            handleRenamePage={handleRenamePage}
            pages={pages}
            handleChangePage={handleChangePage}
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
            selectedPage={selectedPage}
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
