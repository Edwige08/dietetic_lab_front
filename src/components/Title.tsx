export default function Title(props: { text: string }) {
    return (
        <h1 className="py-4 font-bold text-center text-3xl text-(--greenSecondColor)">
            {props.text}
        </h1>
    )
}