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
        <div className="dock dock-xl bg-white shadow-xl border-(--grayLightColor)">

            <button className={`w-[20%] ${pathname === "/about" || pathname === "/faq" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} >
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><LibraryBig /> Infos</div>
                    <ul tabIndex={0} className="dropdown-content menu active:bg-white bg-white opacity-100 rounded-3xl z-1 w-30 p-1 gap-1 border border-(--grayLightColor) mb-3">
                        <li className=" bg-(--grayLightColor) rounded-3xl flex flex-col justify-center items-center active:bg-white border border-(--grayLightColor)"><Link className="flex flex-col justify-center items-center active:bg-white h-13" href="/about">A propos</Link></li>
                        <li className=" bg-(--grayLightColor) rounded-3xl flex flex-col justify-center items-center active:bg-white border border-(--grayLightColor)"><Link className="flex flex-col justify-center items-center active:bg-white h-13" href="/faq">FAQ</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/imc" || pathname === "/dej" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`}>
                <div className="dropdown dropdown-top dropdown-center">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><Calculator /> Calculs</div>
                    <ul tabIndex={0} className="dropdown-content menu active:bg-white bg-white opacity-100 rounded-3xl z-1 w-30 p-1 gap-1 border border-(--grayLightColor) mb-3">
                        <li className=" bg-(--orangeLightColor) rounded-3xl flex flex-col justify-center items-center active:bg-white border border-(--grayLightColor)"><Link className="text-center active:bg-white" href="/imc">🥝 <br /> IMC</Link></li>
                        <li className=" bg-(--greenLightColor) rounded-3xl flex flex-col justify-center items-center active:bg-white border border-(--grayLightColor)"><Link className="text-center active:bg-white" href="/dej">🍌 <br /> DEJ</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/" || pathname === "/personnalProfile" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigationProfile()}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><House /> Home</div>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/undernutrition" || pathname === "/sri" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`}>
                <div className="dropdown dropdown-top dropdown-center">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><Search /> Evaluations</div>
                    <ul tabIndex={0} className="dropdown-content menu active:bg-white bg-white opacity-100 rounded-3xl z-1 w-30 p-1 gap-1 border border-(--grayLightColor) mb-3">
                        <li className=" bg-(--redLightColor) rounded-3xl flex flex-col justify-center items-center active:bg-white border border-(--grayLightColor)"><Link className="text-center active:bg-white" href="/undernutrition">🥥 <br /> Dénutrition</Link></li>
                        <li className="bg-(--yellowLightColor) rounded-3xl flex flex-col justify-center items-center active:bg-white border border-(--grayLightColor)"><Link className="text-center active:bg-white" href="/sri">🍓 <br /> SRI</Link></li>
                        {/* <li className="text-2xl">^</li> */}
                    </ul>
                </div>
            </button>

            <button className={`w-[20%] ${pathname === "/ingesta" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigation('/ingesta')}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium text-black shadow-none"><Utensils /> Ingesta</div>
                </div>
            </button>
        </div>
    )
}