export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      {/* Gradient blobs */}
      <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-glow-blue blur-3xl opacity-60 animate-float-slow" />
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-glow-orange blur-3xl opacity-40 animate-float-slow" />
      <div className="absolute bottom-0 left-1/4 w-[480px] h-[480px] rounded-full bg-glow-blue blur-3xl opacity-25 animate-float" />

      {/* Fine noise texture for premium feel */}
      <div className="absolute inset-0 bg-noise" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/0 via-ink-950/0 to-ink-950" />
    </div>
  )
}
