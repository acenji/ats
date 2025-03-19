Applicant Tracking System (ATS)

Overview

The ATS is an intelligent system designed to analyze and compare resumes against job descriptions using state-of-the-art natural language processing and mechanical matching techniques. It extracts key information, identifies similarities, and highlights gaps to streamline the hiring process.

Features

1. Soft Matches with Confidence Levels
Leverages Large Language Models (LLMs) to identify textual similarities between job description keywords and resume keywords.
Each match comes with a confidence level, allowing users to:
Evaluate the strength of the match.
Set thresholds for displaying results based on confidence levels in future iterations.

2. Keyword Extraction
From Resumes:
Extracts and identifies important keywords from the resume.
Sorts keywords alphabetically for easy readability.
From Job Descriptions:
Extracts key terms from the job description.
Sorts terms alphabetically for consistency and easy comparison.

3. Mechanical Matching
Performs a 100% similarity match between the keywords from resumes and job descriptions.
This is a case-sensitive process, ensuring matches respect upper- and lowercase distinctions.
Provides a reliable list of exactly matched keywords.

4. Missing Keywords
Identifies missing keywords by calculating the difference between:
The extracted keywords from the job description.
The mechanically matched keywords set.
Highlights the gaps, giving actionable insights for resume optimization or further evaluation.

Future Enhancements

Adjustable Confidence Thresholds: Allow users to filter soft matches by confidence level.
Support for Additional Document Types: Extend beyond resumes to include cover letters, investor pitches, and other structured documents.
The system will incorporate advanced paragraph evaluation capabilities, allowing for a more comprehensive analysis of the text. It will identify areas of weakness, such as unclear phrasing or lack of alignment with the target context, and suggest actionable improvements to enhance overall effectiveness. Additionally, the feature will include the ability to refine bullet points or transform them into well-crafted paragraphs by incorporating specific keywords or rephrasing for greater clarity and impact. 
Advanced Keyword Insights: Integrate keyword importance scores to prioritize matches.
Visualization Tools: Add graphical displays of match and gap analysis.

Project Structure

The project is organized into two main components:

Backend: Contains the logic for keyword extraction, soft matching, and mechanical matching. Located in the backend/ directory.
Frontend: Provides a user-friendly interface for uploading resumes and job descriptions, and viewing results. Located in the root directory.

Getting Started

1. Prerequisites
Ensure the following tools are installed:

Node.js (v14 or later)
npm

2. Installation
Clone the repository:
   git clone https://github.com/your-username/ats-system.git
   cd ats-system
Install dependencies:

Backend:
   cd backend
   npm install

Frontend:
   cd ..
   npm install

3. Set up local environments
clone (or create)  in the root folder the file .env.example into .env.local
REACT_APP_API_URL=http://localhost:5001

clone (or create)inside the backend folder the file .env.example into env.local
OPENAI_API_KEY=TYPE-YOUR-API_KEY-HERE_WITHOUT-QUOTES
PORT=5001


Running the Project
4. Start the Backend

Navigate to the backend/ directory and start the server:

cd backend
node server.js
The backend will run at http://localhost:5001 by default.

5. Start the Frontend

From the root directory, start the React app:

npm start
The frontend will open at http://localhost:3000 if you followed the .env.example.

6. How to use the application

6.1 <u>Upload a resume<u>
Supported files:PDF, DOC, DOCX

Upload a resume in the supported file types listed above. 

6.2 <u>Upload Job Description<u>
After the validation and verification completes and the file is checked-marked as OK, 
add job description: either as a file in the same format as the resume or copy/paste as a plain text.

6.3 Click button "Submit to Process Resume and job Description"

7. How to Read the Analyses?

7.1 Layout of the Outcome
During a live session, several segments will be populated with data. The current segments include:
Soft Matches with Confidence Levels (0.00 - 1.00)
Simply matching keywords mechanically is not enough to determine if a resume is a strong fit.
Soft Matching is an AI-powered, human-like converter that analyzes keywords from the resume,
aiming to match them linguistically, preserving intent and context.
Users can set a threshold level to ignore matches below a certain confidence score.

Example:
- "Visual Studio ↔ certifications" (Confidence: 0.50) → Likely ignored.
- "Product Roadmap Development ↔ product roadmap" (Confidence: 0.88) → Likely accepted.

- Keywords Extracted from Resume (Alphabetical)
AI extracts relevant keywords directly from the resume.

- Keywords Extracted from Job Description (Alphabetical)
AI extracts key terms from the job description.

- Matching Keywords (Alphabetical)
This section mechanically identifies overlapping keywords between the extracted resume and job description keywords (case insensitive).

- Missing Keywords (Alphabetical)
This section highlights keywords found in the job description but absent from the resume, helping identify potential gaps.

Use the insights to refine the resume.

Contributing

We welcome contributions! Here’s how you can help:

Fork the repository.
Create a feature branch:
   git checkout -b feature-name
Commit your changes:
   git commit -m "Description of changes"
Push the branch and create a pull request.

## Technologies Used

- **Frontend**: [React.js](https://reactjs.org/) (JavaScript library for building user interfaces)
- **Backend**: [Node.js](https://nodejs.org/) (JavaScript runtime environment)
- **Package Manager**: [npm](https://www.npmjs.com/) (Node Package Manager)



License

This project is open-source and licensed under the MIT License. See the LICENSE file for details.
