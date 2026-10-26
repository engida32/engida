export const about = {
  intro:
    "I'm a full-stack engineer in Addis Ababa. Most of my work has been on products where the hard part is not the first render, but what happens after something goes wrong.",
  sections: [
    {
      title: "What I've built",
      paragraphs: [
        "At Kifiya, I led front-end work on a B2B commerce platform used by 500+ merchants. At 2F Capital, I built the web front end for a taxi platform with 100,000+ users and worked on Sewasew, a music streaming product.",
        "At Turing, I worked on an internal platform for releasing and evaluating browser-based agent environments: release flows, task assertions, LLM-as-judge review, and client variants. Before that, I built school dashboards at UpScale and enterprise web apps at JaktTech.",
      ],
    },
    {
      title: "How I work",
      paragraphs: [
        "I care about the state around the happy path: failed requests, bad model output, retries, partial writes, and releases that land at the wrong moment.",
        "My work sits on the product and platform side of AI. I build the release path, the evaluation loop, and the interface around the model, not the model itself.",
      ],
    },
    {
      title: "Earlier",
      paragraphs: [
        "I started with school dashboards at UpScale in 2019, then moved through fintech, commerce, and AI tooling. I've worked remotely with a team in South Korea and with distributed teams since. I'm based in Addis Ababa.",
      ],
    },
  ],
  now: {
    date: "October 2026",
    paragraphs: [
      "I'm looking for a senior full-stack or AI engineering role, remote or in Addis Ababa.",
      "I'm most useful on products that combine a real interface with AI features that need to survive production.",
    ],
  },
} as const;
