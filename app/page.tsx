export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Play O&apos;Day</h1>
        <p className="text-lg text-muted-foreground mb-8">Share music with friends, every day</p>
        <a
          href="/login"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Get Started
        </a>
      </div>
    </main>
  )
}
