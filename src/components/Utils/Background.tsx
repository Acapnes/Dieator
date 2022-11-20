
const Background = () => {
  return (
    <video
      src="/background.mp4"
      autoPlay
      loop
      muted
      style={{
        position: "fixed",
        width: "100%",
        left: "50%",
        top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%,-50%)",
        zIndex: "-1",
        opacity:"100%"
      }}
    ></video>
  );
};

export default Background;
