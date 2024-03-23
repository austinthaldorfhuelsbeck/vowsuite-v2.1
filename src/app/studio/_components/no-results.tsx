import Image from "next/image";

export default function NoResults(props: {
  src: string;
  alt: string;
  text: string;
}) {
  return (
    <div className="my-10 flex flex-col items-center space-y-3">
      <Image src={props.src} width={125} height={125} alt={props.alt} />
      <p className="text-center text-sm text-muted-foreground">{props.text}</p>
    </div>
  );
}
