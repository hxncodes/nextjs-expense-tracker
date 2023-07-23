import Image from "next/image";
import { ImStatsBars } from "react-icons/im";

export default function Nav() {
  return (
    <header className="container mx-auto max-w-2xl px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex rounded-full items-center gap-2">
          <Image
            className="rounded-full"
            src="/hxnCodes.png"
            width={40}
            height={40}
            alt="hxnCodes logo"
          />
          <h2>hxnCodes</h2>
        </div>
        <nav className="flex items-center gap-2">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
