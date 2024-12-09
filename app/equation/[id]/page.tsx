import { Container, Header, Result } from "@/components/shared";
import { notFound } from "next/navigation";

export default function Home({ params: { id } }: { params: { id: string } }) {
  if (id !== "1" && id !== "2" && id !== "3" && id !== "4" && id !== "5")
    return notFound();
  return (
    <Container>
      <Header id={id} />
      <Result id={id} />
    </Container>
  );
}
