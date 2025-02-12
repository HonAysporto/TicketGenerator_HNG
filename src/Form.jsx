import React from "react";
import axios from "axios";
import "./Form.css";
import Navbar from "./Navbar";
import FileUpload from "./FileUpload";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";



const Form = () => {

  const location = useLocation();
  const noTicket = location.state?.noTicket || 0;
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



     const formik = useFormik({
          initialValues: {
            fullName: localStorage.getItem("fullName") || "",
            email: localStorage.getItem("email") || "",
            avatarUrl: localStorage.getItem("avatarUrl") || "",
          },
          validationSchema: Yup.object({
            fullName: Yup.string().required("Full Name is required."),
            email: Yup.string().email("Invalid email format").required("Email is required."),
            avatarUrl: Yup.string().url("Invalid URL format").required("Avatar is required."),
          }),
          onSubmit: (values) => {
            console.log("Form Submitted", values);
            localStorage.removeItem("fullName");
            localStorage.removeItem("email");
            localStorage.removeItem("avatarUrl");
            localStorage.setItem('userInput', JSON.stringify(values))
            navigate('/ticket');
          },
        });

   
        useEffect(() => {
          localStorage.setItem("fullName", formik.values.fullName);
          localStorage.setItem("email", formik.values.email);
          localStorage.setItem("avatarUrl", formik.values.avatarUrl);
        }, [formik.values]);



    const [file, setFile] = useState(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Hngticket");
      formData.append("cloud_name", "dkcod39ah");
      setLoading(true);
      axios
      .post("https://api.cloudinary.com/v1_1/dkcod39ah/image/upload", formData).then((response) => {
        const uploadedImageUrl = response.data.secure_url;
        setImageUrl(uploadedImageUrl); // Update state with Cloudinary URL
        formik.setFieldValue("avatarUrl", uploadedImageUrl); 
        formik.setFieldValue("noTicket", noTicket);
        
        
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        setLoading(false); // Stop loading
      });
     
    };

  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        handleFileChange({ target: { files: [droppedFile] } });
      }
    };
  

  return (
    <>
      <Navbar />

      <div className="form-container">
        <div className="form-body">
        <div className="title">
          <p>Attendee Details</p>
          <span>Step 2/3</span>
        </div>

        <div className="progress-bar">
        <div className="progress" style={{ width: "66%" }}></div>
        </div>

        <div className="main-form2">

        <div className="img_upload_div2">
          <p>Upload Profile Photo</p>

          <div className="upload2">
          <div
      className="upload-box"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => document.getElementById("fileInput").click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {loading && <div className="loader" aria-live="polite" ></div>}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
       {formik.touched.avatarUrl && formik.errors.avatarUrl && (
      <p id="avatarError" className="error" role="alert">{formik.errors.avatarUrl}</p>
    )}
      <div className="upload-content">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path d="M 24 10 C 17.72 10 12.551969 14.85 12.042969 21 L 11.5 21 C 6.813 21 3 24.813 3 29.5 C 3 34.187 6.813 38 11.5 38 L 16.634766 38 C 16.225766 37.417 16 36.727 16 36 C 16 35.654 16.066109 35.322 16.162109 35 L 11.5 35 C 8.467 35 6 32.533 6 29.5 C 6 26.467 8.467 24 11.5 24 L 13.5 24 C 14.329 24 15 23.329 15 22.5 L 15 22 C 15 17.038 19.038 13 24 13 C 28.962 13 33 17.038 33 22 L 33 22.5 C 33 23.329 33.671 24 34.5 24 L 36.5 24 C 39.533 24 42 26.467 42 29.5 C 42 32.533 39.533 35 36.5 35 L 31.837891 35 C 31.933891 35.322 32 35.654 32 36 C 32 36.727 31.774234 37.417 31.365234 38 L 36.5 38 C 41.187 38 45 34.187 45 29.5 C 45 24.813 41.187 21 36.5 21 L 35.957031 21 C 35.448031 14.85 30.28 10 24 10 z M 23.976562 23.978516 A 1.50015 1.50015 0 0 0 22.5 25.5 L 22.5 36.878906 L 20.560547 34.939453 A 1.50015 1.50015 0 1 0 18.439453 37.060547 L 22.810547 41.431641 A 1.50015 1.50015 0 0 0 25.197266 41.423828 L 29.560547 37.060547 A 1.50015 1.50015 0 1 0 27.439453 34.939453 L 25.5 36.878906 L 25.5 25.5 A 1.50015 1.50015 0 0 0 23.976562 23.978516 z"></path>
</svg>
        {file ? <p>{file.name}</p> : <p> Drag & drop or click to upload</p>}
      </div>
    </div>
          </div>
        </div>

        <hr />

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Enter your name:</label>
            <input id="fullName" type="text" name="fullName"  value={formik.values.fullName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="input"
      aria-required="true"
      aria-describedby="fullNameError"/>
       {formik.touched.fullName && formik.errors.fullName && (
      <p id="fullNameError" className="error" role="alert">{formik.errors.fullName}</p>
    )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Enter your email:</label>
            <input id="email" type="email" name="email"  value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="input"
      aria-required="true"
      aria-describedby="emailError"/>
        {formik.touched.email && formik.errors.email && (
      <p id="emailError" className="error" role="alert">{formik.errors.email}</p>
    )}
          </div>
        </form>

        <div className="button-div">
          <button onClick={() => navigate("/")} className="a">Back</button>
          <button 
  className="b" 
  type="button"
  onClick={() => {
    formik.handleSubmit(); // Trigger form submission
    formik.setTouched({
      fullName: true,
      email: true,
      avatarUrl: true,
    });
  }}
>
  Get My Free Ticket
</button>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Form;
