import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="flex flex-row justify-center navbar bg-base-100 shadow-sm mb-10">
                <img src="logo_image.png" alt="" className="h-15" />
                <Link className="btn btn-ghost text-3xl" href={"/"}>
                    <span className="text-(--greenColor)">Dietetic</span> <span className="text-(--grayColor)">Lab</span>
                </Link>
            </div>
        </>

    )
}