import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  wide?: boolean;
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {photos.map((photo) => (
        <div
          key={photo.src}
          className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-green-100 shadow-sm ${
            photo.wide ? "col-span-2" : ""
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              photo.wide
                ? "(min-width: 640px) 66vw, 100vw"
                : "(min-width: 640px) 33vw, 50vw"
            }
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
