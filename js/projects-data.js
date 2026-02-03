// Project configuration data
// Keep this file clean - only data, no logic

/**
 * CONFIGURACIÓN DE CLOUDINARY
 * Reemplaza 'YOUR_CLOUD_NAME' con tu cloud name real
 */
const CLOUDINARY_CLOUD_NAME = "dzxnvphuz"; // ⚠️ CAMBIAR ESTO
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

/**
 * Helper para generar URLs de Cloudinary optimizadas
 */
function getCloudinaryURL(publicId, options = {}) {
  const {
    format = "auto",
    quality = "auto",
    // width = null,
    // height = null,
  } = options;

  let transformations = `q_${quality},f_${format}`;

  // if (width) transformations += `,w_${width}`;
  // if (height) transformations += `,h_${height}`;

  return `${CLOUDINARY_BASE_URL}/video/upload/${transformations}/${publicId}`;
}

/**
 * Proyectos del portfolio
 *
 * IMPORTANTE:
 * - cloudinaryId: El public ID del video en Cloudinary (ej: "portfolio/boda-loop")
 * - staticImage: Puede ser de Cloudinary o ruta local
 * - animatedPreview: Se generará automáticamente desde Cloudinary
 */
const projects = [
  {
    title: "Nadia & Nacho",
    role: "Filmmaker / Editor / Colorista",

    // Cloudinary public ID del video loop
    cloudinaryId: "portfolio/boda-loop", // ⚠️ CAMBIAR: tu public ID real

    // Imagen estática (poster)
    staticImage: `${CLOUDINARY_BASE_URL}/video/upload/so_0.0,q_auto,f_jpg,w_800/portfolio/boda-loop.jpg`,

    // Preview animado (se genera desde Cloudinary)
    animatedPreview: getCloudinaryURL("portfolio/boda-loop", {
      format: "webm",
      quality: "auto:low",
      width: 800,
    }),

    // Video completo (YouTube/Vimeo)
    videoID: "qFdSlvkQ-CM",
    platform: "youtube",
  },
  {
    title: "Real State",
    role: "Piloto de Dron / Editor",

    cloudinaryId: "portfolio/dron-loop", // ⚠️ CAMBIAR

    staticImage: `${CLOUDINARY_BASE_URL}/video/upload/so_0.0,q_auto,f_jpg/portfolio/dron-loop.jpg`,

    animatedPreview: getCloudinaryURL("portfolio/dron-loop", {
      format: "webm",
      quality: "auto:low",
      width: 800,
    }),

    videoID: "1161221236",
    platform: "vimeo",
  },
  {
    title: "Fuesmen",
    role: "Filmmaker / Editor",

    cloudinaryId: "portfolio/fuesmen-loop", // ⚠️ CAMBIAR

    staticImage: `${CLOUDINARY_BASE_URL}/video/upload/so_0.0,q_auto,f_jpg/portfolio/fuesmen-loop.jpg`,

    animatedPreview: getCloudinaryURL("portfolio/fuesmen-loop", {
      format: "webm",
      quality: "auto:low",
      width: 800,
    }),

    videoID: "PcBxHz0ozxM",
    platform: "youtube",
  },
];

// Si prefieres mantener los IDs en un objeto separado:
// const projectVideos = {
//   boda: "portfolio/boda-loop",
//   dron: "portfolio/dron-loop",
//   fuesmen: "portfolio/fuesmen-loop",
// };

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

// Make validProjects globally accessible for portfolio.js
window.validProjects = validProjects;

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { projects: validProjects };
}
