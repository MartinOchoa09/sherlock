import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import logo from "../../assets/images/logo.png";
import '../../assets/css/sherlock.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Homesherlock() {
  const [rowData, setRowData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('nombre');
  const [filteredData, setFilteredData] = useState([]);
  const [searchResultsCount, setSearchResultsCount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/database/data.xlsx');
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (event) => {
          const binaryString = event.target.result;
          const workbook = XLSX.read(binaryString, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          const headers = jsonData[0];
          const rows = jsonData.slice(1);

          const formattedData = rows.map((row) => {
            const rowData = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index];
            });
            return rowData;
          });

          setRowData(formattedData);
          setFilteredData(formattedData);
        };

        reader.readAsBinaryString(blob);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = [];
  
    if (activeSearch === 'nombre') {
      filteredData = rowData.filter(row => {
        const columnValue = row['   Nombre Contacto '];
        return typeof columnValue === 'string' && columnValue.toLowerCase().includes(searchTerm.toLowerCase());
      });

      setSearchResultsCount(filteredData.length);
  
      if (filteredData.length === 0) {
        console.log("No se encontró ningún nombre.");
      }
    }
  
    setFilteredData(filteredData);
  }, [rowData, searchTerm, activeSearch]);
  
  const handleNameSearchChange = (e) => {
    setActiveSearch('nombre');
    setSearchTerm(e.target.value);
  };
  

  const columnDefs = rowData.length > 0 ? Object.keys(rowData[0]).map((key) => ({
    headerName: key,
    field: key
  })) : [];

  return (
    <div>
        <Link to="/">
        <button className='buttonreturn'>
          <span>Regresar</span>
        </button>
      </Link>
        <div className="input-group mb-3">
            <div>
                <img src={logo}  className='logo' alt="logo" />
                <p className='sherlock'>SHERLOCK</p>
            </div>
            <span className="input-group-text" id="basic-addon2">Ingrese nombre a buscar: </span>
            <input type="text" className="form-control" placeholder="Ejemplo Lic Cristian" aria-label="Nombre contacto" aria-describedby="basic-addon1" value={activeSearch === 'nombre' ? searchTerm : ''} onChange={handleNameSearchChange} />
            <div className="search-results-count">
              {searchResultsCount > 0 && <p className='result'>{`Se encontraron ${searchResultsCount} resultado(s)`}</p>}
            </div>
        </div>

        <div className="ag-theme-alpine" style={{ height: 350, width: 800 }}>
            <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            pagination={true}
            />
        </div>
    </div>

  );
}

export default Homesherlock;