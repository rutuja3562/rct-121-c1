import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./App.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [salaryorder, setSalaryorder] = useState("ASC");
  
  
  useEffect(() => {
    setLoading(true);
    fetchData({ salaryorder, page });
  }, [salaryorder, page]);


  const fetchData = ({ salaryorder, page }) => {
    axios({
      method: "get",
      params: {
        _sort: "salary",
        _order: `${salaryorder}`,
        _page: page,
        _limit: 5,
      },
      url: "https://json-server-mocker-masai.herokuapp.com/candidates",
      // url: "http://localhost:8080/candidates",
    })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };
  return (
    <div className="App">
      <div>
        {loading && <div id="loading-container">...Loading</div>}
        {salaryorder === "ASC" ? (
          <Button
            id="SORT_BUTTON"
            title={`Sort by Descending Salary`}
            onClick={() =>
              salaryorder ? setSalaryorder("DESC") : setSalaryorder("ASC")
            }
          />
        ) : (
          <Button
            id="SORT_BUTTON"
            title={`Sort by Ascending Salary`}
            onClick={() =>
              salaryorder ? setSalaryorder("ASC") : setSalaryorder("DESC")
            }
          />
        )}
        <Button
          disabled={page === 1}
          title="PREV"
          id="PREV"
          onClick={() => setPage(page - 1)}
        />
        <Button id="NEXT" title="NEXT" onClick={() => setPage(page + 1)} />
      </div>
      {data.map((item) => {
        return <CandidateCard key={item.id} {...item} />;
      })}
    </div>
  );
}
