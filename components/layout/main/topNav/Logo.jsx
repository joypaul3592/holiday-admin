export default function Logo({ openMenu }) {
  return (
    <div className="h-full">
      <div className="relative h-full center hidden sm:block ani3 text-xl font-semibold text-primary w-fit ">
        <h2>S.A.C </h2>{" "}
        <span
          className={`text-gray-700 dark:text-gray-200 absolute ani3   ${!openMenu ? "right-[-4.8rem] opacity-0 invisible" : "-right-[5.8rem] opacity-100 visible"}`}
        >
          Holidays
        </span>
      </div>
    </div>
  );
}
