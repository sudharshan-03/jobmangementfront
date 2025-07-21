import React from "react";
import "../styles/card.css";
import logo from "../assets/amazon.png";
import year from "../assets/year.svg";
import build from "../assets/build.svg";
import salary from "../assets/salary.svg";

function Card({ job }) {
  const { image, position, salaryRangeTo, description } = job;

  return (
    <>
      <div className="cardContainer">
        <div className="imageContent">
          <div className="imgContainer">
            <img src={`http://localhost:5000/logos/${job.image.split("/").pop()}`} alt="logo" />
          </div>
          <div className="time">24h Ago</div>
        </div>
        <h2 className="heading">{position}</h2>
        <div className="details">
          <div className="detail">
            <img src={year} />
            <p>1-3 yr Exp</p>
          </div>
          <div className="detail">
            <img src={build} />
            <p>Onsite</p>
          </div>
          <div className="detail">
            <img src={salary} />
            <p>12LPA</p>
          </div>
        </div>

        <ul className="description">
          {description.split('. ').map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>

        <button className="apply">Apply Now</button>
      </div>
    </>
  );
}

export default Card;
