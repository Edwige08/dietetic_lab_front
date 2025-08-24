'use client'

import { Calculator, House, Popcorn, UserRound } from "lucide-react"
import { useRouter, usePathname } from "next/navigation";

export default function Dock() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
    }
    return (
        <div className="dock dock-xl bg-white">
            <button className={pathname === "/" ? "dock-active" : ""} onClick={() => handleNavigation('/')}>
                <House />
                <span className="dock-label">Home</span>
            </button>

            <button className={pathname === "/imc" ? "dock-active" : ""} onClick={() => handleNavigation('/imc')}>
                <Calculator />
                <span className="dock-label">IMC</span>
            </button>
            
            <button onClick={() => handleNavigation('/')}>
                <Popcorn />
                <span className="dock-label">Ingesta</span>
            </button>

            <button className={pathname === "/dej" ? "dock-active" : ""} onClick={() => handleNavigation('/dej')}>
                <Calculator />
                <span className="dock-label">DEJ</span>
            </button>

            <button onClick={() => handleNavigation('/')}>
                <UserRound />
                <span className="dock-label">Mon compte</span>
            </button>
        </div>
    )
}