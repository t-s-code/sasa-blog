import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/">Home</Link>
        <div>
          <ul>
            <li>twitter</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
