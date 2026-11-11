export interface CvProject {
  role: string;
  client: string;
  dates: string;
  description: string;
  responsibilities: string[];
}

export interface CvEducation {
  degree: string;
  year: string;
  institution: string;
}

export const personalInfo = {
  citizenship: "German",
  travelReadiness: "Europe",
  capacity: "50% - 100%",
};

export const languages: string[] = ["German (Native)", "English (Business fluent)"];

export const summary: string[] = [
  "For more than a decade, I've worked across product management, agile methodologies, API development, and digital transformation in a wide range of industries.",
  "I help you build better products: analyzing problems, identifying the right strategic and digital solutions, and coordinating development teams to get there.",
];

export const skills = {
  practices: ["Scrum", "Kanban", "API-First", "SAFe", "Lean Startup"],
  expertise: [
    "Product Management & Owner",
    "Identity- & Accessmanagement",
    "Self-Service-Applications",
    "Business Analysis",
    "API-Management & -Governance",
    "B2B Platforms",
  ],
  tools: [
    "Atlassian/Miro",
    "Elasticsearch",
    "Kibana/Graylog/Power BI",
    "Postman/Stoplight/SoapUI",
    "OpenAPI/AsyncAPI/Avro",
    "Flutter/Flutterflow",
    "Kafka/RabbitMQ/ActiveMQ",
    "Apache Beam/Flink/Spark",
    "Typeform/Figma/Framer",
    "HTTP/REST/SOAP/GraphQL/MQTT",
    "OAuth2/OpenID/SAML2",
    "Hadoop",
  ],
  techniques: [
    "Product Discovery",
    "Business Process Modelling",
    "Planning and backlog prioritization",
    "User Stories",
    "Customer Journeys",
    "User Testing",
    "Product Strategie & Roadmap",
    "KPI-Monitoring & Management-Reporting",
    "Product Requirement Documents",
    "Requirements Engineering",
    "A/B-Testing",
    "Customer Interviews",
    "OKRs",
  ],
};

export const education: CvEducation[] = [
  { degree: "Business Moderation", year: "2017", institution: "Deutsche Gesellschaft für Moderation e.V." },
  { degree: "M.Sc. Business Informatics", year: "2016", institution: "Hochschule Ravensburg-Weingarten" },
  { degree: "B.Sc. Business Informatics", year: "2014", institution: "Hochschule Kempten" },
];

export const certifications: string[] = [
  "Certified SAFe 4 Agilist",
  "Certified Product Owner",
  "Certified Scrum Master",
  "Certified Professional for Requirements Engineering",
];

