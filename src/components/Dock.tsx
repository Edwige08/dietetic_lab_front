'use client'

import { useUser } from "@/contexts/UserContext";
import { House, Info, LogIn, UserRoundCheck } from "lucide-react"
import { useRouter, usePathname } from "next/navigation";

export default function Dock() {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useUser();

    const handleNavigationProfile = () => {
        isAuthenticated ? router.push("/personnalProfile") : router.push('/signin');
    }

    const handleNavigation = (path: string) => {
        router.push(path);
    }

    return (
        <div className="dock dock-xl bg-white shadow-xl border-(--grayLightColor)">

            <button className={`w-[20%] ${pathname === "/informations" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigation('/informations')}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><Info /> Infos</div>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigation("/")}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><House /> Outils</div>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/personnalProfile" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigationProfile()}>
                <div className="dropdown dropdown-top">
                    {isAuthenticated ?
                        <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><UserRoundCheck /> Mon profil</div>
                        :
                        <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><LogIn />Se connecter</div>
                    }
                </div>
            </button>
        </div>
    )
}