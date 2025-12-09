import clsx from "clsx";
import { sidebarItems } from "@/constants/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname.split("/")[1])
  return (
    <nav className=" flex flex-col border border-l font-semibold sm:min-w-52">
      {sidebarItems.map((item, key) => (
        <span
          key={key}
          onClick={() => {
            navigate(`/${item.path}`);
          }}
          className={clsx(
            "hover:bg-slate-100 px-10 py-3 cursor-pointer select-none",
            location.pathname.split("/")[1] === item.path && "bg-slate-100"
          )}
        >
          {item.title}
        </span>
      ))}
    </nav>
  );
}
