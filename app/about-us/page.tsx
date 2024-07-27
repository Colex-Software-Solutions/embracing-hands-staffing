import Image from "next/image";
import Footer from "../components/footer/footer";
import { Button } from "../components/ui/button";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-5xl font-bold mt-10">
        Changing the way
        <br />
        healthcare works together
      </p>
      <div className="text-left max-w-4xl mt-20 p-4">
        <br />
        <p>
          <span className="font-bold">Embracing Hands Healthcare Staffing</span>{" "}
          is a nurse owned and operated staffing agency that provide stellar
          healthcare staff to physician offices, hospitals, surgery centers,
          long-term care facilities and private duty services. Our qualified
          healthcare staff covers a variety of specialty services throughout the
          healthcare profession. We treat those we serve with kindness and
          compassion while exceeding their expectations and providing excellent
          customer service.
        </p>
        <div className="flex gap-5 mt-20">
          <div>
            <Image
              alt="Nurse typing"
              width={400}
              height={400}
              className="rounded-xl"
              src="/images/nurse-typing.jpg"
            />
          </div>
          <div className="flex-col max-w-xl">
            <p className="text-primary text-3xl font-bold">
              We Believe In
              <br />
              Action. Community. Quality.
            </p>
            <p className="font-light mt-5">
              At <span className="font-bold">Embracing Hands Staffing</span>,
              it’s our mission to grow and cultivate the world’s largest
              healthcare marketplace, a place where professionals can find
              meaningful work.
            </p>
            <Button variant="link" className="mt-5">
              {`Job Openings >`}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
