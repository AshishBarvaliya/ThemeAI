import { TemplateProps } from "@/interfaces/templates";
import * as React from "react";
import Image from "next/image";

const FoodieTemplate: React.FC<TemplateProps> = ({
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
      <path
        fill={colors.primary}
        d="M1365 46c0-.265.11-.52.29-.707.19-.188.44-.293.71-.293h14c.27 0 .52.105.71.293.18.187.29.442.29.707 0 .265-.11.52-.29.707-.19.188-.44.293-.71.293h-14c-.27 0-.52-.105-.71-.293A1.03 1.03 0 0 1 1365 46ZM1365 58c0-.265.11-.52.29-.707.19-.188.44-.293.71-.293h14c.27 0 .52.105.71.293.18.187.29.442.29.707 0 .265-.11.52-.29.707-.19.188-.44.293-.71.293h-14c-.27 0-.52-.105-.71-.293A1.03 1.03 0 0 1 1365 58ZM1372 51c-.27 0-.52.105-.71.293a1.03 1.03 0 0 0-.29.707c0 .265.11.52.29.707.19.188.44.293.71.293h8c.27 0 .52-.105.71-.293.18-.187.29-.442.29-.707 0-.265-.11-.52-.29-.707A1.003 1.003 0 0 0 1380 51h-8Z"
      />
      <rect width={66} height={24} x={1225} y={40} fill={colors.extra} rx={5} />
      <foreignObject width={66} height={24} x={1225} y={40}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-xl"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Login
          </div>
        </div>
      </foreignObject>
      <foreignObject x="800" y="38" width="400" height="40">
        <div className="flex gap-[60px]">
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Home
          </p>
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            About
          </p>
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Blog
          </p>
          <p
            className="text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Account
          </p>
        </div>
      </foreignObject>

      <path
        fill={colors.primary}
        d="M60.952 62a.934.934 0 0 1-.684-.288.934.934 0 0 1-.288-.684V37.772c0-.264.096-.492.288-.684a.934.934 0 0 1 .684-.288h18.144c.264 0 .492.096.684.288.192.192.288.42.288.684v5.472a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288H68.8v2.664h9.576c.264 0 .492.096.684.288.192.192.288.42.288.684v5.436a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288H68.8v6.768a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288h-6.876Zm30.622.36c-3.6 0-6.468-.828-8.604-2.484-2.136-1.656-3.276-4.068-3.42-7.236a95.252 95.252 0 0 1-.036-3.132c0-1.464.012-2.532.036-3.204.072-2.064.612-3.84 1.62-5.328 1.032-1.488 2.436-2.616 4.212-3.384 1.776-.768 3.84-1.152 6.192-1.152 2.352 0 4.416.384 6.192 1.152 1.776.768 3.168 1.896 4.176 3.384 1.032 1.488 1.584 3.264 1.656 5.328.048 1.344.072 2.412.072 3.204 0 .792-.024 1.836-.072 3.132-.144 3.168-1.284 5.58-3.42 7.236-2.136 1.656-5.004 2.484-8.604 2.484Zm0-7.02c.816 0 1.452-.24 1.908-.72.48-.48.732-1.212.756-2.196.048-1.392.072-2.412.072-3.06 0-.696-.024-1.692-.072-2.988-.024-.984-.276-1.716-.756-2.196-.48-.48-1.116-.72-1.908-.72-.792 0-1.428.24-1.908.72s-.732 1.212-.756 2.196a89.119 89.119 0 0 0-.036 2.988c0 1.344.012 2.364.036 3.06.024.984.264 1.716.72 2.196.48.48 1.128.72 1.944.72Zm23.838 7.02c-3.6 0-6.468-.828-8.604-2.484-2.136-1.656-3.276-4.068-3.42-7.236a95.252 95.252 0 0 1-.036-3.132c0-1.464.012-2.532.036-3.204.072-2.064.612-3.84 1.62-5.328 1.032-1.488 2.436-2.616 4.212-3.384 1.776-.768 3.84-1.152 6.192-1.152 2.352 0 4.416.384 6.192 1.152 1.776.768 3.168 1.896 4.176 3.384 1.032 1.488 1.584 3.264 1.656 5.328.048 1.344.072 2.412.072 3.204 0 .792-.024 1.836-.072 3.132-.144 3.168-1.284 5.58-3.42 7.236-2.136 1.656-5.004 2.484-8.604 2.484Zm0-7.02c.816 0 1.452-.24 1.908-.72.48-.48.732-1.212.756-2.196.048-1.392.072-2.412.072-3.06 0-.696-.024-1.692-.072-2.988-.024-.984-.276-1.716-.756-2.196-.48-.48-1.116-.72-1.908-.72-.792 0-1.428.24-1.908.72s-.732 1.212-.756 2.196a89.119 89.119 0 0 0-.036 2.988c0 1.344.012 2.364.036 3.06.024.984.264 1.716.72 2.196.48.48 1.128.72 1.944.72ZM128.847 62a.934.934 0 0 1-.684-.288.934.934 0 0 1-.288-.684V37.772c0-.264.096-.492.288-.684a.934.934 0 0 1 .684-.288h10.368c2.28 0 4.308.384 6.084 1.152 1.776.768 3.192 1.896 4.248 3.384s1.62 3.276 1.692 5.364c.048 1.344.072 2.256.072 2.736 0 .456-.024 1.332-.072 2.628-.144 3.312-1.272 5.796-3.384 7.452-2.088 1.656-4.908 2.484-8.46 2.484h-10.548Zm10.368-7.02c.84 0 1.512-.24 2.016-.72.528-.504.816-1.236.864-2.196a40.8 40.8 0 0 0 .072-2.7c0-1.128-.024-2.016-.072-2.664-.048-.96-.36-1.68-.936-2.16-.552-.48-1.26-.72-2.124-.72h-2.16v11.16h2.34ZM152.616 62a.934.934 0 0 1-.684-.288.934.934 0 0 1-.288-.684V37.772c0-.264.096-.492.288-.684a.934.934 0 0 1 .684-.288h7.344c.264 0 .492.096.684.288.192.192.288.42.288.684v23.256a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288h-7.344Zm10.373 0a.934.934 0 0 1-.684-.288.934.934 0 0 1-.288-.684V37.772c0-.264.096-.492.288-.684a.934.934 0 0 1 .684-.288h18.468c.264 0 .492.096.684.288.192.192.288.42.288.684v5.076a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288h-10.8v2.268h10.008c.264 0 .492.096.684.288.192.192.288.42.288.684v4.68a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288h-10.008v2.268h11.089c.263 0 .491.096.683.288.193.192.289.42.289.684v5.076a.932.932 0 0 1-.289.684.934.934 0 0 1-.683.288h-18.757Zm30.672.36c-2.544 0-4.704-.348-6.48-1.044-1.752-.696-3.072-1.62-3.96-2.772-.888-1.176-1.356-2.46-1.404-3.852 0-.216.072-.396.216-.54a.793.793 0 0 1 .576-.252h6.84c.336 0 .6.048.792.144.216.072.468.228.756.468.696.552 1.584.828 2.664.828.816 0 1.464-.084 1.944-.252.504-.192.756-.444.756-.756 0-.432-.324-.756-.972-.972-.648-.24-1.872-.48-3.672-.72-6.192-.816-9.288-3.456-9.288-7.92 0-1.608.456-3.036 1.368-4.284.936-1.272 2.232-2.256 3.888-2.952 1.656-.696 3.564-1.044 5.724-1.044 2.256 0 4.236.384 5.94 1.152 1.704.768 3.012 1.74 3.924 2.916.912 1.152 1.392 2.28 1.44 3.384a.793.793 0 0 1-.252.576.69.69 0 0 1-.504.216h-7.2c-.336 0-.6-.036-.792-.108a3.06 3.06 0 0 1-.648-.468c-.504-.432-1.14-.648-1.908-.648-1.152 0-1.728.336-1.728 1.008 0 .36.276.66.828.9.576.24 1.632.456 3.168.648 2.4.312 4.32.78 5.76 1.404 1.464.624 2.52 1.464 3.168 2.52.672 1.032 1.008 2.34 1.008 3.924 0 1.704-.516 3.204-1.548 4.5-1.032 1.272-2.46 2.256-4.284 2.952-1.8.696-3.84 1.044-6.12 1.044Zm12.214-.36a.934.934 0 0 1-.684-.288.934.934 0 0 1-.288-.684v-6.264c0-.264.096-.492.288-.684a.934.934 0 0 1 .684-.288h6.264c.264 0 .492.096.684.288.192.192.288.42.288.684v6.264a.934.934 0 0 1-.288.684.934.934 0 0 1-.684.288h-6.264Z"
      />
      <circle
        cx={-0.5}
        cy={2346.5}
        r={63}
        stroke={colors.extra}
        strokeOpacity={0.67}
        strokeWidth={31}
      />
      <circle
        cx={358}
        cy={1245}
        r={441}
        fill={shades.bgLight}
        fillOpacity={0.6}
      />
      <circle
        cx={1498.5}
        cy={2008.5}
        r={292.5}
        fill={shades.bgLight}
        fillOpacity={0.6}
      />
      <circle
        cx={1192.5}
        cy={3066.5}
        r={292.5}
        fill={colors.extra}
        fillOpacity={0.67}
      />
      <circle
        cx={1192.5}
        cy={3066.5}
        r={451}
        stroke={colors.extra}
        strokeOpacity={0.67}
        strokeWidth={141}
      />
      <foreignObject width={170} height={100} x={210} y={2740}>
        <p
          className="flex text-[37px]"
          style={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          Foodies.
        </p>
      </foreignObject>
      <foreignObject width={700} height={200} x={545} y={2740}>
        <div className="flex justify-between">
          <div
            className="flex text-[17px]"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Free Design template by TemplatesJungle.com
          </div>
          <div className="flex flex-col">
            <div
              className="flex text-2xl underline"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              hello@templatesjungle.com
            </div>
            <div
              className="flex text-xl"
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              15Th Street Avenue, New York, USA
            </div>
            <div
              className="flex text-xl"
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              011-554-8798-6556
            </div>
          </div>
        </div>
      </foreignObject>
      <foreignObject width={700} height={100} x={350} y={2440}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-5xl uppercase"
            style={{
              color: colors.accent,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Call us for any queries.
          </div>
        </div>
      </foreignObject>
      <foreignObject width={1440} height={100} x={0} y={2530}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-[78px] uppercase text-center"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            +111 1234 2344 1232
          </div>
        </div>
      </foreignObject>
      <foreignObject width={500} height={100} x={470} y={1900}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-5xl uppercase"
            style={{
              color: colors.accent,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Our Testimonials
          </div>
        </div>
      </foreignObject>
      <foreignObject width={600} height={300} x={480} y={1980}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-[32px]"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
            }}
          >
            Food is amazing and delivered quickly. Excellent communication
            skills made things much simpler and faster.
          </div>
        </div>
      </foreignObject>
      <foreignObject width={400} height={60} x={425} y={2255}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-lg"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            <span
              style={{
                color: shades.primaryLight,
                fontFamily: fonts.primary.fontFamily,
                fontWeight: "normal",
              }}
            >
              Dr. Steve Watson,
            </span>
            Greenland Studio in.
          </div>
        </div>
      </foreignObject>
      <path
        fill={colors.accent}
        stroke={colors.bg}
        d="m316.865 2119.46-.224.75.775-.11.206-.03c.882-.13 1.729-.25 2.606-.25v-.5.5c3.676 0 7.277 1.03 10.386 2.98a19.37 19.37 0 0 1 7.182 8.03 19.227 19.227 0 0 1 1.766 10.59 19.278 19.278 0 0 1-4.194 9.9 19.493 19.493 0 0 1-8.863 6.15 19.643 19.643 0 0 1-10.799.5 19.533 19.533 0 0 1-9.403-5.3 19.277 19.277 0 0 1-5.108-9.46l-.106-.5-.083.02-.031-.2a33.14 33.14 0 0 1-.276-2.34l-.001-.02c-.183-1.87-.272-4.48-.122-7.62.18-3.14.646-6.79 1.686-10.64a48.361 48.361 0 0 1 2.05-5.82c.097-.2.194-.41.291-.61.831-1.75 1.64-3.46 2.773-5.03l.014-.02.011-.02c1.094-1.83 2.51-3.46 3.97-5.03l.013-.02.012-.01c.637-.81 1.394-1.49 2.193-2.15.283-.23.577-.46.873-.7a41.6 41.6 0 0 0 1.526-1.25c.743-.62 1.543-1.12 2.357-1.6.275-.16.556-.32.837-.48.539-.3 1.081-.61 1.588-.93h.01c.717-.48 1.469-.82 2.23-1.13.268-.1.546-.21.824-.32.484-.18.971-.36 1.422-.56.365-.14.713-.29 1.047-.42 1.018-.41 1.908-.77 2.765-.93h.016l.016-.01c.676-.17 1.294-.32 1.861-.46.426-.1.822-.2 1.193-.29h.002l2.163-.52 1.926 7.65-1.702.7h-.002l-2.372.97c-.523.17-1.017.43-1.494.71-.218.12-.438.26-.656.39-.024.01-.048.03-.072.04-.243.15-.487.3-.738.44l-.014.01-.014.01c-.322.21-.662.4-1.029.6-.174.09-.354.19-.541.3-.56.32-1.148.69-1.666 1.19-.347.32-.724.61-1.124.92-.132.11-.266.21-.403.32-.542.42-1.102.89-1.583 1.47l-.006.01h-.005c-.298.39-.629.73-.98 1.1-.13.14-.263.28-.398.42-.48.52-.966 1.09-1.326 1.78l-.054.09c-.752 1.13-1.537 2.32-2.051 3.68-.524.98-.849 2.06-1.15 3.06Zm48.805 0-.224.75.775-.11.206-.03c.882-.13 1.728-.25 2.606-.25 3.676 0 7.277 1.03 10.386 2.98a19.37 19.37 0 0 1 7.182 8.03 19.218 19.218 0 0 1 1.765 10.59 19.262 19.262 0 0 1-4.194 9.9 19.485 19.485 0 0 1-8.862 6.15 19.643 19.643 0 0 1-10.799.5 19.531 19.531 0 0 1-9.404-5.3 19.283 19.283 0 0 1-5.107-9.46l-.107-.5-.083.02-.03-.2a33.14 33.14 0 0 1-.276-2.34l-.001-.02c-.184-1.87-.272-4.48-.123-7.62.181-3.14.647-6.79 1.687-10.64a48.361 48.361 0 0 1 2.05-5.82c.097-.2.194-.41.29-.61.832-1.75 1.64-3.46 2.774-5.03l.013-.02.012-.02c1.094-1.83 2.509-3.46 3.97-5.03l.012-.02.012-.01c.638-.8 1.394-1.49 2.194-2.14.282-.23.574-.47.868-.7.52-.41 1.047-.83 1.531-1.26.743-.61 1.542-1.12 2.357-1.59.275-.16.555-.32.837-.48.539-.31 1.081-.61 1.588-.93l.01-.01c.717-.48 1.469-.82 2.231-1.12.261-.11.53-.21.8-.31.492-.19.987-.38 1.445-.58.365-.14.713-.29 1.047-.42 1.018-.41 1.908-.77 2.765-.93h.016l.015-.01c.677-.17 1.295-.32 1.862-.46.425-.1.822-.2 1.192-.29h.003l2.163-.52 1.926 7.65-1.702.7h-.002l-2.373.97c-.523.17-1.017.43-1.494.71-.217.12-.437.26-.655.39l-.072.04c-.244.15-.487.3-.738.44l-.014.01-.015.01c-.321.21-.661.4-1.028.6-.174.09-.354.19-.541.3-.561.32-1.149.69-1.666 1.19-.347.32-.724.61-1.124.92-.132.11-.266.21-.403.32-.542.42-1.103.89-1.583 1.47l-.006.01h-.006c-.297.39-.628.73-.98 1.1-.13.14-.262.28-.397.42-.48.52-.967 1.09-1.326 1.78l-.055.09c-.751 1.13-1.536 2.32-2.05 3.68-.525.98-.849 2.06-1.15 3.06Z"
      />
      <path
        fill={colors.accent}
        d="M887.056 1620.98c-1.059 0-2.075.41-2.824 1.14a3.847 3.847 0 0 0-1.17 2.76v15.57c0 1.04.421 2.03 1.17 2.76a4.047 4.047 0 0 0 2.824 1.14c1.06 0 2.076-.41 2.825-1.14a3.847 3.847 0 0 0 1.17-2.76v-15.57c0-1.04-.421-2.03-1.17-2.76a4.048 4.048 0 0 0-2.825-1.14Zm-15.977 11.69c-1.06 0-2.076.41-2.825 1.14a3.842 3.842 0 0 0-1.17 2.75v3.89c0 1.04.421 2.03 1.17 2.76a4.048 4.048 0 0 0 2.825 1.14c1.059 0 2.075-.41 2.824-1.14a3.847 3.847 0 0 0 1.17-2.76v-3.89c0-1.03-.421-2.02-1.17-2.75a4.047 4.047 0 0 0-2.824-1.14Zm15.977-42.84a40.978 40.978 0 0 0-15.286 2.96 40.034 40.034 0 0 0-12.958 8.45c-7.491 7.3-11.699 17.2-11.699 27.53-.035 8.99 3.158 17.71 9.027 24.65l-7.989 7.79a3.86 3.86 0 0 0-1.079 2 3.79 3.79 0 0 0 .24 2.24c.332.7.87 1.29 1.546 1.7.675.4 1.458.59 2.249.56h35.949c10.594 0 20.754-4.1 28.245-11.4C922.792 1649 927 1639.1 927 1628.77c0-10.33-4.208-20.23-11.699-27.53-7.491-7.31-17.651-11.41-28.245-11.41Zm0 70.09h-26.323l3.715-3.62c.378-.36.678-.79.884-1.26.205-.48.312-.99.314-1.5a3.852 3.852 0 0 0-1.198-2.73c-5.23-5.09-8.487-11.8-9.216-18.97-.729-7.17 1.115-14.37 5.219-20.36 4.103-6 10.212-10.42 17.284-12.51a32.726 32.726 0 0 1 21.505 1.01c6.832 2.76 12.473 7.73 15.962 14.09a30.46 30.46 0 0 1 3.175 20.76c-1.437 7.07-5.344 13.43-11.055 18.01-5.711 4.57-12.873 7.08-20.266 7.08Zm15.978-46.73c-1.06 0-2.076.42-2.825 1.15a3.842 3.842 0 0 0-1.17 2.75v23.36c0 1.04.421 2.03 1.17 2.76a4.048 4.048 0 0 0 2.825 1.14c1.059 0 2.075-.41 2.824-1.14a3.847 3.847 0 0 0 1.17-2.76v-23.36c0-1.03-.421-2.02-1.17-2.75a4.057 4.057 0 0 0-2.824-1.15ZM1194 1594.7h-56c-3.18 0-6.23 1.23-8.49 3.42a11.519 11.519 0 0 0-3.51 8.26v38.94c0 3.1 1.26 6.07 3.51 8.26 2.26 2.2 5.31 3.43 8.49 3.43h12v7.78h-12c-1.06 0-2.08.42-2.83 1.15s-1.17 1.72-1.17 2.75.42 2.02 1.17 2.75 1.77 1.14 2.83 1.14h56c1.06 0 2.08-.41 2.83-1.14s1.17-1.72 1.17-2.75-.42-2.02-1.17-2.75a4.071 4.071 0 0 0-2.83-1.15h-12v-7.78h12c3.18 0 6.23-1.23 8.49-3.43 2.25-2.19 3.51-5.16 3.51-8.26v-38.94c0-3.1-1.26-6.07-3.51-8.26a12.203 12.203 0 0 0-8.49-3.42Zm-20 70.09h-16v-7.78h16v7.78Zm24-19.47c0 1.04-.42 2.03-1.17 2.76s-1.77 1.14-2.83 1.14h-56c-1.06 0-2.08-.41-2.83-1.14a3.843 3.843 0 0 1-1.17-2.76v-3.89h64v3.89Zm0-11.68h-64v-27.26c0-1.03.42-2.02 1.17-2.75s1.77-1.14 2.83-1.14h56c1.06 0 2.08.41 2.83 1.14s1.17 1.72 1.17 2.75v27.26ZM574.304 1610.95h-.009l-.014.01.023-.01Zm44.24-.81a5.376 5.376 0 0 0-1.022-.75 4.48 4.48 0 0 0-1.709-.56 4.37 4.37 0 0 0-1.798.14c-.583.16-1.125.44-1.592.82-.467.38-.85.84-1.124 1.37a25.032 25.032 0 0 1-6.213 7.65 36.2 36.2 0 0 0 .595-6.5 36.577 36.577 0 0 0-5.231-18.87c-3.436-5.73-8.378-10.48-14.324-13.76a4.588 4.588 0 0 0-2.148-.56 4.5 4.5 0 0 0-2.16.52 4.45 4.45 0 0 0-1.631 1.46 4.228 4.228 0 0 0-.692 2.05 29.496 29.496 0 0 1-3.239 11.73 30.395 30.395 0 0 1-7.744 9.54l-1.022.8a37.569 37.569 0 0 0-8.835 8.02c-3.857 4.71-6.529 10.21-7.803 16.09a37.452 37.452 0 0 0 .46 17.77 38.288 38.288 0 0 0 8.625 15.7c4.095 4.51 9.219 8.03 14.967 10.29a4.555 4.555 0 0 0 4.155-.41c.605-.4 1.1-.93 1.443-1.55a4.21 4.21 0 0 0 .522-2.02 4.327 4.327 0 0 0-.223-1.34 29.137 29.137 0 0 1-.844-11.11c4.206 7.68 10.958 13.76 19.169 17.28 1.002.43 2.134.49 3.178.16 6.486-2.02 12.33-5.62 16.975-10.45 4.645-4.83 7.938-10.73 9.565-17.14a37.524 37.524 0 0 0-.268-19.48c-1.802-6.37-5.256-12.18-10.032-16.89Zm-17.356 55.22a30.82 30.82 0 0 1-10.031-7.83 29.689 29.689 0 0 1-5.867-11.11 37.727 37.727 0 0 1-.8-4.15 4.242 4.242 0 0 0-1.173-2.37 4.492 4.492 0 0 0-2.378-1.27 4.54 4.54 0 0 0-3.073.5c-.677.38-1.239.92-1.629 1.58a37.56 37.56 0 0 0-5.356 20.3 30.286 30.286 0 0 1-7.976-8.95 29.38 29.38 0 0 1-3.798-11.23c-.486-3.95-.158-7.95.966-11.78a29.765 29.765 0 0 1 5.582-10.51 28.872 28.872 0 0 1 6.942-6.27c.116-.07.227-.15.333-.24 0 0 1.316-1.05 1.36-1.07 6.334-5.19 10.84-12.16 12.889-19.94 4.842 4.33 8.07 10.1 9.183 16.39a28.167 28.167 0 0 1-3.027 18.41 4.21 4.21 0 0 0-.481 2.46c.094.84.445 1.64 1.008 2.3a4.476 4.476 0 0 0 2.156 1.37c.843.24 1.74.23 2.579-.02 6.808-2.07 12.798-6.11 17.164-11.57a29.53 29.53 0 0 1 5.022 12.52c.68 4.48.305 9.06-1.095 13.38a29.937 29.937 0 0 1-6.995 11.6 31.148 31.148 0 0 1-11.505 7.5ZM338.364 1600.1h-72.728c-.964 0-1.889.37-2.571 1.03a3.517 3.517 0 0 0-1.065 2.51v14.16c.006 2.19.709 4.33 2.011 6.11a10.866 10.866 0 0 0 5.262 3.87v32.5c0 .94.383 1.84 1.065 2.5a3.664 3.664 0 0 0 2.571 1.04h58.182c.964 0 1.889-.37 2.571-1.04a3.477 3.477 0 0 0 1.065-2.5v-32.5c2.122-.73 3.96-2.08 5.262-3.87a10.402 10.402 0 0 0 2.011-6.11v-14.16c0-.94-.383-1.84-1.065-2.51a3.698 3.698 0 0 0-2.571-1.03Zm-25.455 7.08h7.273v10.62c0 .94-.383 1.84-1.065 2.5a3.664 3.664 0 0 1-2.572 1.04c-.964 0-1.889-.37-2.571-1.04a3.477 3.477 0 0 1-1.065-2.5v-10.62Zm-14.545 0h7.272v10.62c0 .94-.383 1.84-1.065 2.5a3.664 3.664 0 0 1-2.571 1.04c-.964 0-1.889-.37-2.571-1.04a3.477 3.477 0 0 1-1.065-2.5v-10.62Zm-14.546 0h7.273v10.62c0 .94-.383 1.84-1.065 2.5a3.664 3.664 0 0 1-2.571 1.04c-.965 0-1.89-.37-2.572-1.04a3.477 3.477 0 0 1-1.065-2.5v-10.62Zm-10.909 14.16c-.964 0-1.889-.37-2.571-1.04a3.477 3.477 0 0 1-1.065-2.5v-10.62h7.272v10.62c0 .94-.383 1.84-1.065 2.5a3.662 3.662 0 0 1-2.571 1.04Zm36.364 35.4h-14.546v-7.08c0-1.88.767-3.68 2.13-5.01a7.406 7.406 0 0 1 5.143-2.07c1.929 0 3.779.75 5.143 2.07a6.998 6.998 0 0 1 2.13 5.01v7.08Zm18.182 0h-10.91v-7.08c0-3.76-1.532-7.36-4.26-10.01-2.728-2.66-6.427-4.15-10.285-4.15-3.858 0-7.557 1.49-10.285 4.15-2.728 2.65-4.26 6.25-4.26 10.01v7.08h-10.91v-28.96c1.337-.48 2.57-1.2 3.637-2.12 2 1.74 4.589 2.7 7.273 2.7 2.683 0 5.272-.96 7.272-2.7 2 1.74 4.59 2.7 7.273 2.7s5.273-.96 7.273-2.7c2 1.74 4.589 2.7 7.272 2.7 2.684 0 5.273-.96 7.273-2.7 1.067.92 2.3 1.64 3.637 2.12v28.96Zm7.272-38.94c0 .94-.383 1.84-1.065 2.5a3.664 3.664 0 0 1-2.571 1.04c-.965 0-1.889-.37-2.571-1.04a3.477 3.477 0 0 1-1.065-2.5v-10.62h7.272v10.62ZM274 1593.02h57.091c.964 0 1.889-.38 2.571-1.04a3.477 3.477 0 0 0 1.065-2.5c0-.94-.383-1.84-1.065-2.51a3.698 3.698 0 0 0-2.571-1.03H274c-.964 0-1.889.37-2.571 1.03a3.517 3.517 0 0 0-1.065 2.51c0 .94.383 1.84 1.065 2.5a3.707 3.707 0 0 0 2.571 1.04Z"
      />
      <foreignObject x="10" y="1750" width="1430" height="140">
        <div className="flex flex-1 justify-center gap-12">
          <div className="flex items-center flex-col w-[240px] justify-center">
            <p
              className="text-[29px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
                fontWeight: "bold",
              }}
            >
              100+ Options
            </p>
            <p
              className="text-[17px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              At in proin consequat ut cursus venenatis sapien.
            </p>
          </div>
          <div className="flex items-center flex-col w-[240px] justify-center">
            <p
              className="text-[28px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
                fontWeight: "bold",
              }}
            >
              Good Quality
            </p>
            <p
              className="text-[17px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              At in proin consequat ut cursus venenatis sapien.
            </p>
          </div>
          <div className="flex items-center flex-col w-[240px] justify-center">
            <p
              className="text-[28px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
                fontWeight: "bold",
              }}
            >
              Communication
            </p>
            <p
              className="text-[17px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              At in proin consequat ut cursus venenatis sapien.
            </p>
          </div>
          <div className="flex items-center flex-col w-[240px] justify-center">
            <p
              className="text-[28px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
                fontWeight: "bold",
              }}
            >
              Online Order
            </p>
            <p
              className="text-[17px] text-center"
              style={{
                color: colors.primary,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              At in proin consequat ut cursus venenatis sapien.
            </p>
          </div>
        </div>
      </foreignObject>
      <g filter={`url(#b${id})`}>
        <rect
          width={280.016}
          height={381.265}
          x={124}
          y={1087.24}
          fill={colors.primary}
          rx={30}
        />
      </g>
      <foreignObject width={280.016} height={381.265} x={124} y={1000}>
        <div className="flex justify-center">
          <img
            src="/foodie-img-4.png"
            alt="foodie-img-4"
            className="rounded-full"
          />
        </div>
      </foreignObject>
      <foreignObject width={280.016} height={340} x={124} y={1130}>
        <div className="flex flex-col items-center w-full h-full justify-end p-14 gap-8">
          <div
            className="flex text-[32px] text-center leading-[34px]"
            style={{
              color: colors.bg,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Veggie tomato mix
          </div>
          <div
            className="flex text-[17px] text-center"
            style={{
              color: colors.extra,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            USD 90.00
          </div>
        </div>
      </foreignObject>
      <g filter={`url(#c${id})`}>
        <rect
          width={280.016}
          height={381.265}
          x={429.146}
          y={1087.24}
          fill={colors.primary}
          rx={30}
        />
      </g>
      <foreignObject width={280.016} height={381.265} x={429.146} y={1000}>
        <div className="flex justify-center">
          <img
            src="/foodie-img-3.png"
            alt="foodie-img-3"
            className="rounded-full"
          />
        </div>
      </foreignObject>
      <foreignObject width={280.016} height={340} x={429} y={1130}>
        <div className="flex flex-col items-center w-full h-full justify-end p-14 gap-8">
          <div
            className="flex text-[32px] text-center leading-[34px]"
            style={{
              color: colors.bg,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Egg and cucmber...
          </div>
          <div
            className="flex text-[17px] text-center"
            style={{
              color: colors.extra,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            USD 40.00
          </div>
        </div>
      </foreignObject>
      <g filter={`url(#d${id})`}>
        <rect
          width={280.016}
          height={381.265}
          x={1039.44}
          y={1087.24}
          fill={colors.primary}
          rx={30}
        />
      </g>
      <foreignObject width={280.016} height={381.265} x={1039.44} y={1000}>
        <div className="flex justify-center">
          <img
            src="/foodie-img-5.png"
            alt="foodie-img-5"
            className="rounded-full"
          />
        </div>
      </foreignObject>
      <foreignObject width={280.016} height={340} x={1039} y={1130}>
        <div className="flex flex-col items-center w-full h-full justify-end p-14 gap-8">
          <div
            className="flex text-[32px] text-center leading-[34px]"
            style={{
              color: colors.bg,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Fried chicken m.
          </div>
          <div
            className="flex text-[17px] text-center"
            style={{
              color: colors.extra,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            USD 40.00
          </div>
        </div>
      </foreignObject>
      <g filter={`url(#e${id})`}>
        <rect
          width={280.016}
          height={381.265}
          x={734.292}
          y={1087.24}
          fill={colors.primary}
          rx={30}
        />
      </g>
      <foreignObject width={280.016} height={381.265} x={734.292} y={1000}>
        <div className="flex justify-center">
          <img
            src="/foodie-img-6.png"
            alt="foodie-img-6"
            className="rounded-full"
          />
        </div>
      </foreignObject>
      <foreignObject width={280.016} height={340} x={734} y={1130}>
        <div className="flex flex-col items-center w-full h-full justify-end p-14 gap-8">
          <div
            className="flex text-[32px] text-center leading-[34px]"
            style={{
              color: colors.bg,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Moi-moi and ekpa.
          </div>
          <div
            className="flex text-[17px] text-center"
            style={{
              color: colors.extra,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            USD 40.00
          </div>
        </div>
      </foreignObject>
      <foreignObject width={400} height={100} x={490} y={890}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-5xl uppercase"
            style={{
              color: colors.accent,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "bold",
            }}
          >
            Our specials
          </div>
        </div>
      </foreignObject>
      <ellipse
        cx={1337}
        cy={449.787}
        fill={colors.extra}
        rx={282}
        ry={274.545}
      />
      <ellipse
        cx={903}
        cy={462.443}
        fill={colors.accent}
        rx={271}
        ry={263.836}
      />
      <foreignObject x="600" y="260" width="600" height="600">
        <div>
          <Image
            src="/foodie-img-1.png"
            alt="foodie-img-1"
            width={600}
            height={600}
          />
        </div>
      </foreignObject>
      <foreignObject x="1000" y="240" width="500" height="500">
        <div>
          <Image
            src="/foodie-img-2.png"
            alt="foodie-img-2"
            width={500}
            height={500}
          />
        </div>
      </foreignObject>
      <foreignObject width={1000} height={400} x={150} y={230}>
        <div className="flex  flex-col">
          <div
            className="flex text-[116px] leading-[116px] uppercase"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "700",
            }}
          >
            Delicious
          </div>
          <div
            className="flex text-[116px] leading-[116px] uppercase"
            style={{
              color: colors.primary,
              fontFamily: fonts.primary.fontFamily,
              fontWeight: "700",
            }}
          >
            food for you
          </div>
        </div>
      </foreignObject>
      <foreignObject width={450} height={200} x={150} y={470}>
        <div className="flex items-center w-full h-full justify-center">
          <div
            className="flex text-[24px]"
            style={{
              color: shades.primaryLight,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            At in proin consequat ut cursus proin consequat ut cursus proin
            consequat ut cursus venenatis sapien.
          </div>
        </div>
      </foreignObject>
    </g>
    <defs>
      <filter
        id={`b${id}`}
        width={400.016}
        height={501.265}
        x={64}
        y={1057.24}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={30} />
        <feGaussianBlur stdDeviation={30} />
        <feColorMatrix values="0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4_793" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4_793"
          result="shape"
        />
      </filter>
      <filter
        id={`c${id}`}
        width={400.016}
        height={501.265}
        x={369.146}
        y={1057.24}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={30} />
        <feGaussianBlur stdDeviation={30} />
        <feColorMatrix values="0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4_793" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4_793"
          result="shape"
        />
      </filter>
      <filter
        id={`d${id}`}
        width={400.016}
        height={501.265}
        x={979.438}
        y={1057.24}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={30} />
        <feGaussianBlur stdDeviation={30} />
        <feColorMatrix values="0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4_793" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4_793"
          result="shape"
        />
      </filter>
      <filter
        id={`e${id}`}
        width={400.016}
        height={501.265}
        x={674.292}
        y={1057.24}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={30} />
        <feGaussianBlur stdDeviation={30} />
        <feColorMatrix values="0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0 0.225 0 0 0 0.1 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_4_793" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4_793"
          result="shape"
        />
      </filter>
      <clipPath id={`a${id}`}>
        <path fill={colors.primary} d="M0 0h1440v2896H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default FoodieTemplate;
