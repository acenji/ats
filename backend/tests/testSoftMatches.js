require('dotenv').config({ path: '../../.env' }); // Adjust path to the root .env file

const { findSoftMatches } = require('../services/openaiService');

(async () => {
  try {
    const matches = await findSoftMatches(
      ["Python", "Machine Learning", "Team Leadership"],
      ["Python Programming", "ML", "Leadership Skills"]
    );
    console.log("Soft Matches:", matches);
  } catch (error) {
    console.error("Error testing soft matches:", error.message);
  }
})();
