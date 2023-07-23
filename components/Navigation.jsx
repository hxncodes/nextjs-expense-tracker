import Image from "next/image";
import { ImStatsBars } from "react-icons/im";

export default function Nav() {
  return (
    <header className="flex items-center justify-between py-6">
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
      <nav className="flex items-center gap-4">
        <div>
          <ImStatsBars className="text-2xl" />
        </div>
        <div>
          <button className="btn btn-danger">Sign out</button>
        </div>
      </nav>
    </header>
  );
}
