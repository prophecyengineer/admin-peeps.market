import { globalHistory } from "@reach/router"
import React, { useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import OSShortcut from "../atoms/os-shortcut"
import SearchIcon from "../fundamentals/icons/search-icon"
import SearchModal from "../templates/search-modal"

const SearchBar: React.FC = () => {
  const [showSearchModal, setShowSearchModal] = useState(false)

  const toggleSearch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowSearchModal((show) => !show)
  }

  const closeModal = () => {
    setShowSearchModal(false)
  }

  useHotkeys("cmd+k", toggleSearch, {}, [])
  useHotkeys("ctrl+k", toggleSearch, {}, [])
  useHotkeys("/", toggleSearch, {}, [])

  React.useEffect(() => {
    return globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        closeModal()
      }
    })
  }, [])

  return (
    <>
      <button
        onClick={() => setShowSearchModal(true)}
        className="flex basis-1/2 items-center px-small py-[6px]"
      >
        <SearchIcon />
        <div className="ml-5 search-icon">
          <OSShortcut macModifiers="⌘" winModifiers="Ctrl" keys="K" />
        </div>
        <span className="ml-xsmall  inter-base-regular">
          Search anything...
        </span>
      </button>
      {showSearchModal && <SearchModal handleClose={closeModal} />}
    </>
  )
}

export default SearchBar
