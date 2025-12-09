import { SquarePen } from "lucide-react";

interface Service {
  name?: string;
  price?: number;
  unit?: string;
  quantity?: number;
}

type ServiceCardProps = {
  data: Service;
};
export default function ServiceCard({ data }: ServiceCardProps) {
  return (
    <div className=" relative border border-slate-50 shadow-sm rounded-2xl py-2 px-5">
      <div className=" absolute top-3 right-3">
        <SquarePen className="text-yellow-600" />
      </div>
      <span className="text-gray-500 text-sm">Dịch vụ</span>
      <p className=" text-lg font-medium">{data.name}</p>
      <div className="flex flex-row gap-2">
        <span className="">Đơn giá:</span>
        <span className="text-red-700">
          {data?.price?.toLocaleString("vi-VN")}đ
          <span className="text-black">{data.unit&&`/${data.unit}`}</span>
        </span>
      </div>
    </div>
  );
}
