'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Return() {

    const pathname = usePathname();
    if (pathname === '/') return null;

    return (
        <div>
            <Link href="/" className="flex flex-row items-center justify-start gap-2 h-15 w-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path className="fill-(--greenSecondColor)" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                <p className="text-(--greenSecondColor) hover:underline ">Accueil</p>
            </Link>
        </div>
    )
}