export interface Post {
  id: number;
  authorId: number;
  claimerId: number | null;
  itemName: string;
  imageUrl: string;
  pickupCountry: string;
  deliveryCity: string;
}
