import { Button } from "../ui/button";

interface SearchInputProps {
  placeholder?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput({ placeholder, search='', setSearch }: SearchInputProps) {
  return (
    <div className="flex flex-row items-center border rounded-3xl p-1 shadow-sm">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="outline-none px-3"
      />

      <Button className="rounded-4xl" variant="outline">
        Tìm kiếm
      </Button>
    </div>
  );
}
