import { LogIn } from "lucide-react";

export default function SignInForm() {
    return (
        <>
            <div className="card bg-white w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Connexion</h2>
                    <label className="label">Email</label>
                    <input type="email" className="input bg-white border-(--grayMediumColor)" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" className="input bg-white border-(--grayMediumColor)" placeholder="Password" />
                    <div className="card-actions justify-center">
                        <button className="btn bg-(--greenColor) rounded-lg text-white border-0"><LogIn />Me connecter</button>
                    </div>
                </div>
            </div>
        </>
    )
}