interface StatCard {
  title: string,
  value: string
}

const StatCard = ({ title, value }: StatCard) => {
  return (
    <div className="card p-6 cursor-pointer">
      <h3 className="text-sm text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatCard;