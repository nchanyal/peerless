import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostCardProps {
  title: string;
  imageUrl: string;
  pickupCountry: string;
  deliveryCity: string;
}

export default function PostCard({
  title,
  imageUrl,
  pickupCountry,
  deliveryCity,
}: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Pickup Country: {pickupCountry}</p>
        <p>Delivery City: {deliveryCity}</p>
      </CardContent>
    </Card>
  );
}
