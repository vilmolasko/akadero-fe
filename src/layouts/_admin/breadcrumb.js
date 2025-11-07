"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbs = segments.map((segment, idx) => {
    let href = "/" + segments.slice(0, idx + 1).join("/");

    // ✅ Force "admin" breadcrumb to go to /admin/dashboard
    if (segment === "admin") {
      href = "/admin/dashboard";
    }

    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: idx === segments.length - 1 ? null : href,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => (
          <BreadcrumbItem key={idx}>
            {crumb.href ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.name}</Link>
                </BreadcrumbLink>
                {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </>
            ) : (
              <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
