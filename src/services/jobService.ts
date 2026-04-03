const JOB_DATA: Record<string, string> = {
  "computer science": "### Job Market Trends: Computer Science\n- **High Demand:** Software Engineering, AI/ML, Cloud Computing, Cybersecurity.\n- **Key Requirements:** Data Structures, Algorithms, System Design, Proficiency in Python/Java/Go.\n- **Top Companies:** Google, Microsoft, Amazon, Meta, NVIDIA, startups.",
  "ai": "### Job Market Trends: Artificial Intelligence\n- **High Demand:** Machine Learning Engineer, Data Scientist, AI Researcher, NLP Engineer.\n- **Key Requirements:** Deep Learning, PyTorch/TensorFlow, Statistics, Mathematics, Research experience.\n- **Top Companies:** OpenAI, Google DeepMind, Anthropic, Meta, NVIDIA.",
  "engineering": "### Job Market Trends: Engineering\n- **High Demand:** Robotics, Automotive Systems, Renewable Energy, Civil Infrastructure.\n- **Key Requirements:** CAD, Simulation tools, Project Management, Technical problem solving.\n- **Top Companies:** Tesla, Intel, Siemens, Boeing, Tata Motors.",
  "science": "### Job Market Trends: Science\n- **High Demand:** Biotech, Pharmaceuticals, Environmental Research, Data Analysis.\n- **Key Requirements:** Laboratory skills, Data analysis, Research methodology, Scientific writing.\n- **Top Companies:** Pfizer, Mayo Clinic, NASA, Biotech startups.",
  "art": "### Job Market Trends: Art & Design\n- **High Demand:** UX/UI Design, Product Design, Digital Illustration, Creative Direction.\n- **Key Requirements:** Portfolio, Figma/Adobe Creative Suite, Design Thinking, User Research.\n- **Top Companies:** Google, Apple, Adobe, Design agencies.",
};

export async function fetchJobOpportunities(major: string) {
  const normalizedMajor = major.toLowerCase();
  
  // Simple heuristic to find a match
  for (const key in JOB_DATA) {
    if (normalizedMajor.includes(key)) {
      return JOB_DATA[key];
    }
  }
  
  return "### Job Market Trends\n- **General:** Focus on building a strong portfolio and networking.\n- **Key Requirements:** Continuous learning, adaptability, communication skills.\n- **Top Companies:** Various depending on the specific field.";
}
