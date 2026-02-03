// Project configuration data
// Keep this file clean - only data, no logic

const projects = [
  {
    title: "Nadia & Nacho",
    role: "Filmmaker / Editor / Colorista",
    staticImage: "/assets/images/boda.jpg",
    animatedPreview: "/assets/boda-loop.webm",
    videoID: "qFdSlvkQ-CM",
    platform: "youtube",
  },
  {
    title: "Real State",
    role: "Piloto de Dron / Editor",
    staticImage: "/assets/images/dron.jpg",
    animatedPreview: "/assets/dron-loop.webm",
    videoID: "1161221236",
    platform: "vimeo",
  },
  {
    title: "Fuesmen",
    role: "Filmmaker / Editor",
    staticImage: "/assets/images/fuesmen.jpg",
    animatedPreview: "/assets/fuesmen-loop.webm",
    videoID: "PcBxHz0ozxM",
    platform: "youtube",
  },
];

// Validation helper (optional but recommended)
function validateProject(project) {
  const required = [
    "title",
    "role",
    "staticImage",
    "animatedPreview",
    "videoID",
    "platform",
  ];
  const missing = required.filter((field) => !project[field]);

  if (missing.length > 0) {
    console.warn(
      `Project "${project.title}" is missing: ${missing.join(", ")}`,
    );
    return false;
  }

  // Validate platform
  if (!["vimeo", "youtube"].includes(project.platform)) {
    console.warn(
      `Project "${project.title}" has invalid platform: ${project.platform}`,
    );
    return false;
  }

  return true;
}

// Filter out any invalid projects
const validProjects = projects.filter(validateProject);

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { projects: validProjects };
}
