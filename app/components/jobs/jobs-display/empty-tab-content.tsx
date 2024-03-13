const EmptyTabContent = () => {
  return (
    <div className="flex flex-col text-center p-10 gap-3">
      <p className="font-bold">No shifts at this time</p>
      <p className="text-gray-400">
        Watch for shifts and promptly respond to notifications as they become
        available.
      </p>
    </div>
  );
};

export default EmptyTabContent;
