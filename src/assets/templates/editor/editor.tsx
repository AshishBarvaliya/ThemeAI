import { TemplateProps } from "@/interfaces/templates";
import * as React from "react";
import Image from "next/image";

const EditorTemplate: React.FC<TemplateProps> = ({
  id,
  colors,
  shades,
  fonts,
  ...props
}: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="w-full h-auto"
    viewBox="0 0 1440 2896"
    fill="none"
    {...props}
  >
    <g clipPath={`url(#a${id})`}>
      <path fill={colors.bg} d="M0 0h1440v2896H0z" />
      <g clipPath={`url(#b${id})`}>
        <path fill={colors.bg} d="M0 0h1440v1537H0z" />
        <path
          fill={`url(#c${id})`}
          d="M0 0h1440v1489H0z"
          transform="translate(0 30)"
        />
        <path fill={`url(#d${id})`} d="M110 60h186v58H110z" />
        <foreignObject x="530" y="78" width="400" height="90">
          <div className="flex gap-14">
            <p
              className="text-lg"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              Home
            </p>
            <p
              className="text-lg"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              Product
            </p>
            <p
              className="text-lg"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              About
            </p>
            <p
              className="text-lg"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              Contact
            </p>
          </div>
        </foreignObject>
        <rect
          width={139}
          height={51}
          x={1191.5}
          y={63.5}
          stroke={colors.accent}
          rx={25.5}
        />
        <foreignObject width={139} height={51} x={1191.5} y={63.5}>
          <div className="flex items-center w-full h-full justify-center">
            <div
              className="flex text-xl"
              style={{
                color: colors.accent,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              Login
            </div>
          </div>
        </foreignObject>
        <path
          fill={colors.accent}
          fillRule="evenodd"
          d="M306.512 581.02c60.34 156.709-38.114 322.99-194.824 383.33-163.14 62.82-360.595 17.857-423.411-145.283-67.639-175.668 22.64-371.696 198.308-439.336 169.712-65.347 354.58 31.576 419.927 201.289Z"
          clipRule="evenodd"
          opacity={0.46}
        />
        <path
          fill={colors.extra}
          fillRule="evenodd"
          d="M1401.35 560c162.33 0 348.1 64.834 348.1 227.158 0 166.898-181.2 247.942-348.1 247.942-172.11 0-364.35-75.834-364.35-247.942C1037 619.481 1233.68 560 1401.35 560Z"
          clipRule="evenodd"
        />
        <foreignObject width={600} height={300} x={400} y={220}>
          <div className="flex items-center w-full h-full justify-center">
            <div
              className="flex text-[76px] text-center leading-[78px]"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
                fontWeight: "bold",
              }}
            >
              Lightning fast prototyping
            </div>
          </div>
        </foreignObject>
        <foreignObject width={530} height={200} x={450} y={420}>
          <div className="flex items-center w-full h-full justify-center">
            <div
              className="flex text-[24px] text-center"
              style={{
                color: shades.primaryLight,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              Most calendars are designed for teams. Slate is designed for
              freelancers.
            </div>
          </div>
        </foreignObject>
        <rect
          width={192}
          height={52}
          x={514.5}
          y={652}
          fill={colors.accent}
          rx={26}
        />
        <foreignObject width={192} height={52} x={514.5} y={652}>
          <div className="flex items-center w-full h-full justify-center">
            <div
              className="flex text-xl"
              style={{
                color: colors.bg,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              Get started
            </div>
          </div>
        </foreignObject>
        <rect
          width={194}
          height={52}
          x={731.5}
          y={652}
          fill={colors.bg}
          rx={26}
        />
        <foreignObject width={194} height={52} x={731.5} y={652}>
          <div className="flex items-center w-full h-full justify-center">
            <div
              className="flex text-xl"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              Try For Free
            </div>
          </div>
        </foreignObject>
        <g filter={`url(#g${id})`}>
          <path fill="#000" fillOpacity={0.01} d="M160.5 749h1120v667h-1120z" />
        </g>
        <path
          fill="#E2E3E5"
          d="M167.492 749H1273.29c2.43 0 3.31.222 4.2.639.89.417 1.59 1.029 2.06 1.809.48.78.73 1.553.73 3.686v46.499H160.5v-46.499c0-2.133.253-2.906.729-3.686.475-.78 1.172-1.392 2.061-1.809.889-.417 1.771-.639 4.202-.639Z"
        />
        <path
          fill="#C4C6CA"
          d="M190.772 781.537c3.765 0 6.818-2.678 6.818-5.981 0-3.304-3.053-5.981-6.818-5.981-3.766 0-6.818 2.677-6.818 5.981 0 3.303 3.052 5.981 6.818 5.981ZM215.317 781.537c3.765 0 6.817-2.678 6.817-5.981 0-3.304-3.052-5.981-6.817-5.981-3.766 0-6.818 2.677-6.818 5.981 0 3.303 3.052 5.981 6.818 5.981ZM239.861 781.537c3.766 0 6.818-2.678 6.818-5.981 0-3.304-3.052-5.981-6.818-5.981-3.765 0-6.818 2.677-6.818 5.981 0 3.303 3.053 5.981 6.818 5.981Z"
        />
        <path
          fill={colors.bg}
          d="M277.447 763.354h972.073c1.21 0 1.65.111 2.1.32.44.208.79.514 1.03.904.23.39.36.777.36 1.843v17.79c0 1.067-.13 1.454-.36 1.843-.24.39-.59.696-1.03.905-.45.208-.89.319-2.1.319H277.447c-1.216 0-1.656-.111-2.101-.319a2.357 2.357 0 0 1-1.031-.905c-.237-.389-.364-.776-.364-1.843v-17.79c0-1.066.127-1.453.364-1.843.238-.39.587-.696 1.031-.904.445-.209.885-.32 2.101-.32Z"
        />
      </g>
      <foreignObject x="160" y="801" width="1200" height="620">
        <div>
          <Image
            src="/editor-img-1.png"
            alt="editor-img-1"
            height={620}
            width={1120}
          />
        </div>
      </foreignObject>
      <path fill={colors.bg} d="M0 1537h1440v371H0z" />
      <foreignObject width={800} height={500} x={320} y={1420}>
        <div className="flex items-center flex-col w-full h-full justify-center">
          <div
            className="flex text-[38px] text-center"
            style={{
              color: colors.extra,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Just type
          </div>
          <div
            className="flex text-[60px] mt-6 text-center"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Fastest way to navigate
          </div>
          <div
            className="flex text-[28px] mt-5 text-center mx-32"
            style={{
              color: shades.primaryLight,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            Most calendars are designed for teams. Slate is designed for
            freelancers.
          </div>
        </div>
      </foreignObject>
      <rect
        width={187}
        height={52}
        x={497.5}
        y={1834.5}
        fill={colors.accent}
        rx={26}
      />
      <foreignObject width={187} height={52} x={497.5} y={1834.5}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-xl"
            style={{
              color: colors.bg,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Download
          </div>
        </div>
      </foreignObject>
      <rect
        width={243}
        height={50}
        x={698.5}
        y={1835.5}
        fill={colors.bg}
        rx={25}
      />
      <rect
        width={243}
        height={50}
        x={698.5}
        y={1835.5}
        stroke={colors.accent}
        strokeWidth={2}
        rx={25}
      />
      <foreignObject width={243} height={50} x={698.5} y={1835.5}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-xl"
            style={{
              color: colors.accent,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            See Walkthrough
          </div>
        </div>
      </foreignObject>
      <g clipPath={`url(#i${id})`}>
        <path fill={colors.bg} d="M0 1908h1440v435H0z" />
        <path
          fill={colors.accent}
          fillRule="evenodd"
          d="M1394.91 2055.03c46.05-1.06 85.81 27.37 123.65 53.59 38.68 26.8 75.98 56.11 96.04 98.63 22 46.6 36.38 100.14 20.96 149.3-15.49 49.38-62.53 78.77-102.74 111.41-42.82 34.77-82.75 82.03-137.91 83.96-55.65 1.95-108.8-31.91-145.11-74.06-32.35-37.56-21.77-93.19-38.95-139.66-18.32-49.51-79.22-89.63-64.61-140.35 14.53-50.45 83.53-57.44 129.11-83.62 39.53-22.7 73.97-58.15 119.56-59.2Z"
          clipRule="evenodd"
        />
      </g>
      <foreignObject width={450} height={500} x={150} y={1870}>
        <div className="flex flex-col w-full h-full justify-center">
          <div
            className="flex text-[40px]"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            OpenType features
          </div>
          <div
            className="flex text-[26px] mt-6 leading-[32px] mr-10"
            style={{
              color: shades.primaryLight,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            Most calendars are designed for teams. Slate is designed for
            freelancers who want a simple way to plan their schedule.
          </div>
          <div
            className="flex text-[20px] mt-14"
            style={{
              color: colors.accent,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            LEARN MORE
          </div>
        </div>
      </foreignObject>
      <foreignObject x="800" y="1930" width="600" height="400">
        <div>
          <Image
            src="/editor-img-2.png"
            alt="editor-img-1"
            width={600}
            height={400}
          />
        </div>
      </foreignObject>
      <g clipPath={`url(#k${id})`}>
        <path fill={colors.bg} d="M0 2343h1440v435H0z" />
        <path
          fill={colors.extra}
          fillRule="evenodd"
          d="M83.151 2504c140.332 0 259.349 108.37 259.349 248.67 0 141.29-118.023 252.33-259.349 252.33-128.384 0-210.651-123.98-210.651-252.33 0-127.26 83.363-248.67 210.651-248.67Z"
          clipRule="evenodd"
        />
      </g>
      <foreignObject width={450} height={500} x={930} y={2310}>
        <div className="flex flex-col w-full h-full justify-center">
          <div
            className="flex text-[40px]"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Variable fonts
          </div>
          <div
            className="flex text-[26px] mt-6 leading-[32px] mr-10"
            style={{
              color: shades.primaryLight,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            Most calendars are designed for teams. Slate is designed for
            freelancers
          </div>
          <div
            className="flex text-[20px] mt-14"
            style={{
              color: colors.accent,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            LEARN MORE
          </div>
        </div>
      </foreignObject>
      <foreignObject x="100" y="2360" width="600" height="400">
        <div>
          <Image
            src="/editor-img-3.png"
            alt="editor-img-1"
            width={600}
            height={400}
          />
        </div>
      </foreignObject>
      <path fill={colors.bg} d="M0 2778h1440v118H0z" />
      <g clipPath={`url(#m${id})`}>
        <path fill={`url(#n${id})`} d="M101.5 2794h186v58h-186z" />
        <foreignObject x="105" y="2840" width="300" height="50">
          <div className="flex">
            <p
              className="text-xl"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              {"Just type what's on your mind"}
            </p>
          </div>
        </foreignObject>
      </g>
      <foreignObject x="530" y="2830" width="400" height="90">
        <div className="flex gap-14">
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Home
          </p>
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Product
          </p>
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            About
          </p>
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Contact
          </p>
        </div>
      </foreignObject>
      <g fill={colors.primary} clipPath={`url(#q${id})`}>
        <path d="M1184.13 2824.33c-1.51.65-3.14 1.12-4.83 1.3a8.414 8.414 0 0 0 3.69-4.62 16.77 16.77 0 0 1-5.32 2.02c-.79-.84-1.74-1.5-2.79-1.96a8.325 8.325 0 0 0-3.34-.69c-4.64 0-8.38 3.77-8.38 8.39 0 .65.08 1.3.2 1.92a23.825 23.825 0 0 1-17.28-8.77 8.262 8.262 0 0 0-1.14 4.23c0 2.91 1.48 5.48 3.73 6.99a8.572 8.572 0 0 1-3.79-1.07v.1c0 4.08 2.88 7.46 6.72 8.23-.72.19-1.46.29-2.2.29-.55 0-1.07-.06-1.59-.13a8.423 8.423 0 0 0 7.84 5.82 16.84 16.84 0 0 1-10.41 3.58c-.7 0-1.35-.02-2.02-.1 3.71 2.38 8.12 3.76 12.87 3.76 15.42 0 23.86-12.78 23.86-23.86 0-.37 0-.73-.03-1.09a18.07 18.07 0 0 0 4.21-4.34ZM1261.59 2817.33h-36.18c-.87 0-1.58.71-1.58 1.58v36.18c0 .87.71 1.58 1.58 1.58h36.18c.87 0 1.58-.71 1.58-1.58v-36.18c0-.87-.71-1.58-1.58-1.58Zm-4.54 11.48h-3.14c-2.47 0-2.94 1.17-2.94 2.89v3.8h5.88l-.77 5.93h-5.11v15.24h-6.13v-15.24h-5.13v-5.93h5.13v-4.38c0-5.08 3.1-7.85 7.63-7.85 2.18 0 4.04.17 4.58.24v5.3ZM1341.42 2817.33h-36.19c-.87 0-1.57.71-1.57 1.58v36.18c0 .87.7 1.58 1.57 1.58h36.19c.87 0 1.57-.71 1.57-1.58v-36.18c0-.87-.7-1.58-1.57-1.58Zm-26.09 33.52h-5.84v-18.77h5.84v18.77Zm-2.92-21.34a3.358 3.358 0 0 1-3.12-2.09 3.33 3.33 0 0 1-.19-1.95c.13-.66.45-1.26.92-1.73.47-.48 1.08-.8 1.73-.93.66-.13 1.34-.06 1.96.19.62.26 1.14.69 1.52 1.25.37.56.57 1.21.57 1.88a3.39 3.39 0 0 1-3.39 3.38Zm24.77 21.34h-5.83v-9.13c0-2.18-.04-4.98-3.04-4.98-3.03 0-3.5 2.37-3.5 4.82v9.29h-5.82v-18.77h5.59v2.56h.08c.78-1.47 2.68-3.03 5.52-3.03 5.91 0 7 3.89 7 8.94v10.3Z" />
      </g>
    </g>
    <foreignObject x="1000" y="2840" width="584" height="66">
      <div
        className="h-full items-center flex text-lg pl-10"
        style={{
          color: colors.primary,
          fontFamily: fonts.primary.fontFamily,
        }}
      >
        Template designed by{" "}
        <a
          target="_blank"
          href="https://www.figma.com/@captaindesign"
          rel="noopener noreferrer"
          className="ml-1 underline cursor-pointer"
        >
          Captain Design
        </a>
      </div>
    </foreignObject>
    <defs>
      <clipPath id={`a${id}`}>
        <path fill={colors.bg} d="M0 0h1440v2896H0z" />
      </clipPath>
      <clipPath id={`b${id}`}>
        <path fill={colors.bg} d="M0 0h1440v1537H0z" />
      </clipPath>
      <clipPath id={`e${id}`}>
        <path fill={colors.bg} d="M516.5 69.5h407v40h-407z" />
      </clipPath>
      <clipPath id={`f${id}`}>
        <path fill={colors.bg} d="M516.5 69.5h407v40h-407z" />
      </clipPath>
      <clipPath id={`h${id}`}>
        <path fill={colors.bg} d="M403 1547.5h634v257H403z" />
      </clipPath>
      <clipPath id={`i${id}`}>
        <path fill={colors.bg} d="M0 1908h1440v435H0z" />
      </clipPath>
      <clipPath id={`j${id}`}>
        <path fill={colors.bg} d="M141.5 1981.5h459v288h-459z" />
      </clipPath>
      <clipPath id={`k${id}`}>
        <path fill={colors.bg} d="M0 2343h1440v435H0z" />
      </clipPath>
      <clipPath id={`l${id}`}>
        <path fill={colors.bg} d="M919 2435.5h380v250H919z" />
      </clipPath>
      <clipPath id={`m${id}`}>
        <path fill={colors.bg} d="M91.5 2794h266v86h-266z" />
      </clipPath>
      <clipPath id={`o${id}`}>
        <path fill={colors.bg} d="M544.5 2817h407v40h-407z" />
      </clipPath>
      <clipPath id={`p${id}`}>
        <path fill={colors.bg} d="M544.5 2817h407v40h-407z" />
      </clipPath>
      <clipPath id={`q${id}`}>
        <path fill={colors.bg} d="M1138.5 2811.83h210v50.346h-210z" />
      </clipPath>
      <pattern
        id={`d${id}`}
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref={`#r${id}`}
          transform="matrix(.00356 0 0 .01141 0 .192)"
        />
      </pattern>
      <pattern
        id={`n${id}`}
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref={`#r${id}`}
          transform="matrix(.00356 0 0 .01141 0 .192)"
        />
      </pattern>
      <linearGradient
        id={`c${id}`}
        x1={720}
        x2={720}
        y1={0}
        y2={1915.8}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.059} stopColor={colors.bg} stopOpacity={0.22} />
        <stop offset={0.198} stopColor={colors.accent} stopOpacity={0.06} />
        <stop offset={0.551} stopColor={colors.bg} />
      </linearGradient>
      <filter
        id={`g${id}`}
        width={1280}
        height={827}
        x={80.5}
        y={675}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={6} />
        <feGaussianBlur stdDeviation={40} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_748_86" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={6} />
        <feGaussianBlur stdDeviation={6} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
        <feBlend
          in2="effect1_dropShadow_748_86"
          result="effect2_dropShadow_748_86"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_748_86"
          result="shape"
        />
      </filter>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARkAAAA2CAYAAADzne1AAAAACXBIWXMAAAsTAAALEwEAmpwYAAA7N2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjAtMDEtMDdUMTE6NDI6NTIrMDE6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDIwLTAxLTA3VDExOjQyOjUyKzAxOjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAyMC0wMS0wN1QxMTo0Mjo1MiswMTowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6NzU4MzA3YTMtMjA1Zi0xMTRlLWIxYWUtODE2YTk2NGU0MzM0PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6NmRhZWNjODktMzEzYS0xMWVhLWJmMzQtYTBhZjliZTIwNGJjPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MzJkZmViNTMtOGQwMi0zYzRhLThhNzctZmU3MDhhYzIwODg2PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjMyZGZlYjUzLThkMDItM2M0YS04YTc3LWZlNzA4YWMyMDg4Njwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMC0wMS0wN1QxMTo0Mjo1MiswMTowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3NTgzMDdhMy0yMDVmLTExNGUtYjFhZS04MTZhOTY0ZTQzMzQ8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjAtMDEtMDdUMTE6NDI6NTIrMDE6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgICAgIDxyZGY6QmFnPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+ZmlnbWEgbCAgbmQ8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmZpZ21hIGwgIG5kPC9waG90b3Nob3A6TGF5ZXJUZXh0PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjgxPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjU0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4DD4LoAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAs9SURBVHja7J1diJxXGcd/Z7Jqigm46RmlGItO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"
        id={`r${id}`}
        width={281}
        height={54}
      />
    </defs>
  </svg>
);

export default EditorTemplate;
