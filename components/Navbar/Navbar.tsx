import Link from "next/link";
import React, { useRef, useState } from "react";
import Logo from "../Icons/Logo";
import useSubscribeDomeEvent from "../hooks/useSubscribeDomeEvent";
import Menu from "./Menu";
import SquareButton from "../Buttons/SquareButton";

const Navbar = () => {
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoLinkRef = useRef<HTMLDivElement>(null);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useSubscribeDomeEvent({
    target: typeof document !== "undefined" ? document : null,
    events: ["click"],
    listener: (e) => {
      if (e.target && logoLinkRef.current?.contains(e.target as Node)) {
        return;
      }
      setIsLogoOpen(false);
      setIsMenuOpen(false);
    },
  });

  return (
    <nav className="relative w-screen mt-8 px-8">
      <div
        ref={logoLinkRef}
        onMouseOver={() => setIsLogoOpen(true)}
        onMouseLeave={() => setIsLogoOpen(false)}
        onClick={toggleMenuOpen}
        className="cursor-pointer"
      >
        <Logo isOpen={isLogoOpen || isMenuOpen} />
      </div>
      <Menu isOpen={isMenuOpen} />
      <div className="absolute top-0 left-0 right-0 text-center">
        <SquareButton title="Technology" subTitle="テクノロジー" />
      </div>
    </nav>
  );
};

export default Navbar;
