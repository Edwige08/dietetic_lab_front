export default function Title(props: { text: string }) {
    return (
        <h1 className="py-4 font-bold text-center text-2xl text-(--greenColor)">
            {props.text}
        </h1>
    )
}