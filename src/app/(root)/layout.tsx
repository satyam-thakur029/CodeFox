import StreamClientProvider from "@/components/providers/StreamCilentProvider"

function Layout({ children }: { children: React.ReactNode }) {
  return <StreamClientProvider>{children}</StreamClientProvider>;
}
export default Layout;