import { TbFolder } from "react-icons/tb";

export default function FolderIcon({ color = "blue" }) {
  return (
    <TbFolder size={40} className={`text-${color}-500`} />
  );
}