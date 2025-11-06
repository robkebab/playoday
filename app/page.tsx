import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}
