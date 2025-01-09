import React, { useState } from "react";
import axios from "axios";
import data from "./response";

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
  const [file, setFile] = useState(null); // Store the uploaded file
  const [response, setResponse] = useState(null); // Store API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Store error state

  const handleCodeChange = (e) => {
    setCode(e.target.value); // Update code from textarea
    setFile(null); // Reset file if textarea is used
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]); // Update file from file input
    setCode(""); // Reset textarea if file is used
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!code && !file) {
      alert("Please enter code or upload a file.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let payload;

      if (file) {
        // If a file is uploaded, send it as multipart/form-data
        const formData = new FormData();
        formData.append("file", file);
        payload = formData;
      } else {
        // If code is entered, send it as JSON
        payload = { code };
      }

      const res = await axios.post("http://localhost:5500/api/code", payload, {
        headers: file
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      });

      // Static response data
      let data = {
        functionality:
          "The code correctly imports and utilizes the necessary components from React Native and Expo. The App component renders the Contacts component, but there's no indication of functionality such as state management or props being utilized.",
        readability:
          "The code is mostly readable, structured well, and uses appropriate naming conventions. However, a brief comment explaining the purpose of the App component could improve clarity.",
        bestPractices:
          "Best practices are mostly followed, including the use of StyleSheet for styling. However, defining the styles in relation to the layout or elements they are applied to would enhance clarity.",
        overallQualityPercentage: 75,
        improvements: {
          comments:
            "Add comments to describe the purpose of each component and style.",
          structure:
            "Consider breaking down the code further if additional features are planned, to maintain modularity.",
          errorHandling:
            "Implement error handling for potential issues when loading contacts within the Contacts component.",
        },
      };
      setResponse(res.data); // Store API response
    } catch (err) {
      setError("Error checking code quality. Please try again.");
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
              justifyContent: "center",
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
                marginRight: "10px",
              }}
            >
              Choose File
            </label>
            <input
              type="file"
              accept=".ts,.js,.java,.py,.kt"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />

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

      {error && (
        <div
          style={{
            color: "red",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

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
            <div style={{ marginBottom: "15px" }}>
              <h3
                style={{
                  color: "#4A90E2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                  ✔
                </span>
                Functionality
              </h3>
              <p>{response.functionality}</p>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <h3
                style={{
                  color: "#4A90E2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                  ✔
                </span>
                Readability
              </h3>
              <p>{response.readability}</p>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <h3
                style={{
                  color: "#4A90E2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                  ✔
                </span>
                Best Practices
              </h3>
              <p>{response.bestPractices}</p>
            </div>
            <div style={{ marginBottom: "15px" }}>
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
                Improvements
              </h3>
              <ul>
                <li>
                  <strong>Comments:</strong> {response.improvements.comments}
                </li>
                <li>
                  <strong>Structure:</strong> {response.improvements.structure}
                </li>
                <li>
                  <strong>Error Handling:</strong>{" "}
                  {response.improvements.errorHandling}
                </li>
              </ul>
            </div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "1.5rem",
                color: "#4A90E2",
                fontWeight: "bold",
              }}
            >
              Overall Quality: {response.overallQualityPercentage}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeQualityChecker;
