export default function TitleTwo(props: { text: string }) {
    return (
        <h1 className="py-4 font-bold text-xl">
            {props.text}
        </h1>
    )
}