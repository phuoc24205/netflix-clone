import useDropdown from "../CustomHook/useDropDown";

const Dropdown = ({ title, items, renderItem }) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div
      className="relative hover:cursor-pointer max-sm:px-5"
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <button className="relative z-[-1] items-center bg-black px-2 py-[1px] pr-10 text-white outline-1 outline-white hover:cursor-pointer hover:bg-[rgba(255,255,255,0.3)]">
        {title}
      </button>
      {isOpen && (
        <ul className="fade-in max-sm:text-md absolute top-[27px] z-0 flex max-h-50 flex-col flex-wrap gap-x-4 bg-black px-3 text-white max-sm:flex-row">
          {items.map((item) => (
            <li key={item.id} className="inline-block w-auto">
              <span onClick={() => console.log(item.name)} className="">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
