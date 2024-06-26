import { useRef } from "react";
import { useGlobalContext } from "./Context";
import sublinks from "./data";

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();

  const submenuContainer = useRef(null);

  const currentPage = sublinks.find((item) => item.pageId === pageId);

  const handleMouseLeave = (e) => {
    const submenu = submenuContainer.current;
    const result = submenu.getBoundingClientRect();
    const { left, right, bottom } = result;
    const { clientX, clientY } = e;

    if (clientX < left + 1 || clientX > right || clientY > bottom) {
      setPageId(null);
    }
  };

  return (
    <div
      className={currentPage ? "submenu show-submenu" : "submenu"}
      onMouseLeave={handleMouseLeave}
      ref={submenuContainer}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          gridTemplateColumns:
            currentPage?.links?.length > 3 ? "1fr 1fr" : "1fr",
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;
          return (
            <a key={id} href={url}>
              {icon} {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default Submenu;
