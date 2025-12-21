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
  SheetTitle
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from "@/components/ui/accordion";

import { Menu, ChevronDown, X, Globe } from "lucide-react";

/* ------------------------------------------------------------
   LOGO
-------------------------------------------------------------*/


function Logo() {
  const { t } = useTranslation();

  return (
    <Link href="/" className="flex items-center space-x-2">
      <img
        src="/images/mplog.png"
        alt="Logo"
        className="h-9 w-12 object-cover"
      />
      <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-primary font-headline">
      Möjligheternas Plats
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
        <Button variant="ghost" size="icon" className="hover:bg-accent/20">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("sv")}>
          Svenska
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------
   MAIN NAVBAR
-------------------------------------------------------------*/
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();

  const baseItems = navigationRoutes(t as any);

  // Load EU projects
  const { items: euProjects } = useEUProjects();

  // Inject EU Items dynamically
  const items = useMemo<NavItem[]>(() => {
    return baseItems.map((item) => {
      if (item.path === "/eu") {
        return {
          ...item,
          subItems:
            euProjects.length > 0
              ? euProjects.map((p) => ({
                name: p.title || p.slug,
                path: `/eu/${encodeURIComponent(p.slug)}`
              }))
              : undefined
        };
      }
      return item;
    });
  }, [euProjects, baseItems]);

  // Filter main desktop items
  const mainNavItems = items.filter(
    (i) =>
      ["Verksamhet", "EU-samarbeten", "Activities", "EU Collaborations"].includes(
        i.name
      )
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container h-16 flex items-center">

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[85%] p-0 flex flex-col bg-background"
            >
              {/* Hidden header for accessibility */}
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Navigation</SheetTitle>
              </SheetHeader>

              {/* Top bar inside menu */}
              <div className="flex justify-between items-center px-5 py-4 border-b">
                <Logo />
                <div className="flex items-center space-x-2">
                  <LanguageSwitcher />
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>


              {/* MOBILE NAV LINKS */}
              <div className="p-5 overflow-y-auto flex-1">
                <Accordion type="single" collapsible>
                  {items.map((item) => (
                    <MobileNavLink key={item.name} item={item} setOpen={setIsOpen} />
                  ))}
                </Accordion>
              </div>

              {/* CTA BUTTON */}
              {/* CTA BUTTON + LANGUAGE SWITCHER */}
              <div className="p-5 border-t space-y-3">
                <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/engagera">Engagera dig</Link>
                </Button>

           
              </div>

            </SheetContent>
          </Sheet>
        </div>

        {/* LOGO */}
        <div className="flex-1 md:flex-none">
          <Logo />

        </div>

        {/* DESKTOP NAV */}
      <nav className="hidden md:flex flex-1 justify-end items-center space-x-6 pr-2">
  <NavLink href="/about">{t("nav.about")}</NavLink>

  {mainNavItems.map((item) =>
    item.subItems ? (
      <NavDropdown key={item.name} item={item} />
    ) : (
      <NavLink key={item.name} href={item.path}>
        {item.name}
      </NavLink>
    )
  )}

  {/* Events */}
  <NavLink href="/events">{t("nav.events")}</NavLink>

  {/* Lang Switch */}
  <LanguageSwitcher />
</nav>

      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   DESKTOP LINK
-------------------------------------------------------------*/
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-2 py-1 transition-colors ${
        isActive
          ? "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary"
          : "text-foreground hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------
   DESKTOP DROPDOWN
-------------------------------------------------------------*/
function NavDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const highlight = item.subItems?.some((s) => pathname.startsWith(s.path));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "px-2 text-sm font-medium hover:text-accent",
            highlight ? "text-accent" : "text-foreground/60"
          )}
        >
          {item.name}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {item.subItems?.map((sub) => (
          <DropdownMenuItem key={sub.name} asChild>
            <Link href={sub.path}>{sub.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------
   MOBILE NAV LINK
-------------------------------------------------------------*/
function MobileNavLink({
  item,
  setOpen
}: {
  item: NavItem;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const active =
    item.subItems?.some((s) => pathname.startsWith(s.path)) ||
    pathname === item.path;

  // ❌ Skip Engage
  if (item.name === "Engage") return null;

  if (item.subItems?.length) {
    return (
      <AccordionItem value={item.name}>
        <AccordionTrigger
          className={cn(
            "py-3 font-semibold hover:no-underline",
            active && "text-accent"
          )}
        >
          {item.name}
        </AccordionTrigger>

        <AccordionContent>
          <div className="pl-4 space-y-2 py-2">
            {item.subItems.map((sub) => (
              <Link
                key={sub.name}
                href={sub.path}
               onClick={() => setOpen(false)}
className={cn(
  "block p-2 rounded transition-colors hover:bg-muted hover:text-blue-600",
  pathname === sub.path ? "text-accent font-semibold" : "text-foreground/70"
)}

              >
                {sub.name}

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
      onClick={() => setOpen(false)}
      className={cn(
        "block py-3 px-3 rounded-md text-base hover:bg-muted",
        active ? "text-accent font-semibold" : "text-foreground/80"
      )}
    >
      {item.name}

    </Link>
  );
}
