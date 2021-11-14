import { Link, Outlet, useLocation } from "react-router-dom";

const DemoHeader = () => {
  const location = useLocation();
  return (
    <>
      <div
        style={{
          display: "flex",
          fontSize: "20px",
          fontWeight: 600,
          padding: 10,
          borderBottom: "1px solid #ccc"
        }}
      >
        <Link to="/">{"<"}</Link>
        <div style={{ flex: 1, textAlign: "center" }}>
          {location.pathname?.match(/.*\/(\w+)/)?.[1] ?? ""}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default DemoHeader;
