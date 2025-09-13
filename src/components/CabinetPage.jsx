import Cabinet from "./Cabinet";
import Footer from "./Footer";
import Header from "./Header";

const CabinetPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Cabinet />
        <Footer />
      </div>
    </>
  );
};

export default CabinetPage;
