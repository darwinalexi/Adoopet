import { Link } from "react-router-dom";

export const SidebarItem = ({ to, children }) => {
    return (
        <li className="mt-10"><Link to={to}>{children}</Link></li>
    );
};
