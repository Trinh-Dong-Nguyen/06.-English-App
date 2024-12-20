export default function EmptyLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen flex-1 bg-white">{children}</div>
}
