export async function fetchBlobFromUrl(url) {
	const response = await fetch(url);
	const blob = await response.blob();
	return blob;
}