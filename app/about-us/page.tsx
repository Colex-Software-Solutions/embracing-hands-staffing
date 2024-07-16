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
        <p className="font-bold text-3xl">Our Story</p>
        <br />
        <p>
          As the Director of Nursing at an outpatient surgical center, Angie was
          always frustrated trying to staff the surgical suite. Since agencies
          were too costly, Angie spent countless hours daily just trying to find
          qualified per diem nurses.
        </p>
        <br />
        <p>
          In 2015, we came up with a simple idea to close this staffing gap with
          technology making the process transparent and more cost-effective.
          What started as an idea to simplify how surgical centers filled jobs
          has become part of so many administrator’s daily routines.
        </p>
        <br />
        <p>
          <b>Embracing Hands Staffing </b> empowers healthcare professionals
          with flexible scheduling and a fresh new way to earn more money
          through our app. For the healthcare facilities, we help save valuable
          time, resources, and money. As a result, the facilities can see more
          patients while having optimal staffing ratios. When you make staffing
          reliable, everyone is happy!
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
