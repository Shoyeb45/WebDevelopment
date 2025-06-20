import Spinner from "@/components/Spinner";


export default function Loader() {
    return (
        <div className="flex justify-center items-center h-[100vh] bg-blue-200">
            <Spinner />
        </div>
    )
}