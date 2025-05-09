import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Hello World!</CardTitle>
          <CardDescription>
            Practice problem for first video in Python for Beginners playlits!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Learn how to write simple Hello World program in Python!</p>
        </CardContent>
        <CardFooter>
          <p>Try It!</p>
        </CardFooter>
      </Card>
    </main>
  );
}
