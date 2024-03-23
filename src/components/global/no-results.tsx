import Image from "next/image";

export default function NoResults(props: {
  src: string;
  alt: string;
  text: string;
  size?: number;
}) {
  return (
    <div className="my-10 flex flex-col items-center space-y-3">
      <Image
        src={props.src}
        width={props.size ?? 125}
        height={props.size ?? 125}
        alt={props.alt}
      />
      <p className="text-center text-sm text-muted-foreground">{props.text}</p>
    </div>
  );
}
