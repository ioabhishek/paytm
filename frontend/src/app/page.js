import Header from "@/components/Header"
import Users from "@/components/Users"

export default function Home() {
  return (
    <main className=" max-w-screen-xl mx-auto">
      <Header />
      <div className="p-10">Your Balance $5000</div>
      <Users />
    </main>
  )
}
