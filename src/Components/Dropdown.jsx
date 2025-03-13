import useDropdown from "../CustomHook/useDropDown";

const Dropdown = ({ title, items, renderItem }) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div
      className="relative translate-z-0 transform hover:cursor-pointer max-sm:px-5"
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <button className="relative translate-z-0 transform bg-black px-2 py-[1px] pr-10 text-white outline-1 outline-white hover:cursor-pointer hover:bg-[rgba(255,255,255,0.3)]">
        {title}
      </button>
      {isOpen && (
        <ul className="fade-in max-sm:text-md absolute top-[27px] flex w-full max-w-full flex-col flex-wrap gap-x-4 bg-black px-3 text-white max-sm:flex-row min-sm:max-h-50">
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
