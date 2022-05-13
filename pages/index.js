
import { Header, Hero } from "../components/"

const styles = {
  container: "h-screen bg-[#2A2550]"
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
    </div>
  )
}
