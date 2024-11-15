import DottedSeparator from "@/components/dotted-separator";
import Image from "next/image";
import Link from "next/link";

import { Navigation } from "./navigation";

export function SideBar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={64} height={64} />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
}
