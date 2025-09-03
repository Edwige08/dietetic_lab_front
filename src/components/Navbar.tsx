import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar mb-2 shadow-sm bg-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 px-2 py-4 shadow">
                        <li><Link href="/imc" className="text-lg">🥝 Calcul IMC</Link></li>
                        <li><Link href="/dej" className="text-lg">🍌 Calcul DEJ</Link></li>
                        <li><Link href="/undernutrition" className="text-lg">🥥 Eval dénutrition</Link></li>
                        <li><Link href="/sri" className="text-lg">🍓 Evaluation SRI</Link></li>
                        <li><Link href="/ingesta" className="text-lg">🍍 Calcul Ingesta</Link></li>
                        <br />
                        <li></li>
                        <br />
                        <li><Link href="/about" className="text-base">A propos</Link></li>
                        <li><Link href="/work-in-progress" className="text-base">Vos retours</Link></li>
                        <li><Link href="/work-in-progress" className="text-base">Mentions légales</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href="/" className="flex flex-row items-center gap-2 font-bold text-3xl">
                    <Image
                        src="/logo_image.png"
                        width={500}
                        height={500}
                        alt="Logo de Dietetic Lab"
                        className="h-11 w-11"
                    />
                    <p>
                        <span className="text-(--greenColor)">Dietetic</span> <span className="text-(--grayColor)">Lab</span>
                    </p>
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/signin" className="flex flex-row gap-2 text-lg hover:underline">
                <UserRound />
                <p>Mon compte</p>
                </Link>
            </div>
        </div>
    )
}