export const projects: CvProject[] = [
  {
    role: "Senior Business Analyst",
    client: "Insurance, Vienna, Austria",
    dates: "June 2023 - today",
    description:
      "As a Senior Business Analyst, I am responsible for analyzing and documenting IT processes, interfaces, and B2B web services. The project required deep understanding of business architectures and analysis methodologies, working in an agile environment (Scrum, SAFe) with a focus on remote collaboration. The goal of the project is to increase insurance sales by providing a public API for consumption by partners, insurance agencies and online platforms.",
    responsibilities: [
      "Analysis and documentation of IT processes and business architectures",
      "Interface mapping and WSDL documentation",
      "Working and documenting B2B web services",
      "Collaboration using Jira and Confluence",
      "Reworking and restructuring of the API Security",
      "Support and Partner Onboarding",
    ],
  },
  {
    role: "API Product Manager",
    client: "Logistics, Duesseldorf, North Rhine Westphalia",
    dates: "January 2022 – June 2023",
    description:
      "As API Product Manager, I was responsible for the API program of one of Europe's leading transportation platforms. The project goals were to sustain organic growth of the API platform by increasing the developer experience for API consumers while simultaneously, reducing development effort.",
    responsibilities: [
      "Building and communicating API strategy and a goal statement for the API topic.",
      "Management of internal and external stakeholders, as well as coordination of development teams",
      "Sparring partner of product managers for planning and conception of APIs",
      "Establishment and assurance of uniform constraints and quality standards for data, events and interfaces",
      "Conception and development of API management incl. API portal",
      "Establishment of documentation guidelines",
    ],
  },
  {
    role: "API Product Owner",
    client: "IT Financial Services, Nuremberg, Bavaria",
    dates: "January 2021 - December 2021",
    description:
      "As a product owner, I was responsible together with my team for the implementation of an API management platform for business customers. The goal was to provide customers and business partners with a platform for easy and straightforward service creation. The project created a network of multiple API consumers and API producers that today provides over 30 APIs and delivers services to up to 1.2 million end customers per month.",
    responsibilities: [
      "Product vision, business modeling, market analysis and customer interviews.",
      "Planning and prioritization of the backlog",
      "Management of internal and external stakeholders & coordination of development team",
      "Steering of a community of practice for the implementation of API guidelines",
      "Further development of the central authentication and authorization system",
    ],
  },
  {
    role: "Product Consultant",
    client: "Real Estate, Munich, Bavaria",
    dates: "January 2021 - September 2021",
    description:
      "As a Product Consultant, I provided methodological support to the client in the development and testing of an MVP. The goal was to test a potential solution to the problem in addition to the initial validation of the customer's problem. The validation led to a pivot in the company's direction.",
    responsibilities: [
      "Conducting customer interviews & user testing.",
      "Derivation of hypotheses",
      "Value Proposition & Business Model Consulting",
      "Support in the development of a Minimum Viable Product",
    ],
  },
  {
    role: "Product Consultant",
    client: "IT Services, Nuremberg, Bavaria",
    dates: "October 2020 - March 2021",
    description:
      "As a product consultant, I supported the product owners of the customer methodically and in terms of content, as well as advising them. The goal was to enable the product owners to make independent decisions about the product and present them to the management. By setting up and quickly testing hypotheses using MVPs, the product owner team was able to present a solid product roadmap to management.",
    responsibilities: [
      "Review Value Proposition & Business Model",
      "Support in problem validation",
      "Support in market analysis & customer interviews",
      "Value Proposition & Business Model Consulting",
    ],
  },
  {
    role: "Product Owner Identity & Accessmanagement",
    client: "IT Financial Services, Nuremberg, Bavaria",
    dates: "January 2020 - December 2020",
    description:
      "As a product owner, I was responsible together with my team for the implementation of a passwordless authentication and authorization platform (IDaaS) for business customers. The goal was to provide business customers with a secure and customizable solution for employee and customer authentication, as well as access authorization. Passwordless authentication was provided to approximately 600,000 end users and 6,000 employees of multiple business customers within the project scope.",
    responsibilities: [
      "Product vision, business modeling, market analysis and customer interviews.",
      "Planning and prioritization of the backlog",
      "Development of a central identity & access management solution",
      "Management of internal and external stakeholders & coordination of development team",
      "Support of development teams in dealing with OAuth2 and SAML2",
    ],
  },
  {
    role: "Product Owner",
    client: "Banks & Insurances, Nuremberg, Bavaria",
    dates: "March 2019 - December 2019",
    description:
      'As Product Owner I was responsible for the implementation of an authentication component to enforce "strong customer authentication" according to PSD2. The solution assigned by the customer could be implemented in time and budget.',
    responsibilities: [
      "Planning and facilitation of workshops",
      "Requirements analysis and documentation",
      "Planning and prioritization of the backlog (Scrum)",
      "Management of internal and external stakeholders & coordination of multiple development teams",
      "Creation of decision documents incl. management reporting",
    ],
  },
  {
    role: "Business Analyst / Proxy Product Owner API",
    client: "Banks & Insurances, Nuremberg, Bavaria",
    dates: "December 2018 - February 2019",
    description:
      "As a business analyst, I was tasked with preparing the requirements in accordance with PSD2, I managed a team of developers on an interim basis, and was thus largely responsible for the development of the XS2A API.",
    responsibilities: [
      "Planning and moderation of workshops",
      "Requirements analysis and documentation",
      "Business process modeling and conceptual design",
      "Planning and prioritization of the backlog (Scrum)",
      "Harmonization and prioritization of requirements of individual stakeholders",
    ],
  },
  {
    role: "Identity & Access Management Subproject Manager",
    client: "Banks & Insurances, Nuremberg, Bavaria",
    dates: "June 2017 - November 2018",
    description:
      "As sub-project manager, I was responsible for the technical conception of an identity and access management solution in accordance with MaRisk. The goal was to make the entire employee life cycle efficient and smooth for managers and employees and to create a MaRisk-compliant role and authorization management system. The project reduced the time and effort required for employee onboarding and department changes from several days to just a few minutes.",
    responsibilities: [
      "Sub-project management, reporting and the preparation of protocols, risk assessments, decision documents and management presentations",
      "Planning and facilitation of workshops",
      "Requirements analysis and documentation",
      "Business process modeling and design",
      "Consulting and training of business departments",
    ],
  },
  {
    role: "Business Analyst",
    client: "Banks & Insurances, Nuremberg, Bavaria",
    dates: "October 2016 – June 2017",
    description:
      "As a Business Analyst, I was responsible for the redevelopment of a NoCode test automation platform for iOS and Android. The goal of the initiative was to increase test quality in iOS and Android app development and reduce the workload of development teams. By automating regression tests, the test time for a release was reduced by approx. 80%.",
    responsibilities: [
      "Requirements analysis and documentation",
      "Evaluation and selection of test frameworks",
      "Resource planning and coordination of external service providers",
      "Creation of test concepts",
      "Documentation of test software and execution of training",
    ],
  },
];

export const projectsNote = "Further projects from the years 2011 - 2016 on request";
