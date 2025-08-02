export default function ButtonGreen(props: { type?: "submit" | "button", text: string }) {
    return (
        <button
            type={props.type}
            className="p-2 rounded-lg font-bold bg-(--greenColor) shadow-lg hover:bg-(--greenSecondColor) cursor-pointer"
            >
            {props.text}
        </button>
    )
}