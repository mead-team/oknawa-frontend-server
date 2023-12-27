/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script';

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_APP_KEY;

export default function BaseHead() {
  return (
    <head>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`}
        strategy="beforeInteractive"
      />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="beforeInteractive"
      />
      <title>Ok, Nawa!</title>
      <meta name="description" content="Ok, 나와!" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="manifest" href="/manifest.json" />
    </head>
  );
}
