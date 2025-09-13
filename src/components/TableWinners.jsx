
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


const TableWinners = () => {
    const [rows, setRows] = useState([]); // Состояние для данных
    const [loading, setLoading] = useState(true); // Состояние для индикатора загрузки
    const [error, setError] = useState(null); // Состояние для обработки ошибок
  
    useEffect(() => {
      // Функция для загрузки данных
      const fetchData = async () => {
        try {
          const response = await fetch("https://yokobaby-promo.kg/api/get_winners", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json(); // Парсим JSON
          console.log("Ответ API:", data);
          setRows(data.data); // Обновляем состояние
        } catch (err) {
          setError(err.message); // Сохраняем ошибку
        } finally {
          setLoading(false); // Завершаем загрузку
        }
      };
  
      fetchData(); // Вызов функции
    }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только при монтировании
  
    // Если идет загрузка
    if (loading) {
      return <div>Загрузка...</div>;
    }
  
    // Если произошла ошибка
    if (error) {
      return <div>Ошибка: {error}</div>;
    }
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Номер телефона</TableCell>
              <TableCell>Промокод</TableCell>
              <TableCell>Приз</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.telephone.substring(0,9)}***</TableCell>
                <TableCell>{row.sms_text}</TableCell>
                <TableCell>{row.priz_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };


export default TableWinners;