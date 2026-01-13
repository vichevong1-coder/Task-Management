import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">TaskMaster</h1>
          <p className="text-muted-foreground">Your productivity companion</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
