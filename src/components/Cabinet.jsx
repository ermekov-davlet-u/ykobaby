import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useTable, usePagination } from "react-table";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "../styles/Cabinet.css";
import { useTranslation } from "react-i18next";

const Cabinet = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    const userName = Cookies.get("userName");
    const userPhone = Cookies.get("userPhone");

    if (!userName || !userPhone) {
      navigate("/");
      location.reload();
    } else {
      fetch("https://yokobaby-promo.kg/api/get_barcodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ telephone: userPhone }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data && Array.isArray(result.data)) {
            console.log(result.data);

            const transformedData = result.data.map((item) => ({
              code: item.barcode,
              product_name: item.name_product,
              prize: item.priz_name || "",
              registrationDate: item.date_system,
            }));
            setData(transformedData);
          } else {
            console.error("Ожидался массив в result.data, но получен:", result);
          }
        })
        .catch((error) => console.error("Ошибка при получении данных:", error));
    }
  }, [navigate]);

  const userName = Cookies.get("userName")
    ? decodeURIComponent(Cookies.get("userName"))
    : "Гость";

  const columns = useMemo(
    () => [
      { Header: "Код", accessor: "code" },
      { Header: "Продукты", accessor: "product_name" },
      { Header: "Приз", accessor: "prize" },
      { Header: "Дата регистрации", accessor: "registrationDate" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handlePageClick = ({ selected }) => {
    gotoPage(selected);
  };

  return (
    <div className="cabinet-container">
      <h1>{t("xz37")}</h1>
      <h2> {userName}!</h2>

      {/* Таблица */}
      <table {...getTableProps()} className="user-table">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ background: "#97459a" }}
                  key={column.id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => (
                  <td {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Пагинация */}
      <ReactPaginate
        previousLabel={"← Предыдущая"}
        nextLabel={"Следующая →"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Cabinet;
