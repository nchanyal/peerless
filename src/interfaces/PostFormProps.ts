export interface PostFormProps {
  itemName: string;
  pickupCountry: string;
  deliveryCity: string;
  imageUrl: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
