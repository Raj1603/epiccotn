import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthCodeError() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Authentication Error</h1>
                <p className="text-lg text-gray-600">
                    There was an issue verifying your login information. This can happen if the link you clicked has expired or is invalid.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/login">Try Logging In Again</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
