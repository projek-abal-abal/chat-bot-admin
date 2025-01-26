import Image from "next/image";
import HomeButton from "./_components/home-button";

export default function Home() {
  return (
    <main className="grid grid-cols-2 gap-x-16 w-full max-w-7xl mx-auto text-white h-[calc(100vh-90px)] mt-[90px]">
      <div className="flex flex-col gap-y-8 justify-center">
        <h1 className="font-bold text-6xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing.
        </h1>
        <p className="font-medium text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
          voluptatibus inventore excepturi officia voluptate maiores aut
          recusandae provident quo asperiores.
        </p>
        <HomeButton />
      </div>
      <div className="flex items-center justify-center">
        <Image
          width={1000}
          height={1000}
          alt="ilustration"
          src={"/image/rb_18490.png"}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </main>
  );
}
