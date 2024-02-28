export type AllAssets = Record<string, string>;

const getAssetsFromManifest = (url: string, text: string | null) => {
  if (text === null) {
    return {};
  }

  const baseUrl = url.replace(/manifest.json$/, "");
  const matches = text.match(/"assets\/[^"]+"/g);

  if (!matches) {
    return {};
  }

  return Array.from(new Set(matches)).reduce((allAssets, asset) => {
    const key = asset.replace(/"/g, "");
    allAssets[key] = baseUrl + key;
    return allAssets;
  }, {} as AllAssets);
};

export default getAssetsFromManifest;
