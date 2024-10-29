interface Props {
  opacity: number;
  src: string;
}

const BackGround = ({ opacity, src }: Props) => {
  return (
    <video
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        overflow: "hidden",
        opacity: opacity,
        zIndex: -1,
      }}
      src={src}
      autoPlay
      muted
      loop
    />
  );
};

export default BackGround;
