type Service = {
  name: string;
  price: number;
  unit: string;
  quantity: number;
  total: number;
};

type Tenant = {
  name: string;
  checkIn: string;
  checkOut: string;
};
type RoomCardProps = {
  id: number;
  roomNumb: string;
  floor: number;
  images: string[];
  size: number;
  price: number;
  status: string;
  category: string;
  note: string;
  currentTenant: Tenant | null;
  amenities: string[];
  service: Service[];
};
export default function RoomCard({ room }: { room?: RoomCardProps }) {
  return (
    <div className=" rounded-2xl border shadow-xs py-2 px-5">
      <p>Phòng: {room?.roomNumb}</p>
      <p>Tầng: {room?.floor}</p>
      <p>Kích thước: {room?.size}</p>
      <p>Trạng thái: {room?.status}</p>
      <p>Giá: {room?.price}</p>
    </div>
  );
}
