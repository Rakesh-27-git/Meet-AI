import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Meet AI</h1>
      <Button variant="destructive">Get Started</Button>
    </div>
  );
}
