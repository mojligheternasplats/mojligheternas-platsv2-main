"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationRoutes } from "@/lib/routes";
import type { NavItem } from "@/lib/definitions";
import { cn } from "@/lib/utils";

import { useTranslation } from "@/hooks/useTranslation";
import { useEUProjects } from "@/hooks/useEUProjects";
import { groupProjectsByProgram } from "@/lib/api/projects";
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
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
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
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent hover:text-accent transition-colors"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("sv")} className="cursor-pointer">
          Svenska
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
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



  // Group EU projects by their existing `program` field
  const groupedEUProjects = useMemo(
    () => groupProjectsByProgram(euProjects),
    [euProjects]
  );
 
const EU_PROGRAM_DISPLAY_NAMES: Record<string, string> = {
  "erasmus-plus": "Erasmus+",
  "european-solidarity-corps": "European Solidarity Corps",
  "future-narratives": "Future Narratives",
};
  // Inject EU → Program → Project hierarchy dynamically
 const items = useMemo<NavItem[]>(() => {
  return baseItems.map((item) => {
    if (item.path === "/eu") {
      const programItems: NavItem[] = Object.entries(
        groupedEUProjects
      ).map(([programName, projects]) => ({
        name: programName,
       displayName:
  EU_PROGRAM_DISPLAY_NAMES[
     programName.trim().toLowerCase().replace(/_/g, "-")
  ] || programName,
        path: "#",
        subItems: projects.map((project) => ({
          name: project.title || project.slug,
          path: `/projects/${encodeURIComponent(project.slug)}`,
        })),
      }));

      return {
        ...item,
        subItems: programItems.length > 0 ? programItems : undefined,
      };
    }

    return item;
  });
}, [baseItems, groupedEUProjects]);
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
                  <Link href="/engage">Engagera dig</Link>
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
      className={`relative px-2 py-1 transition-colors ${isActive
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
// function NavDropdown({ item }: { item: NavItem }) {
//   const pathname = usePathname();
//   const highlight = item.subItems?.some((s) => pathname.startsWith(s.path));

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           className={cn(
//             "px-2 text-sm font-medium transition-colors",
//             // Kill the default background and target the text color
//             "hover:bg-transparent hover:text-accent", 
//             highlight ? "text-accent" : "text-foreground/60"
//           )}
//         >
//           {item.name}
//           <ChevronDown className="w-4 h-4 ml-1" />
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent>
//         {item.subItems?.map((sub) => (
//           <DropdownMenuItem key={sub.name} asChild>
//             <Link 
//               href={sub.path}
//               className="cursor-pointer hover:text-accent transition-colors"
//             >
//               {sub.name}
//             </Link>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
/* ------------------------------------------------------------
   MOBILE NAV LINK
-------------------------------------------------------------*/
// function MobileNavLink({
//   item,
//   setOpen
// }: {
//   item: NavItem;
//   setOpen: (v: boolean) => void;
// }) {
//   const pathname = usePathname();

//   // Checks if the current path matches the item or any of its children
//   const isActive = 
//     pathname === item.path || 
//     item.subItems?.some((sub) => pathname === sub.path);

//   // Hardcoded exclusion (Consider moving this to the parent filter)
//   if (item.name === "Engagera dig") return null;

//   if (item.subItems?.length) {
//     return (
//       <AccordionItem value={item.name} className="border-none">
//         <AccordionTrigger
//           className={cn(
//             "py-3 font-semibold hover:no-underline transition-colors",
//             isActive ? "text-accent" : "text-foreground/90"
//           )}
//         >
//           {item.name}
//         </AccordionTrigger>

//         <AccordionContent>
//           <div className="pl-4 space-y-1 py-1">
//             {item.subItems.map((sub) => (
//               <Link
//                 key={sub.path} // More unique than name
//                 href={sub.path}
//                 onClick={() => setOpen(false)}
//                 className={cn(
//                   "block p-2 rounded-md transition-colors",
//                   pathname === sub.path 
//                     ? "bg-muted text-accent font-semibold" 
//                     : "text-foreground/70 hover:bg-muted hover:text-foreground"
//                 )}
//               >
//                 {sub.name}
//               </Link>
//             ))}
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     );
//   }

//   return (
//     <Link
//       href={item.path}
//       onClick={() => setOpen(false)}
//       className={cn(
//         "block py-3 px-3 rounded-md text-base transition-colors",
//         isActive 
//           ? "bg-muted text-accent font-semibold" 
//           : "text-foreground/80 hover:bg-muted hover:text-foreground"
//       )}
//     >
//       {item.name}
//     </Link>
//   );
// }

/* ------------------------------------------------------------
   DESKTOP DROPDOWN
-------------------------------------------------------------*/
function NavDropdown({ item }: { item: NavItem }) {
  const pathname = usePathname();

  const highlight =
    pathname === item.path ||
    item.subItems?.some(
      (sub) =>
        pathname === sub.path ||
        sub.subItems?.some((project) => pathname === project.path)
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "px-2 text-sm font-medium transition-colors",
            "hover:bg-transparent hover:text-accent",
            highlight ? "text-accent" : "text-foreground/60"
          )}
        >
          {item.name}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {item.subItems?.map((sub) => {
          // Program with projects → nested submenu
          if (sub.subItems?.length) {
            return (
              <DropdownMenuSub key={sub.name}>
                <DropdownMenuSubTrigger className="cursor-pointer">
                   {sub.displayName || sub.name}
                </DropdownMenuSubTrigger>

                <DropdownMenuSubContent>
                  {sub.subItems.map((project) => (
                    <DropdownMenuItem key={project.path} asChild>
                      <Link
                        href={project.path}
                        className={cn(
                          "cursor-pointer transition-colors",
                          pathname === project.path
                            ? "text-accent"
                            : "hover:text-accent"
                        )}
                      >
                        {project.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          }

          // Normal one-level navigation item
          return (
            <DropdownMenuItem key={sub.path} asChild>
              <Link
                href={sub.path}
                className="cursor-pointer hover:text-accent transition-colors"
              >
                {sub.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------
   MOBILE NAV LINK
-------------------------------------------------------------*/
function MobileNavLink({
  item,
  setOpen,
}: {
  item: NavItem;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  if (item.name === "Engagera dig") return null;

  const hasChildren = Boolean(item.subItems?.length);

  const isActive =
    pathname === item.path ||
    item.subItems?.some(
      (sub) =>
        pathname === sub.path ||
        sub.subItems?.some((child) => pathname === child.path)
    );

  if (!hasChildren) {
    return (
      <Link
        href={item.path}
        onClick={() => setOpen(false)}
        className={cn(
          "block py-3 px-3 rounded-md text-base transition-colors",
          isActive
            ? "bg-muted text-accent font-semibold"
            : "text-foreground/80 hover:bg-muted hover:text-foreground"
        )}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <AccordionItem
      value={`${item.path}-${item.name}`}
      className="border-none"
    >
      <AccordionTrigger
        className={cn(
          "py-3 font-semibold hover:no-underline transition-colors",
          isActive ? "text-accent" : "text-foreground/90"
        )}
      >
         {item.displayName || item.name}
      </AccordionTrigger>

      <AccordionContent>
        <div className="pl-4 space-y-1 py-1">
          {item.subItems!.map((sub) => {
            if (sub.subItems?.length) {
              return (
                <Accordion
                  key={`program-${sub.name}`}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <MobileNavLink
                    item={sub}
                    setOpen={setOpen}
                  />
                </Accordion>
              );
            }

            return (
              <Link
                key={sub.path}
                href={sub.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "block p-2 rounded-md transition-colors",
                  pathname === sub.path
                    ? "bg-muted text-accent font-semibold"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                {sub.name}
              </Link>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}