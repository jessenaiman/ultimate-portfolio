import * as React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  Home,
  Briefcase,
  Layers,
  MessageSquarePlus,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/data/navigation";
import { Icon } from "astro-icon/components";
import { ModeToggle } from "./ModeToggle";

// Map icon names to Lucide components (null => fallback to astro-icon)
const iconMap = {
  "mdi:home": Home,
  "mdi:briefcase": Briefcase,
  "mdi:layers": Layers,
  "mdi:code-tags": PenTool,
  "mdi:chat-processing": MessageSquarePlus,
  "mdi:blog-outline": PenTool,
  "mdi:react": null,
  "mdi:vuejs": null,
  "mdi:language-typescript": null,
  "mdi:language-javascript": null,
  "mdi:campfire": null,
  "mdi:book-open-page-variant": null,
  "mdi:code-braces": null,
} as const;

function NavIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  if (IconComponent) {
    return <IconComponent className={cn("h-4 w-4", className)} />;
  }
  // @ts-ignore astro component interop
  return <Icon name={name} className={cn("h-4 w-4", className)} />;
}

interface NavBarProps {
  items: NavigationItem[];
  currentPath: string;
}

const isActive = (basePath: string, currentPath: string): boolean => {
  return (
    currentPath === basePath ||
    (basePath !== "/" && basePath !== "#" && currentPath.startsWith(basePath))
  );
};

const hasActiveChild = (item: NavigationItem, currentPath: string) =>
  item.children?.some((c) => isActive(c.path, currentPath)) ?? false;

function NavMenuItem({ item, currentPath }: { item: NavigationItem; currentPath: string; }) {
  const group = item.path === "#";
  const active = group ? hasActiveChild(item, currentPath) : isActive(item.path, currentPath);

  if (item.children) {
    return (
      <MenubarMenu>
        <MenubarTrigger
          data-active={active}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
          )}
        >
          {item.icon && <NavIcon name={item.icon} />}
          {item.displayName}
        </MenubarTrigger>
        <MenubarContent align="start">
          {item.children.map((child) => {
            const childActive = isActive(child.path, currentPath);
            return (
              <MenubarItem
                key={child.path}
                asChild
                data-active={childActive}
                className={cn(
                  "cursor-pointer data-[active=true]:bg-accent data-[active=true]:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <a href={child.path} className="flex items-center gap-2">
                  {child.icon && <NavIcon name={child.icon} />}
                  {child.displayName}
                </a>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    );
  }

  return (
    <MenubarMenu>
      <a
        href={item.path}
        data-active={active}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
          "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
        )}
      >
        {item.icon && <NavIcon name={item.icon} />}
        {item.displayName}
      </a>
    </MenubarMenu>
  );
}

export function NavBar({ items, currentPath }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {items.map((item, index) => {
                const group = item.path === "#";
                const activeGroup = group
                  ? hasActiveChild(item, currentPath)
                  : isActive(item.path, currentPath);

                return (
                  <React.Fragment key={item.name}>
                    {group ? (
                      <>
                        <DropdownMenuLabel
                          data-active={activeGroup}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground",
                            "data-[active=true]:text-foreground"
                          )}
                        >
                          {item.icon && <NavIcon name={item.icon} />}
                          {item.displayName}
                        </DropdownMenuLabel>
                        {item.children?.map((child) => {
                          const childActive = isActive(child.path, currentPath);
                          return (
                            <DropdownMenuItem
                              key={child.path}
                              asChild
                              data-active={childActive}
                              className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                            >
                              <a
                                href={child.path}
                                className="flex items-center gap-2 pl-6 pr-2"
                              >
                                {child.icon && <NavIcon name={child.icon} />}
                                {child.displayName}
                              </a>
                            </DropdownMenuItem>
                          );
                        })}
                      </>
                    ) : (
                      <DropdownMenuItem
                        asChild
                        data-active={activeGroup}
                        className="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                      >
                        <a href={item.path} className="flex items-center gap-2">
                          {item.icon && <NavIcon name={item.icon} />}
                          {item.displayName}
                        </a>
                      </DropdownMenuItem>
                    )}
                    {index < items.length - 1 && <DropdownMenuSeparator />}
                  </React.Fragment>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Menubar className="border-none bg-transparent shadow-none">
            {items.map((item) => (
              <NavMenuItem key={item.name} item={item} currentPath={currentPath} />
            ))}
          </Menubar>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </nav>
  );
}
