import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modalform.css";
import vector from "../assets/Vector.svg";
import right from "../assets/right.svg";
import { axiosInstance } from "../api/Api";

function ModalForm({toggle, toggleChange}) {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    jobLocation: "",
    type: "",
    salaryFrom: "",
    salaryTo: "",
    deadline: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.position) newErrors.position = "Job title is required.";
    if (!formData.company) newErrors.company = "Company name is required.";
    if (!formData.jobLocation) newErrors.jobLocation = "Location is required.";
    if (!formData.type) newErrors.type = "Job type is required.";
    if (!formData.salaryFrom) newErrors.salaryFrom = "Salary From is required.";
    if (!formData.salaryTo) newErrors.salaryTo = "Salary To is required.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const jobData = {
      position: formData.position,
      company: formData.company,
      jobLocation: formData.jobLocation,
      jobType: formData.type,
      salaryRangeFrom: formData.salaryFrom,
      salaryRangeTo: formData.salaryTo,
      applicationDeadline: formData.deadline,
      description: formData.description,
      workMode: "Onsite",
    };

    try {
      await axiosInstance.post("/jobs", jobData);
      toggle();
      alert("Job posted successfully!");
      toggleChange();
      setFormData({
        position: "",
        company: "",
        jobLocation: "",
        type: "",
        salaryFrom: "",
        salaryTo: "",
        deadline: "",
        description: "",
      });
      localStorage.removeItem("jobDraft");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  const handleSaveDraft = () => {
    const draft = {
      position: document.getElementById("position").value,
      company: document.getElementById("company").value,
      jobLocation: document.getElementById("jobLocation").value,
      type: document.getElementById("type").value,
      salaryFrom: document.getElementById("salaryFrom").value,
      salaryTo: document.getElementById("salaryTo").value,
      deadline: document.getElementById("deadline").value,
      description: document.getElementById("description").value,
    };

    localStorage.setItem("jobDraft", JSON.stringify(draft));
    toggle();
    alert("Draft saved successfully!");
  };

  

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("jobDraft"));
    if (draft) {
      document.getElementById("position").value = draft.position || "";
      document.getElementById("company").value = draft.company || "";
      document.getElementById("jobLocation").value = draft.jobLocation || "";
      document.getElementById("type").value = draft.type || "";
      document.getElementById("salaryFrom").value = draft.salaryFrom || "";
      document.getElementById("salaryTo").value = draft.salaryTo || "";
      document.getElementById("deadline").value = draft.deadline || "";
      document.getElementById("description").value = draft.description || "";
    }
  }, []);

  return (
    <div className="fullPage">
      <div className="form">
        <h2>Create Job Opening</h2>
        <form onSubmit={handleSubmit}>
          <div className="formInput">
            <label htmlFor="position">Job Title</label>
            <input
              type="text"
              id="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Job Title"
            />
            {errors.position && <span className="error">{errors.position}</span>}
          </div>

          <div className="formInput">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Amazon, Microsoft, Swiggy"
            />
            {errors.company && <span className="error">{errors.company}</span>}
          </div>

          <div className="formInput">
            <label htmlFor="jobLocation">Location</label>
            <input
              type="text"
              id="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              placeholder="Choose Preferred Location"
            />
            {errors.jobLocation && (
              <span className="error">{errors.jobLocation}</span>
            )}
          </div>

          <div className="formInput">
            <label htmlFor="type">Job Type</label>
            <select id="type" value={formData.type} onChange={handleChange}>
              <option value="" disabled hidden>
                Select type
              </option>
              <option value="Internship">Internship</option>
              <option value="Fulltime">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.type && <span className="error">{errors.type}</span>}
          </div>

          <div className="formInput">
            <label htmlFor="salaryFrom">Salary Range</label>
            <div className="salary">
              <input
                type="text"
                id="salaryFrom"
                value={formData.salaryFrom}
                onChange={handleChange}
                placeholder="₹0"
              />
              <input
                type="text"
                id="salaryTo"
                value={formData.salaryTo}
                onChange={handleChange}
                placeholder="₹12,00,000"
              />
            </div>
            {(errors.salaryFrom || errors.salaryTo) && (
              <span className="error">
                {errors.salaryFrom || errors.salaryTo}
              </span>
            )}
          </div>

          <div className="formInput">
            <label htmlFor="deadline">Application Deadline</label>
            <input
              type="date"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
            {errors.deadline && (
              <span className="error">{errors.deadline}</span>
            )}
          </div>

          <div className="formTextarea">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please share a description to let the candidate know more about the job role"
            ></textarea>
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="btn-grp">
            <button type="button" className="save" onClick={handleSaveDraft}>
              Save Draft <img src={vector} alt="draft" />
            </button>
            <button type="submit" className="publish">
              Publish <img src={right} alt="publish" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
