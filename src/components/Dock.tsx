'use client'

import { useUser } from "@/contexts/UserContext";
import { Calculator, House, LibraryBig, Popcorn, Search, UserRound, Utensils } from "lucide-react"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Dock() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated } = useUser();

    const handleNavigationProfile = () => {
        isAuthenticated ? router.push("/personnalProfile") : router.push('/signin');
    }

    const handleNavigation = (path: string) => {
        router.push(path);
    }

    return (
        <div className="dock dock-xl bg-white">

            <button className={`${pathname === "/about" || pathname === "/faq" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} >
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><LibraryBig /> Infos</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm">
                        <li><Link href="/about">A propos</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`${pathname === "/imc" || pathname === "/dej" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><Calculator /> Calculs</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-30 p-2 shadow-sm">
                        <li><Link href="/imc">IMC</Link></li>
                        <li><Link href="/dej">DEJ</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`${pathname === "/" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigation('/')}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><House /> Home</div>
                </div>
            </button>

            <button className={`${pathname === "/undernutrition" || pathname === "/sri" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><Search /> Evaluations</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 opacity-100 rounded-box z-1 w-30 p-2 shadow-sm">
                        <li><Link href="/undernutrition">Dénutrition</Link></li>
                        <li><Link href="/sri">SRI</Link></li>
                    </ul>
                </div>
            </button>

            <button className={`${pathname === "/ingesta" ? "border-none bg-(--grayLightColor) rounded-4xl" : ""}`} onClick={() => handleNavigation('/ingesta')}>
                <div className="dropdown dropdown-top">
                    <div tabIndex={0} role="button" className="btn m-1 flex flex-col h-full border-0 bg-transparent font-medium"><Utensils /> Ingesta</div>
                </div>
            </button>
        </div>
    )
}


{/* <div className="dock dock-xl bg-white">

            <button className={pathname === "/signin" ? "dock-active" : ""} onClick={() => handleNavigationProfile()}>
                <UserRound />
                <span className="dock-label">{isAuthenticated ? "Mon profil" : "Mon compte"}</span>
            </button>

            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="drawer-button flex flex-col justify-center items-center">
                        <Popcorn />
                        <span className="dock-label cursor-pointer">Outils diet</span>
                    </label>
                </div>
                <div className="drawer-side cursor-auto">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu h-full w-60 p-4 justify-between bg-white text-black">
                        <div>
                            <p className="text-xl underline mb-3">Les outils disponibles :</p>
                            <ul className="flex flex-col gap-2">
                                <li className="flex justify-center border bg-(--orangeLightColor) rounded-xl h-12 shadow-md"><Link href="/imc" className="text-lg">🥝 Calcul IMC</Link></li>
                                <li className="flex justify-center border bg-(--greenLightColor) rounded-xl h-12 shadow-md"><Link href="/dej" className="text-lg">🍌 Calcul DEJ</Link></li>
                                <li className="flex justify-center border bg-(--redLightColor) rounded-xl h-12 shadow-md"><Link href="/undernutrition" className="text-lg">🥥 Eval dénutrition</Link></li>
                                <li className="flex justify-center border bg-(--yellowLightColor) rounded-xl h-12 shadow-md"><Link href="/sri" className="text-lg">🍓 Evaluation SRI</Link></li>
                                <li className="flex justify-center border bg-(--blueLightColor) rounded-xl h-12 shadow-md"><Link href="/ingesta" className="text-lg">🍍 Calcul Ingesta</Link></li>
                            </ul>
                        </div>
                        <ul className="text-end">
                            <li><Link href="/about" className="text-md">A propos</Link></li>
                            <li><Link href="/work-in-progress" className="text-md">Vos retours</Link></li>
                            <li><Link href="/work-in-progress" className="text-md">Mentions légales</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <button className={pathname === "/" ? "dock-active" : ""} onClick={() => handleNavigation('/')}>
                <House />
                <span className="dock-label">Home</span>
            </button>

        </div> */}