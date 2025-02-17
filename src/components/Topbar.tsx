import * as React from "react";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { cx } from "./common";
import TopbarButtons from "./TopbarButtons";

interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  handleSaveClick: () => void;
}

export default function Topbar({ className, handleSaveClick }: TopbarProps) {
  return (
    <div className={cx("gjs-top-sidebar flex items-center p-1", className)}>
      <DevicesProvider>
        {({ selected, select, devices }) => (
          <FormControl size="small">
            <Select value={selected} onChange={(ev) => select(ev.target.value)}>
              {devices.map((device) => (
                <MenuItem value={device.id} key={device.id}>
                  {device.getName()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons className="px-2 ml-auto" />
      </WithEditor>
      <div className="flex justify-between save-button-container">
        <button
          onClick={handleSaveClick}
          className="m-5 bg-[#08496D] text-white py-2 px-5 border-none rounded-md cursor-pointer text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
