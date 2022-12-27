import React from "react"

type SidebarCompanyLogoProps = {
  storeName?: string
}

const SidebarCompanyLogo: React.FC<SidebarCompanyLogoProps> = ({
  storeName,
}: SidebarCompanyLogoProps) => {
  return (
    <div className="logoBox ">
      {/* <div className="w-[32px] h-[32px] flex items-center justify-center bg-grey-90 text-grey-0 rounded">
        <div>{storeName?.slice(0, 1) || "M"}</div>
      </div> */}
      <img src="/logo.png" width="60px"></img>
    </div>
  )
}

export default SidebarCompanyLogo
