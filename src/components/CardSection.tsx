export default function CardSection(props: { bgColor: string, emoji: string, title: string, description: string }) {
    return (
        <>
            <div className="card card-side bg-white shadow-md mx-3 my-2">
                <figure className={`p-3 rounded-lg text-3xl w-20 ${props.bgColor}`}>
                    {props.emoji}
                </figure>
                <div className="card-body p-4 gap-1">
                    <h2 className="card-title">{props.title}</h2>
                    <p className="">{props.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-link">Utiliser l'outil</button>
                    </div>
                </div>
            </div>
        </>
    )
}