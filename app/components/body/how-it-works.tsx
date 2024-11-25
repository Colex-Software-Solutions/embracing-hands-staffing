interface HowItWorksItemType {
  title: string;
  description: string;
}

const HowItWorks = () => {
  const howItWorksItems: HowItWorksItemType[] = [
    {
      title: "Sign up to get Job Notifications",
      description:
        "Once accepted, you’ll automatically begin to receive job requests in your area.",
    },
    {
      title: "Book jobs on your schedule",
      description:
        "Only work when it works for you. There’s no minimum hourly commitment.",
    },
    {
      title: "Get paid fast",
      description:
        "Your earnings automatically get deposited multiple times per week.",
    },
  ];

  return (
    <div className="flex-col item-center text-center bg-secondary py-20 mt-10 w-full overflow-hidden">
      <p className="text-4xl text-primary">How it works</p>
      <div className="flex mt-10 gap-5 justify-center flex-col sm:flex-row items-center">
        {howItWorksItems.map((howItWorksItem) => (
          <HowItWorksItem
            key={howItWorksItem.title}
            howItWorksItems={howItWorksItem}
          />
        ))}
      </div>
    </div>
  );
};

interface HowItWorksItemProps {
  howItWorksItems: HowItWorksItemType;
}

const HowItWorksItem: React.FC<HowItWorksItemProps> = ({ howItWorksItems }) => {
  const { title, description } = howItWorksItems;
  return (
    <div className="flex-col w-80">
      <p className="font-bold text-xl">{title}</p>
      <p className="mt-5 font-light">{description}</p>
    </div>
  );
};

export default HowItWorks;
