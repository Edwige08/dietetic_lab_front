import SRIForm from "@/components/SRIForm";
import SRIInformation from "@/components/SRIInformation";

export default function Home() {
    return (
        <div className="flex flex-col items-center pt-10">
            <SRIForm />
            <SRIInformation />
        </div>
    )
}