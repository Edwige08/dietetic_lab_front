'use client';

import { useUser } from "@/contexts/UserContext";
import { Info, LogIn, PencilRuler, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const { isAuthenticated } = useUser();

    return (
        <div className="navbar mb-2 shadow-sm bg-white justify-between pl-10 pr-5">

            <div className="navbar-center m-auto md:m-0">
                <Link href="/" className="flex flex-row items-center gap-2 font-bold text-3xl">
                    <Image
                        src="/logo_plat.png"
                        width={500}
                        height={132}
                        alt="Logo de Dietetic Lab"
                        className="h-16 w-60"
                    />
                </Link>
            </div>

            <div className="navbar-end gap-2 hidden md:flex">

                <Link href="/" className="md:flex flex-col items-center gap-2 text-sm border-(--grayLightColor) p-2  hover:underline hidden h-full min-w-20">
                    <PencilRuler />
                    <p>Outils</p>
                </Link>

                <Link href="/informations" className="md:flex flex-col items-center gap-2 text-sm border-l border-(--grayLightColor) p-2  hover:underline hidden h-full min-w-20">
                    <Info />
                    <p>Infos</p>
                </Link>

                {isAuthenticated ?
                    <Link href="/personnalProfile" className="hidden md:flex flex-col items-center gap-2 text-sm border-l border-(--grayLightColor) p-2 hover:underline min-w-20">
                        <UserRoundCheck />
                        <p>Mon profil</p>
                    </Link>
                    :
                    <Link href="/signin" className="hidden md:flex flex-col items-center gap-2 text-sm border-l border-(--grayLightColor) p-2 hover:underline min-w-20">
                        <LogIn />
                        <p>Connexion</p>
                    </Link>
                }

            </div>

        </div>
    )
}