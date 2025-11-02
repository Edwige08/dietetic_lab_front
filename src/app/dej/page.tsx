import DEJAdult from "@/components/DEJAdult";
import DEJInformation from "@/components/DEJInformation";

export default function Home() {
    return (
        <div className="flex flex-col items-center pt-2">
            <DEJAdult />
            <DEJInformation />
        </div>)
}