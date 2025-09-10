'use client'

import { useUser } from "@/contexts/UserContext";
import { Calculator, House, LibraryBig, Search, Utensils } from "lucide-react"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Dock() {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useUser();

    const handleNavigationProfile = () => {
        isAuthenticated ? router.push("/personnalProfile") : router.push('/');
    }

    const handleNavigation = (path: string) => {
        router.push(path);
    }

    return (
        <div className="dock dock-xl bg-white text-black">

            <button className={`w-[20%] ${pathname === "/about" || pathname === "/faq" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} >
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><LibraryBig /> Infos</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm">
                        <li><Link href="/about">A propos</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/imc" || pathname === "/dej" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><Calculator /> Calculs</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-30 p-2 shadow-sm">
                        <li><Link href="/imc">IMC</Link></li>
                        <li><Link href="/dej">DEJ</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigationProfile()}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><House /> Home</div>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/undernutrition" || pathname === "/sri" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><Search /> Evaluations</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 opacity-100 rounded-box z-1 w-30 p-2 shadow-sm">
                        <li><Link href="/undernutrition">Dénutrition</Link></li>
                        <li><Link href="/sri">SRI</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/ingesta" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigation('/ingesta')}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><Utensils /> Ingesta</div>
                </div>
            </button>
        </div>
    )
}