import { NavLink } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { FaLaptopCode } from "react-icons/fa"
import { FaLaptop } from "react-icons/fa6"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import { GiStarFormation } from "react-icons/gi"
import { BsFileEarmarkPerson } from "react-icons/bs"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./shared/navigationMenu"
import ShiningButton from "./shared/shiningButton"
import ArrowButton from "./shared/arrowButton"
import HrButton from "./shared/hrButton"
export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-white px-6 py-[14px]">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-semibold text-black">Việc làm</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex h-auto w-[400px] flex-col gap-2 bg-white p-4">
                <NavLink key={0} to="#">
                  <div className="flex w-full items-center rounded-md bg-navContentBg px-[14px] py-[15px] text-sm">
                    <FaSearch size={16} className="text-navTitle" />
                    <span className="ml-4 font-medium text-black hover:text-navTitle">Việc làm phù hợp</span>
                  </div>
                </NavLink>
                <NavLink key={1} to="#">
                  <div className="flex w-full items-center rounded-md bg-navContentBg px-[14px] py-[15px] text-sm">
                    <FaLaptopCode size={20} className="text-navTitle" />
                    <span className="ml-4 font-medium text-black hover:text-navTitle">Việc làm senior</span>
                  </div>
                </NavLink>
                <NavLink key={2} to="#">
                  <div className="flex w-full items-center rounded-md bg-navContentBg px-[14px] py-[15px] text-sm">
                    <FaLaptop size={20} className="text-navTitle" />
                    <span className="ml-4 font-medium text-black hover:text-navTitle">Việc làm IT</span>
                  </div>
                </NavLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-semibold text-black">Hồ sơ & CV</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex h-auto w-[400px] flex-col gap-2 bg-white p-4">
                <NavLink key={3} to="#">
                  <div className="flex w-full items-center rounded-md bg-navContentBg px-[14px] py-[15px] text-sm">
                    <BsFileEarmarkPerson size={20} className="text-navTitle" />
                    <span className="ml-4 font-medium text-black hover:text-navTitle">Tạo CV</span>
                  </div>
                </NavLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-semibold text-black">Công ty</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex h-auto w-[400px] flex-col gap-2 bg-white p-4">
                <NavLink key={6} to="#">
                  <div className="flex w-full items-center rounded-md bg-navContentBg px-[14px] py-[15px] text-sm">
                    <HiOutlineBuildingOffice2 size={20} className="text-navTitle" />
                    <span className="ml-4 font-medium text-black hover:text-navTitle">Danh sách công ty</span>
                  </div>
                </NavLink>
                <NavLink key={7} to="#">
                  <div className="flex w-full items-center rounded-md bg-navContentBg px-[14px] py-[15px] text-sm">
                    <GiStarFormation size={20} className="text-navTitle" />
                    <span className="ml-4 font-medium text-black hover:text-navTitle">Top công ty</span>
                  </div>
                </NavLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        <ArrowButton text={"Đăng nhập"} />
        <ShiningButton label={"Đăng ký"} />
        <HrButton label={"Đăng tuyển và tìm hồ sơ"} />
      </div>
    </nav>
  )
}
