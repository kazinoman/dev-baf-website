// import React, { Dispatch, SetStateAction, useState } from 'react';
// import { Button, Drawer } from 'antd';

// type DrawerProps = {
//     setOpen: Dispatch<SetStateAction<boolean>>
//     open: boolean,
//     showDrawer?: () => void
// }

// const DrawerComponent = ({open, setOpen, showDrawer}:DrawerProps) => {

//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Drawer
//         title=""
//         closable={{ 'aria-label': 'Close Button' }}
//         onClose={onClose}
//         open={open}
//         style={{}}
//       >

//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>

//       </Drawer>
//     </>
//   );
// };

// export default DrawerComponent;

"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Drawer } from "antd";
import Link from "next/link";
import { TiMinus } from "react-icons/ti";

type MenuItem = {
  name: string;
  href: string;
};

type DrawerProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  menus: MenuItem[];
};

const DrawerComponent = ({ open, setOpen, menus }: DrawerProps) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title=""
      closable
      onClose={onClose}
      open={open}
      width={250}
      bodyStyle={{ padding: 0 }}
    >
      <ul className="flex  flex-col p-4 gap-2">
        {menus.map((item) => (
          <li key={item.name} className="sub_item relative">
            <Link
              href={item.href}
              className="flex items-center px-4 py-2  hover:bg-gray-100 relative"
            >
              <TiMinus className="minus_icn text-black" size={12} />
              <span className="text-black">{item.name}</span>
            </Link>
          </li>
        ))}

        {/* Example submenu */}
        <li className="sub_item relative">
          <Link
            href="/shop"
            className="flex items-center px-4 py-2 hover:bg-gray-100 relative"
          >
            <TiMinus className="minus_icn text-black" size={12} />
            <span className="text-black">Athletes</span>
          </Link>
        </li>

        <li className="sub_item relative">
          <Link
            href="/shop"
            className="flex items-center px-4 py-2 hover:bg-gray-100 relative"
          >
            <TiMinus className="minus_icn text-black" size={12} />
            <span className="text-black">Coach</span>
          </Link>
        </li>

        <li className="sub_item relative">
          <Link
            href="/shop"
            className="flex items-center px-4 py-2 hover:bg-gray-100 relative"
          >
            <TiMinus className="minus_icn text-black" size={12} />
            <span className="text-black">Become a Sponsor</span>
          </Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default DrawerComponent;