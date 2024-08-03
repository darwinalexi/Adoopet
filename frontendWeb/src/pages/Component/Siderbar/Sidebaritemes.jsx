import { Link } from "react-router-dom";

export const SidebarItem = ({ to, children }) => {
    return (
        <li className=" text-xl  hover:bg-[#69c9e1] hover:rounded-xl mt-14 mb-14  text-white"><Link to={to}>{children}</Link></li>
    );
};