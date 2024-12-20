export default function HrButton({ label }: { label: string }) {
  return (
    <button className="group relative overflow-hidden rounded-md bg-black px-3 py-2 text-sm transition-all">
      <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/15 transition-all duration-300 ease-out group-hover:translate-y-20"></span>
      <span className="font-semibold text-white">{label}</span>
    </button>
  )
}
