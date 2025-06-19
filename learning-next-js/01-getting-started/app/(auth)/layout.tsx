export default function({ children }: {
    children: React.ReactNode
}) {
    return <div className="">
        <div className="text-xl flex justify-center font-black p-5 border-b">
            Log in or sign up now to get 30% off
        </div>
        {children}
    </div>
}