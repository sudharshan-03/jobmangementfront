import React, { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";
import "../styles/admin.css";
import { axiosInstance } from "../api/api";
import ModalForm from "./ModalForm";

function Admin() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);

  const toggleShow = () => setShow(!show);
  const toggleChange = () => setChange(!change);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get("/jobs");
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [change]);

  const handleFilterChange = (filters) => {
    const isEmpty =
      filters.title.trim() === "" &&
      filters.location.trim() === "" &&
      filters.jobType === "" &&
      filters.salary[0] === 0 &&
      filters.salary[1] === 1800000; // 150000 * 12

    if (isEmpty) {
      setFilteredJobs(jobs); // Show all jobs if filters are cleared
      return;
    }

    const filtered = jobs.filter((job) => {
      const titleMatch = job.position
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const locationMatch = job.jobLocation
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const typeMatch =
        filters.jobType === "" ||
        job.jobType.toLowerCase() === filters.jobType.toLowerCase();

      const salaryFrom = parseInt(job.salaryRangeFrom, 10);
      const salaryTo = parseInt(job.salaryRangeTo, 10);
      const [min, max] = filters.salary;

      const salaryMatch = salaryFrom >= min && salaryTo <= max;

      return titleMatch && locationMatch && typeMatch && salaryMatch;
    });

    setFilteredJobs(filtered);
  };

  return (
    <>
      <Header toggle={toggleShow} onFilterChange={handleFilterChange} />
      <main className="cards">
        {filteredJobs.map((job, index) => (
          <Card key={index} job={job} />
        ))}
      </main>

      {show && <div className="backgroundBlack"></div>}
      {show && <ModalForm toggle={toggleShow} toggleChange={toggleChange} />}
    </>
  );
}

export default Admin;
