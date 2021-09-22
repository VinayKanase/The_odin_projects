import React from "react";
import "../css/Preview.css";
import templateData from "../data";
import "../css/Preview.css";
import location from "../assets/location.png";
function Preview() {
  return (
    <div className="preview">
      <div className="preview__page page-1">
        <div className="preview__personalInformation">
          <div className="heading name">{templateData.name}</div>
          <div className="short_description">
            {templateData.short_description}
          </div>
          <div className="other_information">
            {templateData.phoneNo ? (
              <div className="phoneNo">
                <i className="icon icon-phone"></i>
                {templateData.phoneNo}
              </div>
            ) : (
              ""
            )}
            <div className="email">
              <i className="icon icon-email"></i>
              <a href={"mailto:" + templateData.email}>{templateData.email}</a>
            </div>
            {templateData.github ? (
              <div className="github_website">
                <i className="icon icon-browser"></i>
                <a href={templateData.github}>{templateData.github}</a>
              </div>
            ) : (
              ""
            )}
            {templateData.location ? (
              <div className="location">
                <img src={location} className="icon-location" />
                {templateData.location}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="preview__wrapper">
          <div className="preview__left">
            <div className="preview__experience">
              <div className="heading sub_heading">Experience</div>
              <div className="hr"></div>
              {templateData.experience.map((data, index) => (
                <div className="exp_container" key={index}>
                  <div className="exp_heading">{data.post}</div>
                  <div className="exp_companyName">{data.company}</div>
                  <div className="inline-wrapper">
                    <div className="exp_dates">
                      <i className="icon_calendar"></i>
                      <span className="date">{data.joining_year}</span>-
                      <span className="date">{data.leaving_year}</span>
                    </div>
                    <div className="location">
                      <img src={location} className="icon-location" />
                      {templateData.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="preview_passions">
              <div className="heading sub_heading">Passions</div>
              <div className="hr"></div>
              {templateData.passions.map((data, index) => (
                <div className="passion" key={index}>
                  <div className="passion_name">{data}</div>
                  <div className="br_dashed"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="preview__right">
            <div className="heading sub_heading">Education</div>
            <div className="hr"></div>
            {templateData.education.map((data, index) => (
              <div className="edu_container" key={index}>
                <div className="edu_left">
                  <div className="edu_heading">{data.degree}</div>
                  <div className="edu_university">{data.university}</div>
                  <div className="edu_dates">
                    <i className="icon_calendar"></i>
                    <span className="date">{data.joining_year}</span>-
                    <span className="date">{data.leaving_year}</span>
                  </div>
                </div>
                <div className="vr"></div>
                <div className="edu_right">
                  <div className="edu_score">Score</div>
                  <div className="inline-wrapper">
                    <span className="obtained">{data.scoreObtained}</span>
                    <span>/</span>
                    <span className="total">{data.outOf}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="techLanguages">
              <div className="heading sub_heading">Tech Languages</div>
              <div className="hr"></div>
              <div className="languages">
                {templateData.techLanguages.map((data, index) => (
                  <span className="language" key={index}>
                    {data}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
