import React, { useState, useEffect, useRef } from "react"
import "./customDropdown.scss"
interface IDropdownProps {
  header: React.ReactNode
  options?: React.ReactElement[] | React.ReactElement
  headerClassName?: string
  menuClassName?: string
  children?: any
  setOpen?:any
}

const CustomDropdown = ({
  header,
  options,
  headerClassName,
  menuClassName,
  children,
  setOpen
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if(setOpen){
      setOpen(!isOpen)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
      if(setOpen){
        setOpen(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  const handleOptionClick = (onClick: () => void) => {
    if (onClick) {
      onClick()
    }
    setIsOpen(false)
    if(setOpen){
      setOpen(false)
    }
  }
  const optionsArray = Array.isArray(options) ? options : [options]

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-header ${headerClassName}`}
        onClick={toggleDropdown}
      >
        {header}
      </div>
      <ul className={`dropdown-menu ${menuClassName} ${isOpen ? "open" : "close"}`}>
        {children
          ? children
          : optionsArray.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option?.props?.onClick)}
              >
                {option}
              </li>
            ))}
      </ul>
    </div>
  )
}
export default CustomDropdown
