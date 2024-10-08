import React from "react";
import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;
export const NavLink: React.FC<NavLinkProps> = ({ ...rest }) => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  console.log("link to", rest.to);
  return (
    <Link
      {...rest}
      data-current={pathname === rest.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  );
};
