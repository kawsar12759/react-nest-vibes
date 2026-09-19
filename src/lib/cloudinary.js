// Browser-side Cloudinary helpers. Uploads go straight from the browser to Cloudinary through an
// unsigned, image-only preset — the API secret never reaches the client bundle.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic'];
export const ACCEPT_ATTR = ACCEPTED_TYPES.join(',');

export function validateImage(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) return `${file.name} isn't a JPG, PNG, WebP, AVIF or HEIC image.`;
  if (file.size > MAX_IMAGE_BYTES) return `${file.name} is larger than 8 MB.`;
  return null;
}

/**
 * Uploads one image and reports progress (0–100).
 * Resolves to { url, publicId, width, height, deleteToken }.
 */
export function uploadImage(file, { onProgress, signal, tags = [] } = {}) {
  return new Promise((resolve, reject) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      reject(new Error('Image uploads are not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.'));
      return;
    }
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', UPLOAD_PRESET);
    if (tags.length) form.append('tags', tags.join(','));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API}/image/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let body = {};
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        /* handled below */
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          url: body.secure_url,
          publicId: body.public_id,
          width: body.width,
          height: body.height,
          deleteToken: body.delete_token,
        });
      } else {
        reject(new Error(body.error?.message || `Upload failed (${xhr.status}).`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error while uploading. Check your connection and try again.'));
    xhr.onabort = () => reject(new DOMException('Upload cancelled', 'AbortError'));
    signal?.addEventListener('abort', () => xhr.abort());
    xhr.send(form);
  });
}

/** Removes a freshly uploaded image. Tokens are valid for 10 minutes after upload. */
export async function deleteByToken(token) {
  if (!token) return;
  const form = new FormData();
  form.append('token', token);
  try {
    await fetch(`${API}/delete_by_token`, { method: 'POST', body: form });
  } catch {
    // Best effort: an orphaned image costs storage, not correctness.
  }
}

/**
 * Returns a delivery URL with automatic format/quality and optional resizing.
 * cld(url, { w: 800, h: 600 }) → .../upload/f_auto,q_auto,c_fill,g_auto,w_800,h_600/...
 */
export function cld(url, { w, h, crop = 'fill' } = {}) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const parts = ['f_auto', 'q_auto'];
  if (w || h) {
    parts.push(`c_${crop}`);
    if (crop === 'fill') parts.push('g_auto');
    if (w) parts.push(`w_${w}`);
    if (h) parts.push(`h_${h}`);
  }
  return url.replace('/upload/', `/upload/${parts.join(',')}/`);
}

/** A srcSet across common widths for responsive images. */
export function cldSrcSet(url, widths = [480, 800, 1200, 1600], ratio) {
  if (!url?.includes('res.cloudinary.com')) return undefined;
  return widths.map((w) => `${cld(url, { w, h: ratio ? Math.round(w * ratio) : undefined })} ${w}w`).join(', ');
}
