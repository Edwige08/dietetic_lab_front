'use client'

import { useUser } from "@/contexts/UserContext";
import { UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Return() {
    const router = useRouter();
    const { user, isAuthenticated } = useUser();

    const pathname = usePathname();
    if (pathname === '/') return null;

    const handleNavigationProfile = () => {
        isAuthenticated ? router.push("/personnalProfile") : router.push('/');
    }

    return (
        <div className="flex flex-row justify-between items-center px-5 h-15 shadow-lg">
            {pathname === '/personnalProfile' ?
            <div></div>
            :
            <button onClick={() => handleNavigationProfile()} className="flex flex-row items-center justify-start gap-2 w-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path className="fill-(--greenSecondColor)" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                    <p className="text-(--greenSecondColor) hover:underline">Accueil</p>
            </button>
            }
            {isAuthenticated && user &&
                <Link href="/personnalProfile" className="flex flex-row gap-2 justify-center items-center text-(--greenSecondColor) hover:underline">
                    <UserRoundCheck />
                    <p>{user.firstname} {user.lastname}</p>
                </Link>
            }
        </div>
    )
}