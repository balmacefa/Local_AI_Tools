import React from "react";
import {
  NavLink,
  NavLinkProps,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

// Define the type for your CustomNavLink props
type CustomNavLinkProps = {
  to: string;
  children: React.ReactNode;
} & NavLinkProps;

// CustomNavLink component
const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  children,
  ...props
}) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        isActive ? "nav-link link-dark active" : "nav-link link-dark"
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
