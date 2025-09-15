import IngestaForm from "@/components/IngestaForm";
import IngestaInformation from "@/components/IngestaInformation";

export default function Home() {
    return (
        <div className="flex flex-col items-center pt-10">
            <IngestaForm />
            <IngestaInformation />
        </div>
    )
}