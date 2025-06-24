import Script from 'next/script';

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function BaseHead() {
  return (
    <head>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
      />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
      <title>Ok, 나와!</title>
      <meta
        name="description"
        content="만나기 편한 약속 장소와 핫플레이스를 추천해드려요!"
      />
      <meta
        name="keywords"
        content="만나기 편한 약속 장소, 만나기 편한 중간 장소, 약속 장소, 핫플레이스, 맛집 추천, oknawa, 오케이나와, 오키나와, 약속 장소 추천, ok nawa, oknawa.com, 오케이나와"
      />
      <meta property="og:title" content="Ok, 나와!" />
      <meta
        property="og:description"
        content="만나기 편한 약속 장소와 핫플레이스를 추천해드려요!"
      />
      <meta
        property="og:image"
        content={`${BASE_URL}/images/og-image.jpg`}
      />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ok, 나와!" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@oknawa" />
      <meta name="twitter:creator" content="@oknawa" />
      <meta name="twitter:title" content="Ok, 나와!" />
      <meta
        name="twitter:description"
        content="만나기 편한 약속 장소와 핫플레이스를 추천해드려요!"
      />
      <meta
        name="twitter:image"
        content="https://www.oknawa.com/images/og-image.jpg"
      />
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
      />
      <link rel="manifest" href="/manifest.json" />
    </head>
  );
}
