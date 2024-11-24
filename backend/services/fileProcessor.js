const textract = require("textract");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const extractTextFromFile = async (filePath, originalName) => {
  console.log("File path for text extraction:", filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }

  console.log("Valid file path:", filePath);

  // Use pdf-parse for PDFs
  if (originalName.endsWith(".pdf")) {
    console.log("Using pdf-parse for PDF extraction");
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    console.log("Extracted text:", data.text);
    return data.text;
  }

  // Use textract for other file types
  return new Promise((resolve, reject) => {
    textract.fromFileWithPath(filePath, (error, text) => {
      if (error) {
        console.error("Textract error:", error);
        return reject(new Error("Failed to extract text from file"));
      }

      console.log("Full Extracted text:", text);
      resolve(text);
    });
  });
};

module.exports = { extractTextFromFile };
