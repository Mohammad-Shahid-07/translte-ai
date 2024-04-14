import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-[#363535]">
      <nav className="flex  justify-between items-center">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="AI"
              width={60}
              height={60}
              className="   ml-5 object-contain dark:invert"
            />
          </Link>
        </div>
        <div className="flex  gap-5 p-5">
          <Link href="https://github.com/Mohammad-Shahid-07/translte-ai">
            <GitHubLogoIcon className="h-8 w-8 invert bg-white rounded-full" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
