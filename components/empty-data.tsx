export default function EmptyData({
  text = "No Data Available",
}: {
  text?: string;
}) {
  return (
    <div className="text-lg lg:text-2xl xl:text-3xl font-bold">{text}</div>
  );
}
