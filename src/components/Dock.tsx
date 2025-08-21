import { Calculator, House, Popcorn, UserRound } from "lucide-react"

export default function Dock() {
    return (
        <div className="dock dock-xl bg-white">
            <button className="dock-active">
                <House />
                <span className="dock-label">Home</span>
            </button>

            <button>
                <Calculator />
                <span className="dock-label">IMC</span>
            </button>
            
            <button>
                <Popcorn />
                <span className="dock-label">Ingesta</span>
            </button>

            <button>
                <Calculator />
                <span className="dock-label">DEJ</span>
            </button>

            <button>
                <UserRound />
                <span className="dock-label">Mon compte</span>
            </button>
        </div>
    )
}