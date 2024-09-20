import Image from "next/image";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex-grow flex flex-row">
      <div className="md:w-[50vw] md:flex hidden relative">
        <Image
          src="/images/homebanner.jpg"
          fill
          alt="Picture from web"
          className="object-cover object-left"
        />
      </div>
      <div className="flex items-center justify-center p-[100px] md:w-[50vw]">
        {children}
      </div>
    </div>
  );
}
