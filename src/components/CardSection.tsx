// export default function CardSection(props: { bgColor: string, title: string, description: string }) {
//     return (
//         <article className="flex flex-row gap-4 p-4 m-3 border border-gray-300 rounded-xl shadow-xl bg-white hover:translate-1 cursor-pointer duration-120 ease-in-out">
//             <div className={`p-3 size-fit rounded-lg text-3xl ${props.bgColor}`}>
//                 ⚖
//             </div>
//             <div className="flex flex-col gap-1">
//                 <h2 className="font-bold text-xl">
//                     {props.title}
//                 </h2>
//                 <p className="mb-2 text-gray-700">
//                     {props.description}
//                 </p>
//                 <p className="">
//                     Utiliser l'outil
//                 </p>
//             </div>
//         </article>
//     )
// }

export default function CardSection(props: { bgColor: string, emoji: string, title: string, description: string }) {
    return (
        <>
            {/* <article className="flex flex-row gap-4 p-4 m-3 border border-gray-300 rounded-xl shadow-xl bg-white hover:translate-1 cursor-pointer duration-120 ease-in-out">
                <div className={`p-3 size-fit rounded-lg text-3xl ${props.bgColor}`}>
                    {props.emoji}
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-xl">
                        {props.title}
                    </h2>
                    <p className="mb-2 text-gray-700">
                        {props.description}
                    </p>
                    <p className="">
                        Utiliser l'outil
                    </p>
                </div>
            </article> */}
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