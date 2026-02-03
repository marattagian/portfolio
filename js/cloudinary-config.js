// ========================================
// CLOUDINARY CONFIGURATION
// ========================================

/**
 * Configuración de Cloudinary para optimización de videos
 *
 * INSTRUCCIONES:
 * 1. Reemplaza 'YOUR_CLOUD_NAME' con tu cloud name de Cloudinary
 * 2. Sube tus videos a Cloudinary
 * 3. Actualiza los public IDs de los videos
 */

const cloudinaryConfig = {
  cloudName: "dzxnvphuz", // ⚠️ REEMPLAZAR con tu cloud name
  baseURL: "https://res.cloudinary.com/dzxnvphuz", // ⚠️ REEMPLAZAR
};

/**
 * Genera URL optimizada de Cloudinary
 * @param {string} publicId - El public ID del video en Cloudinary
 * @param {object} options - Opciones de transformación
 * @returns {string} URL completa del video
 */
function getCloudinaryVideoURL(publicId, options = {}) {
  const {
    format = "auto", // auto selecciona el mejor formato (webm, mp4, etc)
    quality = "auto", // auto ajusta la calidad
    width = null,
    height = null,
    crop = "fill",
    gravity = "auto",
    fetchFormat = "auto",
    flags = [],
  } = options;

  // Construir transformaciones
  const transformations = [];

  // Calidad y formato
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  // Dimensiones
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) {
    transformations.push(`c_${crop}`);
    transformations.push(`g_${gravity}`);
  }

  // Flags adicionales
  if (flags.length > 0) {
    transformations.push(`fl_${flags.join(".")}`);
  }

  const transformString = transformations.join(",");

  return `${cloudinaryConfig.baseURL}/video/upload/${transformString}/${publicId}`;
}

/**
 * Genera URLs para diferentes dispositivos (responsive)
 */
function getResponsiveVideoURLs(publicId) {
  return {
    // Desktop - Alta calidad
    desktop: {
      webm: getCloudinaryVideoURL(publicId, {
        format: "webm",
        quality: "auto:good",
        width: 1920,
        height: 1080,
      }),
      mp4: getCloudinaryVideoURL(publicId, {
        format: "mp4",
        quality: "auto:good",
        width: 1920,
        height: 1080,
      }),
    },
    // Mobile - Calidad optimizada
    mobile: {
      webm: getCloudinaryVideoURL(publicId, {
        format: "webm",
        quality: "auto:low",
        width: 1280,
        height: 720,
      }),
      mp4: getCloudinaryVideoURL(publicId, {
        format: "mp4",
        quality: "auto:low",
        width: 1280,
        height: 720,
      }),
    },
    // Poster/Thumbnail
    poster: getCloudinaryVideoURL(publicId, {
      format: "jpg",
      quality: "auto",
      width: 1920,
      height: 1080,
    }).replace("/video/", "/video/upload/so_0.0/"), // Extrae frame en segundo 0
  };
}

/**
 * Obtiene URL para video loop de proyectos (preview corto)
 */
function getProjectLoopURL(publicId) {
  return {
    webm: getCloudinaryVideoURL(publicId, {
      format: "webm",
      quality: "auto:low",
      width: 800,
      height: 600,
      flags: ["loop"],
    }),
    mp4: getCloudinaryVideoURL(publicId, {
      format: "mp4",
      quality: "auto:low",
      width: 800,
      height: 600,
      flags: ["loop"],
    }),
  };
}

// ========================================
// CONFIGURACIÓN DE VIDEOS
// ========================================

/**
 * IDs de videos en Cloudinary
 * Reemplaza estos valores con los public IDs de tus videos subidos
 */
const cloudinaryVideos = {
  // Hero video
  hero: "portfolio/hero-video", // ⚠️ REEMPLAZAR con tu public ID

  // Proyectos
  projects: {
    boda: "portfolio/boda-loop", // ⚠️ REEMPLAZAR
    dron: "portfolio/dron-loop", // ⚠️ REEMPLAZAR
    fuesmen: "portfolio/fuesmen-loop", // ⚠️ REEMPLAZAR
  },
};

// ========================================
// EXPORTAR CONFIGURACIÓN
// ========================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    cloudinaryConfig,
    getCloudinaryVideoURL,
    getResponsiveVideoURLs,
    getProjectLoopURL,
    cloudinaryVideos,
  };
}
