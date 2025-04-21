// utils/imageHelper.ts

import React from "react";

/**
 * Formats and validates image URLs to ensure they display correctly
 * @param url - The image URL to format
 * @param fallbackUrl - Optional fallback URL if the original fails
 * @returns The formatted URL
 */
export const formatImageUrl = (
  url: string | null | undefined,
  fallbackUrl: string = "../assets/placeholder.png"
): string => {
  // Handle empty URLs
  if (!url) return fallbackUrl;

  // Handle blob URLs - note they can't be validated synchronously
  if (url.startsWith("blob:")) {
    return url;
  }

  // Handle data URLs (base64)
  if (url.startsWith("data:image/")) {
    return url;
  }

  // Handle relative URLs
  if (url.startsWith("/")) {
    const baseUrl = process.env.VITE_API_BASE_URL || window.location.origin;
    return `${baseUrl}${url}`;
  }

  // If it's already an absolute URL with http/https, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Default case: assume it's a relative path and prepend the API base URL
  const baseUrl = process.env.REACT_APP_API_BASE_URL || window.location.origin;
  return `${baseUrl}/${url.replace(/^\/+/, "")}`;
};

/**
 * Asynchronously checks if an image exists and returns a valid URL
 * @param url - The image URL to check
 * @param fallbackUrl - Fallback URL if the original fails
 * @returns A valid image URL
 */
export const getValidImageUrl = async (
  url: string | null | undefined,
  fallbackUrl: string = "../assets/placeholder.png"
): Promise<string> => {
  if (!url) return fallbackUrl;

  // First format the URL
  const formattedUrl = formatImageUrl(url);

  // For blob URLs, we need special handling
  if (formattedUrl.startsWith("blob:")) {
    try {
      // Check if the blob URL is valid
      const exists = await fetch(formattedUrl, { method: "HEAD" })
        .then((response) => response.ok)
        .catch(() => false);

      return exists ? formattedUrl : fallbackUrl;
    } catch (error) {
      console.warn("Failed to validate blob URL:", error);
      return fallbackUrl;
    }
  }

  // For regular URLs, use the Image constructor
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(formattedUrl);
    img.onerror = () => resolve(fallbackUrl);
    img.src = formattedUrl;
  });
};

interface ImageState {
  loading: boolean;
  error: boolean;
  url: string | null;
}

/**
 * Component hook for handling image loading with fallbacks
 * @param url - The image URL
 * @param fallbackUrl - Fallback URL if the original fails
 * @returns Loading state and valid URL
 */
export const useImage = (
  url: string | null | undefined,
  fallbackUrl: string = "../assets/placeholder.jpg"
): ImageState => {
  const [imageState, setImageState] = React.useState<ImageState>({
    loading: true,
    error: false,
    url: null,
  });

  React.useEffect(() => {
    let isMounted = true;
    setImageState({ loading: true, error: false, url: null });

    getValidImageUrl(url, fallbackUrl).then((validUrl) => {
      if (isMounted) {
        setImageState({
          loading: false,
          error: validUrl === fallbackUrl && url !== fallbackUrl,
          url: validUrl,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [url, fallbackUrl]);

  return imageState;
};

interface Metadata {
  fileSize?: number;
  fileType: string;
  fileName?: string;
  lastModified?: Date;
  dimensions: {
    width: number;
    height: number;
  };
  url?: string;
}

/**
 * Extracts image metadata when possible
 * @param file - The image file, blob or URL
 * @returns Promise resolving to the image metadata
 */
export const extractImageMetadata = (
  file: File | Blob | string | null | undefined
): Promise<Metadata> => {
  return new Promise((resolve) => {
    if (!file) {
      resolve({
        fileType: "unknown",
        dimensions: { width: 0, height: 0 },
      });
      return;
    }

    // For images loaded as Files or Blobs
    if (file instanceof File || file instanceof Blob) {
      const metadata: Metadata = {
        fileSize: file.size,
        fileType: file instanceof File ? file.type : "blob",
        fileName: file instanceof File ? file.name : "blob-image",
        lastModified:
          file instanceof File ? new Date(file.lastModified) : new Date(),
        dimensions: { width: 0, height: 0 },
      };

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        metadata.dimensions = {
          width: img.width,
          height: img.height,
        };
        URL.revokeObjectURL(img.src); // Clean up
        resolve(metadata);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src); // Clean up
        resolve(metadata);
      };
      img.src = URL.createObjectURL(file);
    } else if (typeof file === "string") {
      // Handle string URLs
      const img = new Image();
      img.onload = () => {
        resolve({
          fileType: "url",
          dimensions: {
            width: img.width,
            height: img.height,
          },
          url: file,
        });
      };
      img.onerror = () => {
        resolve({
          fileType: "unknown",
          dimensions: { width: 0, height: 0 },
          url: file,
        });
      };
      img.src = formatImageUrl(file);
    } else {
      // If not a File, Blob or string, return basic metadata
      resolve({
        fileType: "unknown",
        dimensions: { width: 0, height: 0 },
      });
    }
  });
};

/**
 * Safely revokes blob URLs to prevent memory leaks
 * @param url - The URL to clean up
 */
export const cleanupBlobUrl = (url: string | null | undefined): void => {
  if (url && typeof url === "string" && url.startsWith("blob:")) {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn("Error revoking URL:", e);
    }
  }
};
