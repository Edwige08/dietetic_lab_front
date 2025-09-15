import DEJAdult from "@/components/DEJAdult";
import DEJInformation from "@/components/DEJInformation";

export default function Home() {
    return (
        <div className="flex flex-col items-center pt-10">
            <DEJAdult />
            <DEJInformation />
        </div>)
}