import { Button } from "../ui/button";
import SignUpButton from "./sign-up-button";

const UserReviewBanner = () => {
  return (
    <div className="flex justify-center bg-secondary shadow-lg mt-20 rounded-xl">
      <div className="flex-col text-center py-5 px-10">
        <p className="font-light text-xl mt-5">- BRIDGETT, REGISTERED NURSE</p>
        <p className="font-bold text-primary text-3xl mt-5">
          The higher pay and flexibility I get through
          <br />
          Embracing Hands is essential to doing the jobs that I love
        </p>
        <SignUpButton className="mt-5" />
      </div>
    </div>
  );
};

export default UserReviewBanner;
