import React, { useState } from "react";
import axios from "axios";

const LoadingSpinner = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <div
      style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #4A90E2",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        animation: "spin 2s linear infinite",
      }}
    ></div>
  </div>
);

const CodeQualityChecker = () => {
  const [code, setCode] = useState(""); // Store the manually entered code
  const [files, setFiles] = useState([]); // Store the uploaded files
  const [response, setResponse] = useState(null); // Store API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Store error state

  const handleCodeChange = (e) => {
    setCode(e.target.value); // Update code from textarea
    setFiles([]); // Reset files if textarea is used
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
    setFiles(selectedFiles); // Update files state
    setCode(""); // Reset code if file is used
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!code && files.length === 0) {
      alert("Please enter code or upload a file.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const payload =
        files.length > 0
          ? (() => {
              // If files are uploaded, send them as multipart/form-data
              const formData = new FormData();
              files.forEach((file) => formData.append("files", file));
              return formData;
            })()
          : { code };

      const endpointPath = files.length > 0 ? "upload" : "code";

      const res = await axios.post(
        `http://localhost:5500/api/${endpointPath}`,
        payload,
        {
          headers:
            files.length > 0
              ? { "Content-Type": "multipart/form-data" }
              : { "Content-Type": "application/json" },
        }
      );
      if (res.data.code === null) {
        setError(res.data.message);
      }
      console.log(res);
      setResponse(res.data); // Store API response
    } catch (err) {
      console.error(err);
      // Extract detailed error information
      // const errorResponse = err.response?.data || {}; // API error object
      // const errorMessage = errorResponse.message || err.message || "An unknown error occurred.";

      // const errorDetails = {
      //   message: errorMessage,
      //   code: errorResponse.code || "N/A",
      //   param: errorResponse.param || "N/A",
      //   type: errorResponse.type || "N/A",
      // };

      // setError(errorDetails);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4A90E2" }}>
        Code Quality Checker
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "20px", width: "100%" }}>
          <label
            htmlFor="codeInput"
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Enter Code:
          </label>
          <textarea
            id="codeInput"
            placeholder="Enter your code here..."
            value={code}
            onChange={handleCodeChange}
            rows="10"
            cols="50"
            aria-label="Enter your code for quality check"
            style={{
              display: "block",
              width: "100%",
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              resize: "vertical",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                flex: 1,
                borderBottom: "1px solid #ccc",
                margin: "0 10px",
              }}
            ></div>
            <span style={{ color: "#555" }}>OR</span>
            <div
              style={{
                flex: 1,
                borderBottom: "1px solid #ccc",
                margin: "0 10px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label
              htmlFor="fileInput"
              style={{
                backgroundColor: "#4A90E2",
                color: "white",
                padding: "12px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "200px",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Choose File(s)
            </label>
            <input
              type="file"
              accept=".ts,.js,.java,.py,.kt"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
              multiple
            />

            <ul
              style={{ marginTop: "10px", listStyleType: "none", padding: 0 }}
            >
              {files.map((file, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: "#f3f3f3",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "5px",
                    textAlign: "left",
                    width: "100%",
                    maxWidth: "300px",
                    wordBreak: "break-word",
                  }}
                >
                  {file.name}
                </li>
              ))}
            </ul>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
                width: "100%",
                maxWidth: "200px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {loading ? "Checking..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {loading && <LoadingSpinner />}

      {response && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            marginTop: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#4CAF50",
              fontSize: "1.8rem",
              marginBottom: "20px",
            }}
          >
            Code Quality Feedback
          </h2>
          <div style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555" }}>
            {Object.keys(response).map((key) => {
              if (
                typeof response[key] === "string" ||
                typeof response[key] === "number"
              ) {
                // Render string or number values directly
                return (
                  <div style={{ marginBottom: "15px" }} key={key}>
                    <h3
                      style={{
                        color:
                          key === "overallQualityPercentage"
                            ? "#4A90E2"
                            : "#4A90E2",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        {key === "overallQualityPercentage" ? "⭐" : "✔"}
                      </span>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </h3>
                    <p>{response[key]}</p>
                  </div>
                );
              } else if (
                typeof response[key] === "object" &&
                response[key] !== null
              ) {
                // Render nested objects as lists
                return (
                  <div style={{ marginBottom: "15px" }} key={key}>
                    <h3
                      style={{
                        color: "#E67E22",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        ⚠
                      </span>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </h3>
                    <ul>
                      {Object.keys(response[key]).map((subKey) => (
                        <li key={subKey}>
                          <strong>
                            {subKey
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            :
                          </strong>{" "}
                          {response[key][subKey]}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            padding: "15px",
            marginTop: "20px",
            textAlign: "center",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CodeQualityChecker;
