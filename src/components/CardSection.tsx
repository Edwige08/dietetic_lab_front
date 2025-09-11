export default function CardSection(props: { bgColor: string, emoji: string, title: string, description: string }) {
    return (
        <>
            <div className="card card-side bg-white shadow-md mx-3 my-2 lg:mx-0 lg:w-full lg:h-full lg:flex lg:flex-col lg:overflow-hidden lg:justify-center lg:items-center xl:flex-row">
                <figure className={`rounded-lg text-3xl w-30 lg:w-[110%] lg:rounded-none lg:py-2 xl:h-full xl:w-30 ${props.bgColor}`}>
                    {props.emoji}
                </figure>
                <div className="card-body w-full p-4 gap-1">
                    <h2 className="card-title">{props.title}</h2>
                    <p className="">{props.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-link">Utiliser l&apos;outil</button>
                    </div>
                </div>
            </div>
        </>
    )
}