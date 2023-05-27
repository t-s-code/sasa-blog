import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { pagesPath } from "@/lib/$path";

interface MenuProps {
  className?: string;
  isOpen: boolean;
}

const MENU_MOVE_DURATION = 0.2;

const Menu = ({ className, isOpen }: MenuProps) => {
  const animations = {
    visible: { x: [-200, -100, -50, 0], opacity: [0, 0, 0.5, 1] },
    hidden: { x: [0, -200], opacity: [1, 0] },
  };

  return (
    <motion.div
      className={
        "flex flex-col items-start justify-between w-48 py-3 bg-white " +
        className
      }
      variants={animations}
      animate={isOpen ? "visible" : "hidden"}
      transition={{
        ease: "easeOut",
        duration: MENU_MOVE_DURATION,
      }}
    >
      <Link href={pagesPath.articles.$url()}>Articles</Link>
      <Link href={pagesPath.projects.$url()}>Projects</Link>
      <Link href={pagesPath.about.$url()}>About</Link>
    </motion.div>
  );
};

export default Menu;