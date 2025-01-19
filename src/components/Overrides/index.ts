import { Editor, Plugin } from 'grapesjs';
import Link from '../Overrides/link';

export interface LoadOverridePlugin {
  setShowQuickActions: () => void;
}
const LoadOverrides: Plugin<LoadOverridePlugin> = (editor: Editor, opts) => {
  Link(editor, opts);
};

export default LoadOverrides;
