import { FC, ComponentProps, useMemo } from "react";

import AssetLoader from "./AssetLoader";

import useFetch from "../hooks/useFetch";
import getAssetsFromManifest from "../utils/getAssetsFromManifest";

const MicroFrontendContainer: FC<AppEntry & ComponentProps<"div">> = ({
  id,
  url,
  version,
  ...rest
}) => {
  const urlWithVersion = version
    ? url.split("/dist/").join(`/dist-${version}/`)
    : url;

  const [text, error, loading] = useFetch<string>(urlWithVersion);

  const assets = useMemo(
    () => getAssetsFromManifest(urlWithVersion, text),
    [urlWithVersion, text]
  );

  if (loading) {
    return <div {...rest}>Loading {id}</div>;
  }

  if (error !== null) {
    return <div {...rest}>Could not load {id}</div>;
  }

  return (
    <div id={id} {...rest}>
      {Object.keys(assets)
        .filter((asset) => asset.endsWith(".js") || asset.endsWith(".css"))
        .map((assetKey) => (
          <AssetLoader
            key={assetKey}
            assetId={assetKey}
            allAssets={assets}
            destination={id}
          />
        ))}
    </div>
  );
};

export default MicroFrontendContainer;
