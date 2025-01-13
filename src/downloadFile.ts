import { ZipWriter, BlobWriter, TextReader } from '@zip.js/zip.js';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  // Auto-download the ZIP through anchor
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadJSON(stringOrBlob: string | Blob, filename = 'output.json') {
  /** @type {Blob} */
  let jsonBlob;
  // check if it's a Blob.., instanceof is too strict e.g. Blob polyfills
  if (stringOrBlob.constructor.name === 'Blob') {
    jsonBlob = stringOrBlob as Blob;
  } else {
    jsonBlob = new Blob([stringOrBlob], { type: 'application/json' });
  }
  downloadBlob(jsonBlob, filename);
}

export async function downloadZIP(
  filesOrBlob: Record<string, string> | Blob,
  filename = 'output.zip',
) {
  let zipBlob: Blob;
  // check if it's a Blob.., instanceof is too strict e.g. Blob polyfills
  if (filesOrBlob.constructor.name === 'Blob') {
    zipBlob = filesOrBlob as Blob;
  } else {
    const zipWriter = new ZipWriter(new BlobWriter('application/zip'));

    await Promise.all(
      Object.entries(filesOrBlob).map(([key, value]) => zipWriter.add(key, new TextReader(value))),
    );

    // Close zip and make into URL
    zipBlob = await zipWriter.close();
  }
  downloadBlob(zipBlob, filename);
}
