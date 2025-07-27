import { prisma } from "@repo/database/dbClient"
export default async function Home() {
  const data = await prisma.user.findFirst();
  return (
    <main>
      <h1>Welcome to Excalidraw!</h1>
      <p>Data from database: {JSON.stringify(data)}</p>
    </main>
  )
}
