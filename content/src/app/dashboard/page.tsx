"use client";
import React, { useState } from "react";
import { useUser } from '@clerk/clerk-react'
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { UserButton } from "@clerk/nextjs";

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Journalist AI
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const HeaderWithAnimation = ({ title }: { title: string }) => (
  <div className="relative h-full w-full rounded-xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse"></div>
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold">
      {title}
    </div>
  </div>
);
const items = [
  {
    title: <Link href={"/generate"}>SEO Article</Link>,
    description: "Create great articles with personalised content",
    header: <HeaderWithAnimation title="SEO Article" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: <Link href={"/imagecontext"}>Image as an context</Link>,
    description: "Give your article a visual context with images",
    header: <HeaderWithAnimation title="Create blog with Image" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Blog wth personalised context",
    description: "Create a blog with personalised knowledge",
    header: <HeaderWithAnimation title="Personalised Blog" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: <Link href={"/chat"}>Journalist AI Help</Link>,
    description:
      "Want to talk to us for more help and to understand best way to enhance your content",
    header: <HeaderWithAnimation title="Journalist AI Chat" />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Learn with our Docs",
    description: "Understand the impact of Journalist AI on your content creation.",
    header: <HeaderWithAnimation title="Learn thru Docs" />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
];

const Dashboard = () => {
      return (
        <BentoGrid className="h-screen w-full text-white">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      );
    }


function Page() {
  const links = [
    {
      label: "History",
      href: "/history",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const { user} = useUser()
  console.log(user?.fullName)

  return (
    <div className="h-screen w-screen bg-black text-white dark:bg-neutral-800 overflow-hidden flex">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
           {user &&  <SidebarLink
              link={{
                label: `${user.fullName}`,
                href: "#",
                icon: (
                  <UserButton/>
                ),
              }}
            />}
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export default Page;
