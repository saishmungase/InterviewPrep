import Webcam from "react-webcam";

export const Video = () => {
  return (
    <div className="item b h-[100%] justify-center items-center" data-swapy-item="b">
      <Webcam className="rounded-2xl h-full w-full" />
    </div>
  );
}