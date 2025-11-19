"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationRoutes } from "@/lib/routes";
import type { NavItem } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import { useTranslation } from "@/hooks/useTranslation";
import { useEUProjects } from "@/hooks/useEUProjects";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Menu, ChevronDown, X, Globe } from "lucide-react";

/* ------------------------------------------------------------
   LOGO
-------------------------------------------------------------*/
function Logo() {
  const { t } = useTranslation();

  return (
    <Link href="/" className="flex items-center space-x-2">
      <img src="/image/mplog.png" alt="Logo" className="h-10 w-10 object-contain" />
      <span className="font-bold text-xl font-headline text-primary">
        {t("common.appName")}
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------
   LANGUAGE SWITCHER
-------------------------------------------------------------*/
function LanguageSwitcher() {
  const { setLanguage } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("sv")}>Svenska</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------
   NAVBAR
-------------------------------------------------------------*/
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();

  const baseItems = navigationRoutes(t as any);

  // Load all EU projects
  const { items: euProjects } = useEUProjects();

  // Inject EU sub-items dynamically
  const items = useMemo<NavItem[]>(() => {
    return baseItems.map((item) => {
      if (item.path === "/eu") {
        const subItems = euProjects.map((p) => ({
          name: p.slug,
          path: `/eu/${encodeURIComponent(p.slug)}`,
        }));
        return { ...item, subItems: subItems.length ? subItems : undefined };
      }
      return item;
    });
  }, [baseItems, euProjects]);

  // Main menu items
  const mainNavItems = items.filter((i) =>
    ["Verksamhet", "EU-samarbeten", "Activities", "EU Collaborations"].includes(i.name)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">

        {/* MOBILE NAV */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="pr-0 pt-0">
              {/* Accessibility Title */}
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Navigation Menu</SheetTitle>
              </SheetHeader>

              {/* Header with Logo & Close */}
              <div className="flex justify-between items-center py-4 px-6 border-b">
                <Logo />
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </SheetTrigger>
              </div>

              {/* Mobile Menu */}
              <div className="p-4">
                <nav className="flex flex-col space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item) => (
                      <MobileNavLink
                        key={item.name}
                        item={item}
                        setOpen={setIsOpen}
                      />
                    ))}
                  </Accordion>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* LOGO */}
        <div className="flex-1 md:flex-none">
          <Logo />
        </div>

        {/* DESKTOP NAV */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">

            {mainNavItems.map((item) =>
              item.subItems ? (
                <NavDropdown key={item.name} item={item} />
              ) : (
                <NavLink key={item.name} href={item.path}>
                  {item.name}
                </NavLink>
              )
            )}

            <NavLink href="/events">{t("nav.events")}</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   DESKTOP NAV LINK
-------------------------------------------------------------*/
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-accent",
        isActive ? "text-accent" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------
   DESKTOP DROPDOWN
   (Conditional "All Projects" based on menu type)
-------------------------------------------------------------*/
function NavDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = (item.subItems ?? []).some((sub) =>
    pathname.startsWith(sub.path)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "px-2 text-sm font-medium hover:text-accent focus-visible:ring-0",
            isActive ? "text-accent" : "text-foreground/60"
          )}
        >
          {item.name}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* ✅ Conditional: EU or Activities? */}
        {item.path === "/eu" && (
          <DropdownMenuItem asChild>
            <Link href="/eu">All EU Projects</Link>
          </DropdownMenuItem>
        )}

        {item.path === "/activities " && (
          <DropdownMenuItem asChild>
            <Link href="/projects/local">All Local Projects</Link>
          </DropdownMenuItem>
        )}

        {(item.subItems ?? []).map((subItem) => (
          <DropdownMenuItem key={subItem.name} asChild>
            <Link href={subItem.path}>{subItem.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------
   MOBILE NAV LINK
   (Conditional sub-items)
-------------------------------------------------------------*/
function MobileNavLink({
  item,
  setOpen,
}: {
  item: NavItem;
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const isActive =
    item.path !== "#"
      ? pathname === item.path
      : item.subItems?.some((sub) => pathname.startsWith(sub.path));

  const handleClick = () => {
    if (!item.subItems) setOpen(false);
  };

  if (item.name === "Engage") return null;

  if (item.subItems?.length) {
    return (
      <AccordionItem value={item.name} className="border-b-0">
        <AccordionTrigger
          className={cn(
            "py-3 font-semibold hover:no-underline",
            isActive && "text-accent"
          )}
        >
          {item.name}
        </AccordionTrigger>

        <AccordionContent>
          <div className="flex flex-col space-y-2 pl-4">

            {/* ✅ MOBILE: Add conditional project links */}
            {item.path === "/eu" && (
              <Link
                href="/eu"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md p-2 hover:bg-muted",
                  pathname === "/eu" ? "text-accent" : "text-foreground/80"
                )}
              >
                All EU Projects
              </Link>
            )}

            {item.path === "/activities" && (
              <Link
                href="/projects/local"
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md p-2 hover:bg-muted",
                  pathname === "/projects/local" ? "text-accent" : "text-foreground/80"
                )}
              >
                All Local Projects
              </Link>
            )}

            {item.subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md p-2 hover:bg-muted",
                  pathname === subItem.path
                    ? "text-accent"
                    : "text-foreground/80"
                )}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      href={item.path}
      onClick={handleClick}
      className={cn(
        "block rounded-md py-3 text-base hover:bg-muted px-3",
        isActive
          ? "font-semibold text-accent"
          : "font-medium text-foreground/80"
      )}
    >
      {item.name}
    </Link>
  );
}
