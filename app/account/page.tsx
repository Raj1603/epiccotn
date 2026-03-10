import { redirect } from "next/navigation"

export default function AccountPage() {
    // Redirect to dashboard (authenticated area)
    redirect("/dashboard")
}
