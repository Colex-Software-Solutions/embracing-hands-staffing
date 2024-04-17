import Image from "next/image";
import ContructionImage from "../../public/constuction.svg";

const WorkInProgressPage = () => {
  return (
    <div className="flex bg-white justify-center items-center">
      <div className="flex flex-col text-center">
        <Image
          src={ContructionImage}
          alt="Construction"
          width={500}
          height={100}
        />
        <p className="text-3xl font-bold">We are still working on this page!</p>
      </div>
    </div>
  );
};

export default WorkInProgressPage;
