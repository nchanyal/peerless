import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCardProps } from "@/interfaces/PostCardProps";

export default function PostCard({
  title,
  imageUrl,
  pickupCountry,
  deliveryCity,
}: PostCardProps) {
  return (
    <Card className="hover:cursor-pointer hover:bg-gray-50">
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
