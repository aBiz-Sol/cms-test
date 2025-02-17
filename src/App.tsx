import * as React from "react";
import GjsEditor, {
  AssetsProvider,
  Canvas,
  WithEditor,
  ModalProvider,
} from "@grapesjs/react";
import type { Editor, EditorConfig } from "grapesjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MAIN_BORDER_COLOR, sampleAssets } from "./components/common";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [pages, setPages] = React.useState<any[]>([]);
  const [editorInstance, setEditorInstance] = React.useState<Editor | null>(
    null
  );
  const [selectedPage, setSelectedPage] = React.useState<any>(null);

  React.useEffect(() => {
    if (projectId) {
      const savedData = localStorage.getItem(`gjsProject-${projectId}`);
      if (savedData) {
        const projectData = JSON.parse(savedData);
        setPages(projectData.pages || []);
        if (projectData.pages?.length > 0) {
          const firstPage = projectData.pages[0];
          setSelectedPage(firstPage); // Set selected page after loading
        }
      }
    }
  }, [projectId]);

  React.useEffect(() => {
    if (selectedPage && editorInstance) {
      loadPageContent(selectedPage); // Ensure page content loads after selection
    }
  }, [selectedPage, editorInstance]);

  const gjsOptions: EditorConfig = {
    height: "100vh",
    storageManager: {
      type: "local",
      autosave: false,
      autoload: false,
    },
    assetManager: {
      assets: sampleAssets, // Add sample assets here
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
      scripts: [
        "https://cdn.tailwindcss.com",
        "https://cdn.jsdelivr.net/npm/flowbite@1.4.6/dist/flowbite.min.js",
      ],
      styles: ["./style.css"],
    },
    style: "body { background-color: #000000; }",
  };

  const onEditor = (editor: Editor) => {
    console.log("Editor loaded");
    (window as any).editor = editor;
    setEditorInstance(editor);
    editor.AssetManager.add(sampleAssets);

    // Load the project data based on projectId
    const savedData = localStorage.getItem(`gjsProject-${projectId}`);
    if (savedData) {
      const projectData = JSON.parse(savedData);
      const loadedPages = projectData.pages || [];
      setPages(loadedPages);

      const initialPage = projectData.pages[0];
      setSelectedPage(initialPage);

      // Load components, styles, and assets for the editor instance
      loadPageContent(initialPage);
    }

    editor.DomComponents.addType("header", {
      isComponent: (el) => el.tagName === "HEADER",
      model: {
        defaults: {
          editable: false, // Prevent editing
          draggable: true, // Allow dragging
          droppable: true, // Prevent dropping other components inside
          attributes: { class: "non-editable-header" },
        },
      },
    });
  };

  const handleSaveClick = () => {
    const editor = (window as any).editor;
    if (editor) {
      saveTemplate(editor);
      toast.success("Template saved successfully 🚀");
    }
  };

  const saveProject = (updatedPages: any[]) => {
    if (projectId) {
      const projectData = { id: projectId, pages: updatedPages };
      localStorage.setItem(
        `gjsProject-${projectId}`,
        JSON.stringify(projectData)
      );
    }
  };

  const addNewPage = () => {
    const newPage = {
      id: Date.now().toString(),
      name: `Page ${pages.length + 1}`,
      frames: [],
      styles: [],
      assets: [],
    };

    const existingTemplateData = localStorage.getItem(
      `gjsProject-${projectId}`
    );

    let updatedPages;
    if (!existingTemplateData) {
      const newProjectData = {
        id: projectId,
        name: `Project ${projectId}`,
        pages: [newPage],
      };
      localStorage.setItem(
        `gjsProject-${projectId}`,
        JSON.stringify(newProjectData)
      );
      updatedPages = [newPage];
    } else {
      let parsedTemplateData;
      try {
        parsedTemplateData = JSON.parse(existingTemplateData);
      } catch (error) {
        console.error("Error parsing template data:", error);
        return;
      }

      updatedPages = [...pages, newPage];
      const projectData = {
        id: parsedTemplateData.id,
        name: parsedTemplateData.name,
        pages: updatedPages,
      };
      localStorage.setItem(
        `gjsProject-${projectId}`,
        JSON.stringify(projectData)
      );
    }

    setPages(updatedPages);
    setSelectedPage(newPage);
    toast.success("New page added successfully!");
  };

  const loadPageContent = (page: any) => {
    if (editorInstance) {
      const currentComponents = editorInstance.getComponents();
      const currentStyles = editorInstance.getStyle();
      const currentAssets = editorInstance.AssetManager.getAll().map(
        (asset: { attributes: { src: any } }) => asset.attributes.src
      );

      if (
        JSON.stringify(currentComponents) !==
          JSON.stringify(page.frames?.[0]?.component) ||
        JSON.stringify(currentStyles) !== JSON.stringify(page.styles) ||
        JSON.stringify(currentAssets) !== JSON.stringify(page.assets)
      ) {
        editorInstance.DomComponents.clear();

        const components = page.frames?.[0]?.component || [];
        editorInstance.setComponents(components);

        const styles = page.styles || [];
        editorInstance.setStyle(styles);

        page.assets.forEach((asset: string) => {
          editorInstance.AssetManager.add(asset);
        });
      }
    } else {
      console.error("Editor instance is not available!");
    }
  };

  const handleChangePage = (page: any) => {
    setSelectedPage(page);
    if (editorInstance) {
      loadPageContent(page);
    }
  };

  const saveTemplate = (editor: Editor) => {
    if (!selectedPage) {
      toast.error("No page selected to save!"); // Error toast
      console.error("No page selected to save!");
      return;
    }

    const components = editor.getComponents();
    const styles = editor.getStyle();
    const assets = editor.AssetManager.getAll().map(
      (asset: { attributes: { src: any } }) => asset.attributes.src
    );

    // Get existing project data from localStorage
    const existingTemplateData = localStorage.getItem(
      `gjsProject-${projectId}`
    );
    if (!existingTemplateData) {
      toast.error("No existing template found in localStorage."); // Error toast
      console.error("No existing template found in localStorage.");
      return;
    }

    let parsedTemplateData;
    try {
      parsedTemplateData = JSON.parse(existingTemplateData);
    } catch (error) {
      console.error("Error parsing template data:", error);
      toast.error("Error parsing template data!"); // Error toast
      return;
    }

    // Update the content of the selected page
    const updatedPages = pages.map((page) =>
      page.id === selectedPage.id
        ? { ...page, frames: [{ component: components }], styles, assets }
        : page
    );

    // Save the updated project data back to localStorage
    const projectData = {
      id: parsedTemplateData.id,
      name: parsedTemplateData.name,
      pages: updatedPages,
    };

    localStorage.setItem(
      `gjsProject-${projectId}`,
      JSON.stringify(projectData)
    );
    toast.success("Template saved for page!"); // Success toast
    console.log("Template saved for page:", selectedPage.name);
  };

  const handleRenamePage = (page: any) => {
    const newPageName = prompt("Enter a new name for the page:", page.name);

    if (newPageName && newPageName !== page.name) {
      const updatedPages = pages.map((p) =>
        p.id === page.id ? { ...p, name: newPageName } : p
      );
      setPages(updatedPages);

      const existingTemplateData = localStorage.getItem(
        `gjsProject-${projectId}`
      );
      if (!existingTemplateData) {
        console.error("No existing project data found in localStorage.");
        return;
      }

      let parsedTemplateData;
      try {
        parsedTemplateData = JSON.parse(existingTemplateData);
      } catch (error) {
        console.error("Error parsing template data:", error);
        return;
      }

      const projectData = {
        id: parsedTemplateData.id,
        name: parsedTemplateData.name,
        pages: updatedPages,
      };

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

      navigate("/preview", {
        state: {
          templateId: projectId,
          html: htmlContent,
          css: cssContent,
        },
      });
    });
  }

  const handleRenderClick = () => {
    if (projectId && editorInstance) {
      // Save HTML and CSS for each page individually
      pages.forEach((page) => {
        // Load the page content into the editor
        loadPageContent(page);

        // Get the HTML and CSS of the editor after loading the specific page's content
        const html = editorInstance.getHtml();
        const cssContent = editorInstance.getCss() || "";

        // Save the HTML and CSS with keys including pageId
        localStorage.setItem(
          `gjsProject-${projectId}-page-${page.id}-html`,
          html
        );
        localStorage.setItem(
          `gjsProject-${projectId}-page-${page.id}-css`,
          cssContent
        );
      });

      // Navigate to the preview page for the selected page
      navigate(`/preview/${selectedPage.id}`);
    }
  };

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
        <Topbar
          className="min-h-[48px] bg-[#10BAAC]"
          handleSaveClick={handleSaveClick}
        />

        <div className="flex justify-between save-button-container">
          <button
            onClick={handleRenderClick}
            className="px-5 py-2 m-5 text-lg text-white bg-[#10BAAC] border-none rounded-md cursor-pointer"
          >
            Publish Template
          </button>
        </div>

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
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
