"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { usePathname } from "next/navigation";
interface Link {
  title: string;
  label?: string;
  href: string;
  icon: React.ReactNode;
}
interface NavProps {
  isCollapsed: boolean;
  links: Link[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname();
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const current = pathname.startsWith(link.href);
          return (
            <div key={`[link]-${link.title}`}>
              <Link
                title={link.title}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: current ? "default" : "ghost",
                    size: "icon",
                  }),
                  "h-9 w-9 md:hidden",
                  current &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                {link.icon}
                <span className="sr-only">{link.title}</span>
              </Link>

              {/* <div className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </div> */}
              <Link
                key={`[link]-${link.title}`}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: current ? "default" : "ghost",
                    size: "sm",
                  }),
                  current &&
                    "dark:bg-muted text-primary dark:hover:bg-muted  w-48",
                  "justify-start hidden md:flex"
                )}
              >
                {link.icon}
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      current && "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
