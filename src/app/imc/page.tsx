import IMCForm from "@/components/IMCForm";
import IMCInformation from "@/components/IMCInformation";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <IMCForm />
            <IMCInformation />
        </div>
    )
}