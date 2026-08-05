import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Drop-in replacements for next/link / router that are locale-aware.
 * Use these everywhere in the app.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
