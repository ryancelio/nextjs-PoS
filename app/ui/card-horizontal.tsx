import Card from "./card";

export default function HorizontalCard() {
  const images = [
    {
      src: '/HeroImgs/The Witcher.png',
      alt: "The Witcher Img",
      title: "The Witcher",
      href: "#",
    },
    {
        src: '/HeroImgs/The Witcher.png',
        alt: "The Witcher Img",
        title: "The Witcher",
        href: "#",
      },
    {
        src: '/HeroImgs/The Witcher.png',
        alt: "The Witcher Img",
        title: "The Witcher",
        href: "#",
      },
      {
        src: '/HeroImgs/The Witcher.png',
        alt: "The Witcher Img",
        title: "The Witcher",
        href: "#",
      },
      {
          src: '/HeroImgs/The Witcher.png',
          alt: "The Witcher Img",
          title: "The Witcher",
          href: "#",
        },
      {
          src: '/HeroImgs/The Witcher.png',
          alt: "The Witcher Img",
          title: "The Witcher",
          href: "#",
        },
        {
          src: '/HeroImgs/The Witcher.png',
          alt: "The Witcher Img",
          title: "The Witcher",
          href: "#",
        },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-7 md:grid-cols-4 pt-2 mt-5 place-items-center">
      {images.map((img) => {
        return (
          <Card imageParams={{
              src: img.src,
              alt: img.alt,
              title: img.title,
              href: img.href,
            }
        }
        key= {img.title}
          />
        );
      })}
    </div>
  );
}
