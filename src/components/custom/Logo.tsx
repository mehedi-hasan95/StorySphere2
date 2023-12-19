import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-x-1">
      <Image
        src="/logo.svg"
        alt="StorySphere"
        height={500}
        width={500}
        className="h-12 w-10"
      />
      <span className="font-bold text-md md:text-lg">StorySphere</span>
    </Link>
  );
};

export default Logo;
