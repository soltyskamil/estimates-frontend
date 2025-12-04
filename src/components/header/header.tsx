import { FormOutlined } from "@ant-design/icons";
import "./header.scss";
import { Link } from "react-router-dom";
import { Button } from "../buttons/invisible-button/invisible-button";
import { MenuOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useWindowSize } from "@uidotdev/usehooks";
const MOBILE_BREAKPOINT = 540;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;
    if (width >= MOBILE_BREAKPOINT && isMenuOpen) setIsMenuOpen(false);
  }, [width, isMenuOpen]);

  const links = (
    <>
      <Button text="Rozpocznij" variant="FILLED" onPress={() => {}} />
    </>
  );

  const renderLinks = () => {
    if ((width ?? window.innerWidth) <= MOBILE_BREAKPOINT) return null;
    return <div className="app-navigation__links">{links}</div>;
  };

  const renderExpandable = () => {
    if ((width ?? window.innerWidth) >= MOBILE_BREAKPOINT) return null;
    return (
      <div className="app-navigation__outer">
        <div className="app-navigation__expandable">{links}</div>
      </div>
    );
  };

  return (
    <nav
      className={clsx("app-navigation", { "app-navigation--open": isMenuOpen })}
    >
      <div className="app-navigation__inner">
        <div className="app-navigation__start">
          <Link to={"/"} className="app-navigation__home">
            <FormOutlined className="app-navigation__icon" />
          </Link>
          <p className="app-navigation__name">Kosztorysy</p>
        </div>
        {renderLinks()}
        <MenuOutlined
          className="app-navigation__hamburger"
          onClick={toggleMenu}
        />
      </div>
      {renderExpandable()}
    </nav>
  );
};

export default Header;
