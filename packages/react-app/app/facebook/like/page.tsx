import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FacebookLikePage() {
  return (
    <main className="p-2">
      {/* // TODO: Add back button */}
      <div className="text-xl font-bold">Like & Follow on Facebook</div>
      <p className="text-sm text-muted-foreground">
        Provide the URL of your Facebook business page where your customers can
        like and follow.
      </p>
      
      <form className="flex flex-col space-y-4 mt-4">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Social link</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              required
              type="url"
              pattern="^(https?:\/\/)?(facebook\.com)$"
            />
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-lg">Points to earn</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="url">Points</Label>
            <Input id="url" type="number" required defaultValue={50} />
          </CardContent>
        </Card>

        <div className="flex justify-end">

        <Button type="submit" className="w-fit">Add</Button>
        </div>
      </form>
    </main>
  );
}
