'use client'

import { House, Popcorn, UserRound } from "lucide-react"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Dock() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
    }
    
    return (
        <div className="dock dock-xl bg-white">

            <button className={pathname === "/signin" ? "dock-active" : ""} onClick={() => handleNavigation('/signin')}>
                <UserRound />
                <span className="dock-label">Mon compte</span>
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

        </div>
    )
}