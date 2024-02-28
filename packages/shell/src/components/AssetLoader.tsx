import { FunctionComponent, useEffect, useMemo } from "react";

import useFetch from "../hooks/useFetch";
import replaceKeysWithValue from "../utils/replaceKeysWithValues";

import type { AllAssets } from "../utils/getAssetsFromManifest";

const AssetLoader: FunctionComponent<{
  assetId: string;
  allAssets: AllAssets;
  destination: string;
}> = ({ assetId, allAssets, destination }) => {
  const asset = allAssets[assetId];
  const [data, error, loading] = useFetch<string>(asset);

  const content = useMemo(() => {
    if (error !== null || data === null || loading) {
      return "";
    }

    return replaceKeysWithValue(data, {
      ...{
        "#root": `#${destination}`,
        '"/assets': '"assets',
        'document.getElementById("root")': `document.getElementById("${destination}")`,
      },
      ...allAssets,
    });
  }, [allAssets, destination, data, error, loading]);

  useEffect(() => {
    if (!content) {
      return;
    }

    let styleElement: HTMLStyleElement | null = null;
    let scriptElement: HTMLScriptElement | null = null;

    if (asset.endsWith(".css")) {
      // load the css into the page
      styleElement = document.createElement("style");
      styleElement.innerHTML = content;
      document.head.appendChild(styleElement);
    }

    if (asset.endsWith(".js")) {
      // load the js into the page
      scriptElement = document.createElement("script");
      scriptElement.innerHTML = `(function() { try { ${content} } catch (e) { console.error(e); } })();`;
      document.body.appendChild(scriptElement);
    }

    return () => {
      if (styleElement) {
        document.head.removeChild(styleElement);
      }

      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [asset, content]);

  return <></>;
};

export default AssetLoader;
