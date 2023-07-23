import Image from "next/image";

export default function Home() {
  return (
    <header>
      <div>
        <Image
          src="/hxnCodes.png"
          width={300}
          height={300}
          alt="hxnCodes logo"
        />
      </div>
    </header>
  );
}
