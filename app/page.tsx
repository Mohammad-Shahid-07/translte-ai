import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center flex-col p-24 bg-[#212121]">
      <h1 className="text-white text-6xl font-black text-center">
        Translate your thoughts to any lagnuage with the power of ai{" "}
      </h1>
      <p className="text-gray-500   mt-5">
        No Credit card no singup needed just start translating write now
      </p>
      <Link
        href={"/chat"}
        className="group mt-10 group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
      >
        Translate Now
      </Link>
    </main>
  );
}
