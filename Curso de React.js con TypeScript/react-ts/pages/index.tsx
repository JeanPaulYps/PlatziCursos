import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { LazyImage } from "@/components/LazyImage";
import { random } from "lodash";
import { MouseEventHandler, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const generateRandom = () => random(1,123);
const generateId = () => Math.random().toString(36).substring(2, 9);

export default function Home() {
  const [images, setImages] = useState<IFoxImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newIFoxImageItem: IFoxImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${generateRandom()}.jpg`,
    };

    setImages([...images, newIFoxImageItem]);
    window.plausible("Signup");
  };

  return (
    <>
      <Head>
        <title>Platzi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button onClick={addNewFox}>Add new fox</button>
        {images.map((image) => (
          <div key={image.id} className="p-4">
            <LazyImage
              src={image.url}
              width="320"
              height="auto"
              className="rounded bg-gray-300"
            />
          </div>
        ))}
      </main>
    </>
  );
}
