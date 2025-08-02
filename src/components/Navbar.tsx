export default function Navbar() {
    return (
        <>
            <div className="flex flex-row justify-center navbar bg-base-100 shadow-sm mb-10">
                <img src="logo_image.png" alt="" className="h-15" />
                <a className="btn btn-ghost text-3xl">
                    <span className="text-(--greenColor)">Dietetic</span> <span className="text-(--grayColor)">Lab</span>
                </a>
            </div>
            {/* <div>
                <ul className="menu menu-horizontal bg-base-200 rounded-box w-full justify-evenly">
                    <li><a>Accueil</a></li>
                    <li>
                        <details open>
                            <summary>Calculs</summary>
                            <ul>
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div> */}
            {/* <div>
                <ul className="menu menu-horizontal bg-base-200 rounded-box">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div> */}
        </>

    )
}