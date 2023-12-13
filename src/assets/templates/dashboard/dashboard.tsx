import { TemplateProps } from "@/interfaces/templates";
import * as React from "react";

const DashboardTemplate: React.FC<TemplateProps> = ({
  id,
  colors,
  shades,
  fonts,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className="w-full h-auto"
    viewBox="0 0 1440 900"
    fill="none"
    {...props}
  >
    <path fill={colors.bg} d="M0 0h1440v900H0z" />
    <path fill={colors.bg} d="M0 0h1400v900H0z" />
    <path fill={shades.bgDark} d="M3 0h276v879H3z" />
    <path fill={shades.bgDark} d="M3 0h276v879H3z" />
    <path fill={shades.bgDark} d="M0 12h276v879H0z" />
    <path fill={shades.bgDark} d="M3 0h276v879H3z" />
    <path fill={shades.bgDark} d="M3 20h276v880H3z" />
    <path fill="#E2E2E5" d="M0 0h276v900H0z" />
    <path fill={shades.bgDark} d="M3 0h276v900H3z" />
    <path fill={`url(#a${id})`} d="M3 127h276v64H3z" opacity={0.4} />
    <path
      fill={colors.accent}
      d="M274 131a4 4 0 0 1 4-4h.044v64H278a4 4 0 0 1-4-4v-56Z"
    />
    <path
      fill={colors.accent}
      d="M51.682 153.226 44 161.362v8.781c0 .227.07.445.196.606a.601.601 0 0 0 .47.251l4.67-.016a.601.601 0 0 0 .469-.252.997.997 0 0 0 .194-.605v-5.128c0-.227.07-.445.195-.606a.601.601 0 0 1 .472-.251h2.666c.177 0 .346.09.471.251a.996.996 0 0 1 .196.606v5.124c0 .113.017.225.05.329a.898.898 0 0 0 .144.279c.062.08.136.144.217.187a.544.544 0 0 0 .255.065l4.668.017c.176 0 .346-.09.47-.251a.995.995 0 0 0 .196-.606v-8.787l-7.68-8.13a.445.445 0 0 0-.319-.144.445.445 0 0 0-.318.144Zm12.133 5.53-3.483-3.692v-7.421a.748.748 0 0 0-.146-.455.453.453 0 0 0-.354-.188H57.5a.453.453 0 0 0-.353.188.748.748 0 0 0-.147.455v3.89l-3.73-3.946c-.358-.379-.807-.586-1.27-.586-.464 0-.913.207-1.271.586L40.18 158.756a.637.637 0 0 0-.123.195.822.822 0 0 0-.036.49c.02.08.05.155.093.22l1.062 1.661c.042.066.093.12.151.159a.405.405 0 0 0 .381.048.492.492 0 0 0 .173-.119l9.8-10.38a.443.443 0 0 1 .319-.145c.116 0 .228.051.318.145l9.8 10.38c.051.054.11.094.172.119.063.025.13.033.195.025a.418.418 0 0 0 .187-.072.544.544 0 0 0 .15-.158l1.063-1.661a.716.716 0 0 0 .093-.222.818.818 0 0 0-.039-.491.624.624 0 0 0-.124-.194Z"
    />
    <path
      fill={colors.primary}
      d="M58.334 217.4a30.01 30.01 0 0 0-3.012 2.811c-1.46-1.76-3.271-3.546-5.322-5.211-5.264 4.274-9 9.842-9 13.2 0 5.965 5.373 10.8 12 10.8s12-4.835 12-10.8c0-2.497-2.785-7.647-6.666-10.8Zm-1.044 15.968c-1.16.711-2.59 1.132-4.137 1.132-3.865 0-7.01-2.238-7.01-5.871 0-1.81 1.302-3.405 3.9-6.129.37.374 5.294 5.875 5.294 5.875l3.14-3.135c.223.321.424.635.604.936 1.466 2.447.847 5.577-1.79 7.192ZM52.5 277.062a7.033 7.033 0 0 0 7.031-7.031A7.033 7.033 0 0 0 52.5 263a7.033 7.033 0 0 0-7.031 7.031 7.033 7.033 0 0 0 7.031 7.031Zm6.25 1.563h-2.69a8.51 8.51 0 0 1-7.12 0h-2.69a6.25 6.25 0 0 0-6.25 6.25v.781A2.345 2.345 0 0 0 42.344 288h20.312A2.345 2.345 0 0 0 65 285.656v-.781a6.25 6.25 0 0 0-6.25-6.25ZM41 416v-21.75c0-1.243 1.343-2.25 3-2.25h18c1.657 0 3 1.007 3 2.25V416l-12-5.25L41 416ZM54 338.375V332H41.5c-.831 0-1.5.502-1.5 1.125v21.75c0 .623.669 1.125 1.5 1.125h21c.831 0 1.5-.502 1.5-1.125V339.5h-8.5c-.825 0-1.5-.506-1.5-1.125Zm4 11.063c0 .309-.337.562-.75.562h-10.5c-.413 0-.75-.253-.75-.562v-.375c0-.31.337-.563.75-.563h10.5c.413 0 .75.253.75.563v.375Zm0-3c0 .309-.337.562-.75.562h-10.5c-.413 0-.75-.253-.75-.562v-.375c0-.31.337-.563.75-.563h10.5c.413 0 .75.253.75.563v.375Zm0-3.375v.375c0 .309-.337.562-.75.562h-10.5c-.413 0-.75-.253-.75-.562v-.375c0-.31.337-.563.75-.563h10.5c.413 0 .75.253.75.563Zm6-5.349V338h-8v-6h.381c.4 0 .782.117 1.063.328l6.118 4.594c.282.211.438.497.438.792ZM64 665c0 6.629-5.373 12-12 12s-12-5.371-12-12c0-6.625 5.373-12 12-12s12 5.375 12 12Zm-11.678-8.032c-2.637 0-4.319 1.111-5.64 3.085a.582.582 0 0 0 .132.787l1.679 1.273a.58.58 0 0 0 .806-.103c.865-1.096 1.457-1.732 2.773-1.732.988 0 2.211.636 2.211 1.595 0 .724-.598 1.096-1.574 1.644-1.138.638-2.645 1.432-2.645 3.419v.193c0 .321.26.581.581.581h2.71c.32 0 .58-.26.58-.581v-.064c0-1.378 4.026-1.435 4.026-5.162 0-2.806-2.912-4.935-5.639-4.935Zm-.322 12a2.228 2.228 0 0 0-2.226 2.226c0 1.227.999 2.225 2.226 2.225a2.228 2.228 0 0 0 2.226-2.225A2.228 2.228 0 0 0 52 668.968ZM62.889 620.019l-2.08-1.201a9.4 9.4 0 0 0 0-3.427l2.08-1.202a.589.589 0 0 0 .268-.683 12.158 12.158 0 0 0-2.67-4.619.589.589 0 0 0-.724-.113l-2.08 1.202a9.217 9.217 0 0 0-2.968-1.714v-2.398a.585.585 0 0 0-.46-.571 12.28 12.28 0 0 0-5.331 0 .585.585 0 0 0-.46.571v2.403a9.49 9.49 0 0 0-2.968 1.713l-2.075-1.201a.581.581 0 0 0-.723.113 12.082 12.082 0 0 0-2.67 4.619.583.583 0 0 0 .268.683l2.08 1.201a9.405 9.405 0 0 0 0 3.428l-2.08 1.201a.59.59 0 0 0-.269.684 12.164 12.164 0 0 0 2.671 4.619c.186.2.488.249.723.112l2.08-1.201a9.217 9.217 0 0 0 2.968 1.714v2.402c0 .274.191.513.46.572 1.791.4 3.627.381 5.332 0a.586.586 0 0 0 .458-.572v-2.402a9.513 9.513 0 0 0 2.97-1.714l2.08 1.201a.58.58 0 0 0 .722-.112 12.09 12.09 0 0 0 2.67-4.619.604.604 0 0 0-.273-.689Zm-11.3.992a3.912 3.912 0 0 1-3.906-3.907 3.911 3.911 0 0 1 3.907-3.906 3.911 3.911 0 0 1 3.906 3.906 3.912 3.912 0 0 1-3.906 3.907Z"
    />
    <path
      fill={shades.primaryLight}
      d="M57.001 726.714c0-.295-.104-.581-.291-.792l-4.08-4.594a.946.946 0 0 0-.708-.328h-.254v6H57v-.286Zm7.793 8.724-3.988-4.519c-.421-.474-1.142-.141-1.142.529v3.052h-2.667v3h2.667v3.056c0 .671.721 1.003 1.142.53l3.988-4.523a.87.87 0 0 0 0-1.125ZM49 736.75v-1.5c0-.412.3-.75.666-.75h7.334v-6h-5.667c-.55 0-1-.506-1-1.125V721H42c-.554 0-1 .502-1 1.125v21.75c0 .623.446 1.125 1 1.125h14.001c.555 0 1-.502 1-1.125V737.5h-7.334c-.366 0-.666-.337-.666-.75Z"
    />
    <foreignObject x="50" y="120" width="120" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Overview
        </p>
      </div>
    </foreignObject>
    <foreignObject x="47" y="190" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Opportunities
        </p>
      </div>
    </foreignObject>
    <foreignObject x="52" y="237" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          My competitors
        </p>
      </div>
    </foreignObject>

    <foreignObject x="28" y="304" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Briefs
        </p>
      </div>
    </foreignObject>

    <foreignObject x="28" y="365" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Saved
        </p>
      </div>
    </foreignObject>

    <foreignObject x="35" y="575" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Settings
        </p>
      </div>
    </foreignObject>

    <foreignObject x="27" y="625" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Help
        </p>
      </div>
    </foreignObject>

    <foreignObject x="33" y="692" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Log out
        </p>
      </div>
    </foreignObject>

    <foreignObject x="100" y="25" width="110" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-2xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: "Roboto",
          }}
        >
          Concured
        </p>
      </div>
    </foreignObject>
    <ellipse cx={62} cy={63.5} fill={colors.extra} rx={26} ry={25.5} />
    <g filter={`url(#b${id})`}>
      <ellipse cx={68} cy={57.5} fill={colors.accent} rx={18} ry={17.5} />
    </g>
    <path
      fill={colors.bg}
      d="M73.674 71.885 69 67.407a1.15 1.15 0 0 0-.797-.315h-.764a9.053 9.053 0 0 0 2.062-5.75c0-5.16-4.364-9.342-9.75-9.342C54.364 52 50 56.182 50 61.343c0 5.16 4.364 9.343 9.75 9.343a9.976 9.976 0 0 0 6.001-1.977v.733c0 .287.117.56.328.763l4.674 4.478c.44.423 1.153.423 1.59 0l1.326-1.27c.44-.423.44-1.106.005-1.528ZM59.75 67.092c-3.315 0-6-2.569-6-5.75 0-3.175 2.68-5.749 6-5.749 3.314 0 6 2.57 6 5.75 0 3.175-2.681 5.75-6 5.75Z"
    />
    <foreignObject x="300" y="105" width="340" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-4xl font-bold truncate"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Poroject statistic
        </p>
      </div>
    </foreignObject>
    <g opacity={0.9}>
      <rect
        width={92}
        height={52}
        x={969.625}
        y={120.064}
        fill={colors.accent}
        rx={26}
      />
      <foreignObject width={92} height={52} x={969.625} y={120.064}>
        <div className="h-full items-center flex justify-center">
          <p
            className="text-sm font-bold"
            style={{
              color: shades.bgDark,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            30 days
          </p>
        </div>
      </foreignObject>
    </g>
    <g opacity={0.9}>
      <rect
        width={92}
        height={52}
        x={1072.44}
        y={120.064}
        fill={shades.bgDark}
        rx={26}
      />
      <foreignObject width={92} height={52} x={1072.44} y={120.064}>
        <div className="h-full items-center flex justify-center">
          <p
            className="text-sm font-bold"
            style={{
              color: shades.primaryDark,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            90 days
          </p>
        </div>
      </foreignObject>
    </g>
    <g opacity={0.9}>
      <rect
        width={95}
        height={52}
        x={1175.26}
        y={120.064}
        fill={shades.bgDark}
        rx={26}
      />
      <foreignObject width={95} height={52} x={1175.26} y={120.064}>
        <div className="h-full items-center flex justify-center">
          <p
            className="text-sm font-bold"
            style={{
              color: shades.primaryDark,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            6 months
          </p>
        </div>
      </foreignObject>
    </g>
    <g opacity={0.9}>
      <rect
        width={101}
        height={52}
        x={1281.16}
        y={120.064}
        fill={shades.bgDark}
        rx={26}
      />
      <foreignObject width={101} height={52} x={1281.16} y={120.064}>
        <div className="h-full items-center flex justify-center">
          <p
            className="text-sm font-bold"
            style={{
              color: shades.primaryDark,
              fontFamily: fonts.secondary.fontFamily,
            }}
          >
            12 months
          </p>
        </div>
      </foreignObject>
    </g>
    <ellipse
      cx={640.616}
      cy={145.079}
      fill={colors.accent}
      opacity={0.02}
      rx={20.563}
      ry={19.243}
    />
    <path
      fill={colors.accent}
      d="M653.178 145.185c0 6.436-5.574 11.651-12.45 11.651-6.876 0-12.45-5.215-12.45-11.651 0-6.433 5.574-11.651 12.45-11.651 6.876 0 12.45 5.218 12.45 11.651Zm-12.116-7.799c-2.736 0-4.481 1.078-5.851 2.995a.54.54 0 0 0 .136.764l1.742 1.236a.63.63 0 0 0 .837-.1c.897-1.064 1.512-1.681 2.877-1.681 1.025 0 2.294.617 2.294 1.548 0 .704-.621 1.065-1.633 1.596-1.181.62-2.744 1.391-2.744 3.32v.188c0 .311.27.563.602.563h2.812c.332 0 .602-.252.602-.563v-.063c0-1.337 4.176-1.393 4.176-5.011 0-2.725-3.02-4.792-5.85-4.792Zm-.334 11.651c-1.273 0-2.309.969-2.309 2.161 0 1.192 1.036 2.161 2.309 2.161 1.273 0 2.309-.969 2.309-2.161 0-1.192-1.036-2.161-2.309-2.161Z"
    />
    <foreignObject x="1220" y="12" width="150" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-2xl font-bold truncate"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Zahra hast..
        </p>
      </div>
    </foreignObject>
    <path
      fill={shades.bgDark}
      d="M1360.32 45.167c0-2.209 1.8-4 4-4H1381a4 4 0 0 1 4 4V60.26a4 4 0 0 1-4 4h-16.68c-2.2 0-4-1.791-4-4V45.167Z"
    />
    <path
      fill="#070707"
      d="M1373.06 54.171a.992.992 0 0 1-1.22-.017l-3.13-2.496c-.74-.588-.33-1.777.62-1.782l6.48-.034c.97-.005 1.38 1.22.61 1.8l-3.36 2.53Z"
    />
    <rect
      width={44.211}
      height={45}
      x={1175.26}
      y={28}
      fill={`url(#c${id})`}
      rx={12}
    />
    <foreignObject x="370" y="35" width="140" height="30">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-xl font-bold truncate"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Boro team
        </p>
      </div>
    </foreignObject>
    <path
      fill={shades.bgDark}
      d="M495.646 42.28a4 4 0 0 1 4-4h16.675a4 4 0 0 1 4 4v15.092a4 4 0 0 1-4 4h-16.675a4 4 0 0 1-4-4V42.281Z"
    />
    <path
      fill="#070707"
      d="M508.382 51.285a1 1 0 0 1-1.225-.017l-3.128-2.496c-.737-.589-.325-1.777.618-1.782l6.489-.034c.962-.005 1.375 1.22.606 1.799l-3.36 2.53Z"
    />
    <rect
      width={53.464}
      height={50.032}
      x={326}
      y={22.887}
      fill={shades.bgDark}
      rx={12}
    />
    <path
      fill={colors.extra}
      d="M356.114 55.5a.949.949 0 0 0-.502.142.868.868 0 0 0-.333.38.797.797 0 0 0-.051.489.834.834 0 0 0 .247.433.93.93 0 0 0 .463.231.961.961 0 0 0 .522-.048.899.899 0 0 0 .406-.312.81.81 0 0 0 .152-.47.817.817 0 0 0-.265-.597.935.935 0 0 0-.639-.248Zm5.619-6.934c-.477-.687-1.977-2.464-4.381-3.463a11.798 11.798 0 0 0-.923-.342 3.475 3.475 0 0 0-.066-2.934 3.721 3.721 0 0 0-.952-1.206 4.005 4.005 0 0 0-1.385-.752c-.623-.192-1.171-.282-1.627-.27-.03-.095-.095-.518.472-1.645l-1.15-.635-.275.355c-.436.566-.85 1.106-1.222 1.639a2.74 2.74 0 0 0-.416-.059c-2.085-.115-1.958-.11-2.062-.11-2.54 0-2.547 2.45-2.547 2.156l-.119 1.724c-.081 1.268.992 2.358 2.391 2.435l.449.026a10.67 10.67 0 0 0-2.324 1.67c-3.145 2.973-3.145 6.23-3.145 8.85v1.581l1.17-1.4c.157.617.403 1.21.731 1.765.29.476.747.444.986.344.212-.088.502-.325.188-.945a7.98 7.98 0 0 1-.791-2.495l2.351-2.811-1.238 3.481c2.923-1.992 7.901-2.901 11.86-1.813 1.717.472 3.386.033 4.254-1.12.037-.047.061-.101.093-.15.091.44.138.886.141 1.335 0 1.094-.185 2.486-.747 3.835-.127.304.088.681.432.74.372.073.769-.146.922-.524.482-1.2.733-2.563.733-4.051 0-1.813-.653-3.64-1.803-5.211Zm-12.838-6.71-.788-.044-.07 1.024.659.037c-.029.306-.024.614.016.92l-1.123-.064a.648.648 0 0 1-.428-.186.547.547 0 0 1-.163-.415l.121-1.722c.051-.572.697-.53.666-.532l1.461.081a6.562 6.562 0 0 0-.351.901Zm7.451 8.09a.553.553 0 0 1-.72-.066l-.486-.54-1.728 1.268a.425.425 0 0 1-.559-.05l-.792-.876a.333.333 0 0 1 .067-.486l1.736-1.277-.71-.786-.858.632a.41.41 0 0 1-.532-.047l-.191-.213a.333.333 0 0 1 .069-.486l.849-.624-.934-1.04a.438.438 0 0 1-.096-.332.436.436 0 0 1 .184-.299.545.545 0 0 1 .718.065l4.071 4.525a.433.433 0 0 1 .036.5.47.47 0 0 1-.124.131Zm-5.188 5.554a.946.946 0 0 0-.502.142.856.856 0 0 0-.333.38.797.797 0 0 0 .196.922.922.922 0 0 0 .462.231.965.965 0 0 0 .523-.048.89.89 0 0 0 .405-.312.81.81 0 0 0 .152-.47.82.82 0 0 0-.264-.597.939.939 0 0 0-.639-.248Z"
    />
    <ellipse
      cx={558.363}
      cy={48.864}
      fill={colors.accent}
      opacity={0.02}
      rx={20.563}
      ry={19.243}
    />
    <path
      fill={colors.accent}
      d="M558.363 37.319c-6.816 0-12.338 5.167-12.338 11.545 0 6.379 5.522 11.546 12.338 11.546 6.816 0 12.338-5.167 12.338-11.545 0-6.379-5.522-11.546-12.338-11.546Zm7.164 12.85c0 .306-.269.558-.597.558h-4.577v4.283c0 .307-.269.559-.597.559h-2.786c-.328 0-.597-.252-.597-.56v-4.282h-4.577c-.328 0-.597-.252-.597-.559v-2.607c0-.307.269-.559.597-.559h4.577V42.72c0-.307.269-.559.597-.559h2.786c.328 0 .597.252.597.56v4.282h4.577c.328 0 .597.252.597.559v2.607Z"
    />
    <path fill={shades.bgDark} d="M328.056 77.941h1056.94v.982H328.056z" />
    <rect
      width={504}
      height={235}
      x={326}
      y={644}
      fill={shades.bgDark}
      rx={32}
    />
    <path fill={shades.primaryLight} d="M360 731h443.151v.982H360z" />
    <rect width={18} height={12} x={378} y={805} fill={colors.accent} rx={2} />
    <rect width={18} height={12} x={378} y={838} fill={colors.extra} rx={2} />
    <circle cx={729} cy={804} r={65} fill={shades.bgDark} />
    <path
      stroke={colors.accent}
      strokeWidth={13}
      d="M777 804.5c0 26.786-21.714 48.5-48.5 48.5S680 831.286 680 804.5s21.714-48.5 48.5-48.5 48.5 21.714 48.5 48.5Z"
    />
    <circle cx={731} cy={756} r={2} fill={shades.bgDark} />
    <circle cx={733} cy={853} r={2} fill={shades.bgDark} />
    <path
      stroke={colors.extra}
      strokeLinecap="round"
      strokeWidth={13}
      d="M731.5 853c-26 0-49-14-51.5-47 0-30.376 20.124-50 50.5-50"
    />
    <circle cx={731} cy={756} r={2} fill={shades.bgDark} />
    <circle cx={731} cy={853} r={2} fill={shades.bgDark} />
    <foreignObject width={504} height={235} x={326} y={644}>
      <div className="h-full flex flex-col p-8 pb-6 justify-between">
        <p
          className="text-xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Traffic Sources
        </p>
        <div className="flex justify-between">
          <div className="flex px-12 gap-9">
            <div className="flex flex-col gap-[14px]">
              <p
                className="text-sm font-bold"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                Source
              </p>
              <p
                className="text-sm font-bold"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.secondary.fontFamily,
                }}
              >
                Direct
              </p>
              <p
                className="text-sm font-bold"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.secondary.fontFamily,
                }}
              >
                Search
              </p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <p
                className="text-sm font-bold text-end truncate"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                Traffic source,%
              </p>
              <p
                className="text-sm font-bold text-end"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                50
              </p>
              <p
                className="text-sm font-bold text-end"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                50
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col w-[130px]">
            <p
              className="text-4xl font-bold"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              50%
            </p>
            <p
              className="text-sm font-bold"
              style={{
                color: shades.primaryLight,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              Direct
            </p>
          </div>
        </div>
      </div>
    </foreignObject>
    <rect
      width={504}
      height={235}
      x={879}
      y={644}
      fill={shades.bgDark}
      rx={32}
    />
    <path fill={shades.primaryLight} d="M913 731h443.151v.982H913z" />
    <rect
      width={266}
      height={30}
      x={912}
      y={758}
      fill={shades.bgDark}
      rx={12}
    />
    <rect width={18} height={12} x={931} y={805} fill={colors.accent} rx={2} />
    <rect width={18} height={12} x={931} y={838} fill={colors.extra} rx={2} />
    <circle cx={1282} cy={804} r={65} fill={shades.bgDark} />
    <path
      stroke={colors.accent}
      strokeWidth={13}
      d="M1330 804.5c0 26.786-21.71 48.5-48.5 48.5s-48.5-21.714-48.5-48.5 21.71-48.5 48.5-48.5 48.5 21.714 48.5 48.5Z"
    />
    <circle cx={1284} cy={756} r={2} fill={shades.bgDark} />
    <circle cx={1286} cy={853} r={2} fill={shades.bgDark} />
    <path
      stroke={colors.extra}
      strokeLinecap="round"
      strokeWidth={13}
      d="M1284.5 853c-26 0-49-14-51.5-47 0-30.376 20.12-50 50.5-50"
    />
    <circle cx={1284} cy={756} r={2} fill={shades.bgDark} />
    <circle cx={1284} cy={853} r={2} fill={shades.bgDark} />
    <rect
      width={241.171}
      height={190.519}
      x={1144.29}
      y={420.034}
      fill={shades.bgDark}
      rx={32}
    />
    <path
      fill="#1E9331"
      d="M1311.04 463.497a.997.997 0 0 0-1.43.031l-3.98 4.265c-.59.639-.14 1.682.73 1.682h8.32c.9 0 1.34-1.086.7-1.714l-4.34-4.264Z"
    />
    <rect
      width={52.254}
      height={51.599}
      x={1179.46}
      y={436.903}
      fill={colors.primary}
      fillOpacity={0.02}
      rx={16}
    />
    <path
      fill={colors.primary}
      d="M1209.2 466.672h1.81c.3 0 .6-.397.6-.794v-8.335c0-.397-.3-.794-.6-.794h-1.81c-.3 0-.6.397-.6.794v8.335c0 .397.3.794.6.794Zm4.52 0h1.81c.31 0 .61-.397.61-.794v-14.289c0-.397-.3-.794-.61-.794h-1.81c-.3 0-.6.397-.6.794v14.289c0 .397.3.794.6.794Zm-13.56 0h1.81c.3 0 .6-.397.6-.794v-4.366c0-.397-.3-.794-.6-.794h-1.81c-.3 0-.6.397-.6.794v4.366c0 .397.3.794.6.794Zm4.52 0h1.81c.3 0 .6-.397.6-.794v-12.305c0-.396-.3-.793-.6-.793h-1.81c-.3 0-.6.397-.6.793v12.305c0 .397.3.794.6.794Zm12.21 3.969h-20.35v-18.854c0-.548-.34-.992-.75-.992h-1.51c-.42 0-.75.444-.75.992v20.838c0 1.096.67 1.985 1.5 1.985h21.86c.42 0 .75-.444.75-.992v-1.985c0-.548-.33-.992-.75-.992ZM1327.43 473.703h-1.09v-7.225l-2.19.803v-.985l3.11-1.166h.17v8.573Zm8.76 0h-5.59v-.78l2.96-3.281c.43-.496.73-.898.9-1.207.17-.313.25-.635.25-.967 0-.445-.13-.81-.4-1.096-.27-.285-.63-.427-1.08-.427-.54 0-.96.154-1.26.463-.3.304-.45.73-.45 1.277h-1.08c0-.785.25-1.42.76-1.904.5-.485 1.18-.727 2.03-.727.79 0 1.42.209 1.88.627.46.414.69.967.69 1.658 0 .84-.53 1.84-1.6 3l-2.29 2.479h4.28v.885Zm1.06-6.891c0-.512.16-.934.48-1.266.33-.332.75-.498 1.26-.498.52 0 .94.168 1.26.504.33.332.49.764.49 1.295v.416c0 .516-.16.938-.49 1.266-.33.324-.74.486-1.24.486-.51 0-.93-.162-1.26-.486-.34-.328-.5-.764-.5-1.307v-.41Zm.81.451c0 .305.08.557.25.756.18.195.41.293.7.293.27 0 .5-.096.66-.287.18-.192.26-.453.26-.785v-.428c0-.305-.08-.557-.25-.756-.17-.199-.4-.299-.69-.299-.29 0-.51.1-.68.299-.17.199-.25.459-.25.779v.428Zm3.34 4.348c0-.512.16-.932.49-1.26.33-.332.75-.498 1.26-.498s.93.164 1.26.492c.33.328.49.764.49 1.307v.416c0 .511-.16.933-.49 1.265-.33.328-.74.493-1.25.493s-.93-.163-1.26-.487c-.33-.328-.5-.763-.5-1.306v-.422Zm.81.457c0 .308.09.562.26.761.17.196.4.293.69.293.28 0 .51-.095.67-.287.17-.195.26-.459.26-.791v-.433c0-.309-.09-.561-.26-.756a.862.862 0 0 0-.68-.293c-.28 0-.51.098-.68.293-.17.191-.26.451-.26.779v.434Zm-2.96.99-.61-.387 4.16-6.668.62.387-4.17 6.668Z"
    />
    <rect
      width={241.171}
      height={190.519}
      x={1144.29}
      y={420.034}
      fill={shades.bgDark}
      rx={32}
    />
    <foreignObject width={504} height={235} x={879} y={644}>
      <div className="h-full flex flex-col p-8 pb-6 justify-between">
        <p
          className="text-xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Traffic Sources
        </p>
        <div className="flex justify-between">
          <div className="flex px-12 gap-9">
            <div className="flex flex-col gap-[14px]">
              <p
                className="text-sm font-bold"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                Source
              </p>
              <p
                className="text-sm font-bold"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.secondary.fontFamily,
                }}
              >
                Direct
              </p>
              <p
                className="text-sm font-bold"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.secondary.fontFamily,
                }}
              >
                Search
              </p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <p
                className="text-sm font-bold text-end truncate"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                Traffic source,%
              </p>
              <p
                className="text-sm font-bold text-end"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                50
              </p>
              <p
                className="text-sm font-bold text-end"
                style={{
                  color: shades.primaryLight,
                  fontFamily: fonts.primary.fontFamily,
                }}
              >
                50
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col w-[130px]">
            <p
              className="text-4xl font-bold"
              style={{
                color: colors.primary,
                fontFamily: fonts.primary.fontFamily,
              }}
            >
              50%
            </p>
            <p
              className="text-sm font-bold"
              style={{
                color: shades.primaryLight,
                fontFamily: fonts.secondary.fontFamily,
              }}
            >
              Direct
            </p>
          </div>
        </div>
      </div>
    </foreignObject>
    <foreignObject width={241.171} height={190.519} x={1144.29} y={420.034}>
      <div className="h-full items-start flex flex-col justify-end p-5 pb-8">
        <p
          className="text-4xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          00:03:27
        </p>
        <p
          className="text-md font-bold"
          style={{
            color: shades.primaryLight,
            fontFamily: fonts.secondary.fontFamily,
          }}
        >
          Avg.Visit Duration
        </p>
      </div>
    </foreignObject>
    <foreignObject width={241.171} height={190.519} x={1144.29} y={420.034}>
      <div className="h-full items-end flex flex-col p-9">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          2.4%
        </p>
      </div>
    </foreignObject>
    <path
      fill="#FD2E00"
      d="M1310.24 469.383a.998.998 0 0 0 1.43-.036l3.96-4.277c.6-.641.14-1.683-.73-1.68l-8.32.026c-.9.003-1.34 1.09-.7 1.716l4.36 4.251Z"
    />
    <rect
      width={52.254}
      height={51.599}
      x={1179.46}
      y={436.903}
      fill="#C5BDBD"
      fillOpacity={0.02}
      rx={16}
    />
    <path
      fill={colors.accent}
      d="M1216.14 454.406c.83 0 1.5-.494 1.5-1.105v-.736c0-.61-.67-1.105-1.5-1.105h-21.11c-.83 0-1.5.495-1.5 1.105v.736c0 .611.67 1.105 1.5 1.105 0 4.188 3.21 7.722 7.59 8.839-4.38 1.117-7.59 4.651-7.59 8.838-.83 0-1.5.495-1.5 1.105v.737c0 .61.67 1.104 1.5 1.104h21.11c.83 0 1.5-.494 1.5-1.104v-.737c0-.61-.67-1.105-1.5-1.105 0-4.187-3.21-7.721-7.59-8.838 4.38-1.117 7.59-4.651 7.59-8.839Z"
    />
    <rect
      width={241.171}
      height={190.519}
      x={879}
      y={420.034}
      fill={shades.bgDark}
      rx={32}
    />
    <foreignObject width={241.171} height={190.519} x={879} y={420.034}>
      <div className="h-full items-start flex flex-col justify-end p-5 pb-8">
        <p
          className="text-4xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          326.60K
        </p>
        <p
          className="text-md font-bold"
          style={{
            color: shades.primaryLight,
            fontFamily: fonts.secondary.fontFamily,
          }}
        >
          Total Monthly Visit
        </p>
      </div>
    </foreignObject>
    <foreignObject width={241.171} height={190.519} x={879} y={420.034}>
      <div className="h-full items-end flex flex-col p-9">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          2.1%
        </p>
      </div>
    </foreignObject>
    <path
      fill="#FD2E00"
      d="M1041.97 469.387a.999.999 0 0 0 1.43-.052l3.91-4.322c.59-.647.12-1.683-.75-1.671l-8.32.12c-.9.013-1.32 1.105-.68 1.723l4.41 4.202Z"
    />
    <rect
      width={52.254}
      height={51.599}
      x={914.171}
      y={434.765}
      fill="#C5BDBD"
      fillOpacity={0.04}
      rx={16}
    />
    <path
      fill={colors.accent}
      d="M941.302 458.334c3.806 0 6.891-2.637 6.891-5.892 0-3.255-3.085-5.892-6.891-5.892s-6.89 2.637-6.89 5.892c0 3.255 3.084 5.892 6.89 5.892Zm4.824 1.474h-.899a10.747 10.747 0 0 1-3.925.736c-1.399 0-2.724-.267-3.924-.736h-.899c-3.994 0-7.235 2.771-7.235 6.186v1.915c0 1.22 1.157 2.21 2.584 2.21h18.949c1.427 0 2.584-.99 2.584-2.21v-1.915c0-3.415-3.241-6.186-7.235-6.186Z"
    />

    <g filter={`url(#d${id})`} opacity={0.6}>
      <rect
        width={174.849}
        height={137.488}
        x={914.458}
        y={278}
        fill={colors.extra}
        rx={32}
      />
    </g>
    <path
      fill="#14ED44"
      d="M1328.13 247.594a1.01 1.01 0 0 0-1.44.031l-3.97 4.265a.997.997 0 0 0 .73 1.682h8.31c.9 0 1.34-1.086.71-1.714l-4.34-4.264Z"
    />
    <path
      fill={colors.primary}
      d="M1341.5 254.853h-1.09v-7.224l-2.19.802v-.984l3.11-1.166h.17v8.572Zm8.76 0h-5.59v-.779l2.95-3.281c.44-.496.74-.899.91-1.207.17-.313.25-.635.25-.967 0-.445-.14-.811-.41-1.096-.26-.285-.62-.428-1.07-.428-.54 0-.96.155-1.26.463-.3.305-.45.731-.45 1.278h-1.08c0-.786.25-1.42.75-1.905.51-.484 1.19-.726 2.04-.726.79 0 1.42.209 1.88.627.46.414.69.967.69 1.658 0 .84-.54 1.84-1.61 3l-2.28 2.478h4.28v.885Zm1.06-6.89c0-.512.16-.934.48-1.266.33-.332.75-.498 1.26-.498.52 0 .94.168 1.26.504.33.332.49.763.49 1.295v.416c0 .515-.17.937-.49 1.265-.33.325-.74.487-1.25.487-.5 0-.92-.162-1.26-.487-.33-.328-.49-.763-.49-1.306v-.41Zm.8.451c0 .304.09.556.26.756.17.195.4.293.69.293.28 0 .5-.096.67-.288.17-.191.26-.453.26-.785v-.427c0-.305-.08-.557-.25-.756-.17-.199-.4-.299-.69-.299-.29 0-.52.1-.68.299-.17.199-.26.459-.26.779v.428Zm3.35 4.347c0-.511.16-.931.49-1.259.32-.332.74-.498 1.26-.498.51 0 .93.164 1.26.492.32.328.49.763.49 1.306v.416c0 .512-.17.934-.49 1.266-.33.328-.74.492-1.25.492s-.93-.162-1.26-.486c-.33-.328-.5-.764-.5-1.307v-.422Zm.81.457c0 .309.08.563.26.762.17.195.4.293.69.293.28 0 .5-.096.67-.287.17-.195.25-.459.25-.791v-.434c0-.308-.08-.56-.25-.755a.86.86 0 0 0-.68-.293.86.86 0 0 0-.68.293c-.18.191-.26.451-.26.779v.433Zm-2.96.991-.62-.387 4.17-6.668.62.387-4.17 6.668Z"
    />
    <rect
      width={241.171}
      height={190.519}
      x={1144.29}
      y={205.553}
      fill={shades.bgDark}
      rx={32}
    />
    <rect
      width={52.254}
      height={51.599}
      x={1178.45}
      y={222.248}
      fill="#C5BDBD"
      fillOpacity={0.04}
      rx={16}
    />
    <path
      fill={colors.accent}
      d="M1193.53 256.282c0 1.271 1.05 2.302 2.35 2.302h17.27c1.3 0 2.36-1.031 2.36-2.302v-13.043h-21.98v13.043Zm15.7-9.398c0-.317.26-.576.59-.576h1.96c.32 0 .59.259.59.576v1.918c0 .316-.27.575-.59.575h-1.96a.581.581 0 0 1-.59-.575v-1.918Zm0 6.138c0-.317.26-.576.59-.576h1.96c.32 0 .59.259.59.576v1.918c0 .316-.27.575-.59.575h-1.96a.581.581 0 0 1-.59-.575v-1.918Zm-6.28-6.138c0-.317.26-.576.59-.576h1.96c.32 0 .59.259.59.576v1.918c0 .316-.27.575-.59.575h-1.96a.581.581 0 0 1-.59-.575v-1.918Zm0 6.138c0-.317.26-.576.59-.576h1.96c.32 0 .59.259.59.576v1.918c0 .316-.27.575-.59.575h-1.96a.581.581 0 0 1-.59-.575v-1.918Zm-6.28-6.138c0-.317.26-.576.59-.576h1.96c.32 0 .59.259.59.576v1.918c0 .316-.27.575-.59.575h-1.96a.581.581 0 0 1-.59-.575v-1.918Zm0 6.138c0-.317.26-.576.59-.576h1.96c.32 0 .59.259.59.576v1.918c0 .316-.27.575-.59.575h-1.96a.581.581 0 0 1-.59-.575v-1.918Zm16.48-15.92h-2.35V234.8c0-.422-.36-.767-.79-.767h-1.57c-.43 0-.78.345-.78.767v2.302h-6.28V234.8c0-.422-.36-.767-.79-.767h-1.57c-.43 0-.78.345-.78.767v2.302h-2.36c-1.3 0-2.35 1.031-2.35 2.301v2.302h21.98v-2.302c0-1.27-1.06-2.301-2.36-2.301Z"
    />
    <foreignObject width={241.171} height={190.519} x={1144.29} y={205.553}>
      <div className="h-full items-start flex flex-col justify-end p-5 pb-8">
        <p
          className="text-4xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          42.34%
        </p>
        <p
          className="text-md font-bold"
          style={{
            color: shades.primaryLight,
            fontFamily: fonts.secondary.fontFamily,
          }}
        >
          Pages per visit
        </p>
      </div>
    </foreignObject>
    <rect
      width={241.171}
      height={186.591}
      x={879}
      y={203}
      fill={colors.accent}
      rx={32}
    />
    <mask
      id={`e${id}`}
      width={242}
      height={191}
      x={879}
      y={203}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <rect
        width={241.171}
        height={190.519}
        x={879}
        y={203}
        fill={colors.accent}
        rx={32}
      />
    </mask>
    <g mask={`url(#e${id})`}>
      <g filter={`url(#f${id})`} opacity={0.9}>
        <ellipse
          cx={1076.46}
          cy={344.401}
          fill={colors.extra}
          rx={104.005}
          ry={95.755}
        />
      </g>
      <g filter={`url(#g${id})`} opacity={0.9}>
        <ellipse
          cx={906.132}
          cy={233.761}
          fill={colors.extra}
          rx={60.293}
          ry={59.537}
        />
      </g>
    </g>
    <foreignObject width={241.171} height={186.591} x={879} y={203}>
      <div className="h-full items-start flex flex-col justify-end p-5 pb-8">
        <p
          className="text-4xl font-bold"
          style={{
            color: colors.bg,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          42.34%
        </p>
        <p
          className="text-md font-bold"
          style={{
            color: shades.bgLight,
            fontFamily: fonts.secondary.fontFamily,
          }}
        >
          Bounce Rate
        </p>
      </div>
    </foreignObject>
    <path
      fill="#14ED44"
      d="M1050.78 246.023a.997.997 0 0 0-1.43.031l-3.98 4.265c-.6.639-.14 1.682.73 1.682h8.32c.89 0 1.34-1.086.7-1.714l-4.34-4.264Z"
    />
    <path
      fill={shades.bgDark}
      d="M1064.9 344.897c0 4.933-4.5 8.93-10.05 8.93-5.55 0-10.05-3.997-10.05-8.93 0-4.931 4.5-8.931 10.05-8.931 5.55 0 10.05 4 10.05 8.931Zm-9.78-5.978c-2.2 0-3.61.827-4.72 2.296-.14.19-.09.447.11.585l1.41.948a.52.52 0 0 0 .67-.077c.73-.815 1.22-1.289 2.32-1.289.83 0 1.86.474 1.86 1.187 0 .54-.51.816-1.32 1.224-.96.475-2.22 1.066-2.22 2.544v.144c0 .239.22.432.49.432h2.27c.27 0 .48-.193.48-.432v-.048c0-1.025 3.38-1.067 3.38-3.841 0-2.089-2.44-3.673-4.73-3.673Zm-.27 8.931c-1.02 0-1.86.743-1.86 1.656 0 .913.84 1.657 1.86 1.657 1.03 0 1.87-.744 1.87-1.657s-.84-1.656-1.87-1.656Z"
    />
    <ellipse
      cx={1054.85}
      cy={344.897}
      fill={colors.accent}
      opacity={0.02}
      rx={16.078}
      ry={15.877}
    />
    <rect
      width={52.254}
      height={51.599}
      x={914.171}
      y={219.869}
      fill={colors.bg}
      fillOpacity={0.02}
      rx={16}
    />
    <path
      fill={colors.bg}
      d="M943.915 249.637h1.809c.301 0 .603-.397.603-.793v-8.336c0-.397-.302-.793-.603-.793h-1.809c-.301 0-.603.396-.603.793v8.336c0 .396.302.793.603.793Zm4.522 0h1.809c.301 0 .603-.397.603-.793v-14.289c0-.397-.302-.794-.603-.794h-1.809c-.301 0-.603.397-.603.794v14.289c0 .396.302.793.603.793Zm-13.566 0h1.809c.301 0 .603-.397.603-.793v-4.367c0-.396-.302-.793-.603-.793h-1.809c-.301 0-.603.397-.603.793v4.367c0 .396.302.793.603.793Zm4.522 0h1.809c.301 0 .603-.397.603-.793v-12.305c0-.397-.302-.794-.603-.794h-1.809c-.301 0-.603.397-.603.794v12.305c0 .396.302.793.603.793Zm12.209 3.97h-20.348v-18.854c0-.548-.338-.992-.754-.992h-1.507c-.417 0-.754.444-.754.992v20.838c0 1.096.675 1.985 1.507 1.985h21.856c.417 0 .754-.444.754-.993v-1.984c0-.548-.337-.992-.754-.992Z"
    />
    <foreignObject width={241.171} height={186.591} x={879} y={203}>
      <div className="h-full items-end flex flex-col p-9">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.bg,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          12%
        </p>
      </div>
    </foreignObject>
    <ellipse
      cx={1337.22}
      cy={337.542}
      fill={colors.accent}
      opacity={0.02}
      rx={9.044}
      ry={8.838}
    />
    <path
      fill={colors.accent}
      d="M1342.75 337.59c0 2.956-2.45 5.351-5.48 5.351-3.02 0-5.47-2.395-5.47-5.351 0-2.954 2.45-5.351 5.47-5.351 3.03 0 5.48 2.397 5.48 5.351Zm-5.33-3.582c-1.2 0-1.97.495-2.57 1.376a.256.256 0 0 0 .06.351l.76.567c.12.085.28.065.37-.045.4-.489.67-.773 1.27-.773.45 0 1.01.284 1.01.711 0 .323-.28.489-.72.733-.52.285-1.21.639-1.21 1.525v.086c0 .143.12.259.27.259h1.23c.15 0 .27-.116.27-.259v-.028c0-.615 1.83-.64 1.83-2.302 0-1.252-1.32-2.201-2.57-2.201Zm-.15 5.351c-.56 0-1.01.446-1.01.993 0 .547.45.993 1.01.993s1.02-.446 1.02-.993c0-.547-.46-.993-1.02-.993Z"
    />
    <path
      fill={shades.bgDark}
      stroke={shades.bgDark}
      d="M326.5 235c0-17.397 14.103-31.5 31.5-31.5h442.459c17.397 0 31.5 14.103 31.5 31.5v343.553c0 17.397-14.104 31.5-31.5 31.5H358c-17.397 0-31.5-14.103-31.5-31.5V235Z"
    />
    <path
      fill={shades.primaryLight}
      d="M410.551 510.444c0 1.022-.192 1.794-.576 2.314-.381.518-.962.777-1.743.777-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.023.191-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.739.747.384.498.581 1.244.59 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.148-.854.445-.182.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.186.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606ZM433.317 555.599h-2.861v3.013h-1.236v-7.11h4.517v.996h-3.281v2.115h2.861v.986Zm3.506 3.11c-.752 0-1.363-.236-1.831-.708-.466-.475-.699-1.106-.699-1.894v-.147c0-.527.101-.997.303-1.411.205-.416.492-.74.86-.971a2.256 2.256 0 0 1 1.23-.347c.719 0 1.274.229 1.665.688.394.459.591 1.109.591 1.949v.478h-3.452c.036.436.18.781.434 1.035.257.254.58.381.967.381.544 0 .986-.22 1.328-.659l.64.61a2.155 2.155 0 0 1-.85.738 2.662 2.662 0 0 1-1.186.258Zm-.142-4.526c-.325 0-.589.114-.791.342-.198.228-.325.545-.381.952h2.261v-.088c-.026-.397-.132-.697-.317-.898-.186-.205-.443-.308-.772-.308Zm7.822 1.841c0 .82-.184 1.473-.551 1.958-.365.485-.868.727-1.509.727-.619 0-1.1-.223-1.445-.669l-.059.572h-1.074v-7.5h1.186v2.724c.342-.403.803-.605 1.382-.605.645 0 1.151.239 1.519.718.367.478.551 1.147.551 2.006v.069Zm-1.186-.103c0-.573-.101-1.002-.303-1.289-.202-.286-.495-.429-.879-.429-.514 0-.875.224-1.084.673v2.178c.212.459.576.689 1.094.689.371 0 .658-.139.859-.415.202-.277.306-.695.313-1.255v-.152ZM496.139 551.502l2.051 5.45 2.046-5.45h1.596v7.11h-1.23v-2.344l.122-3.135-2.1 5.479h-.884l-2.094-5.474.122 3.13v2.344h-1.231v-7.11h1.602Zm10.2 7.11a1.84 1.84 0 0 1-.137-.493c-.377.393-.84.59-1.386.59-.531 0-.964-.151-1.299-.454a1.45 1.45 0 0 1-.503-1.123c0-.563.208-.994.625-1.294.42-.302 1.019-.454 1.797-.454h.727v-.346c0-.274-.076-.492-.229-.655-.153-.166-.386-.249-.698-.249-.271 0-.492.069-.665.205a.623.623 0 0 0-.258.513h-1.187c0-.29.096-.56.288-.811.192-.253.453-.452.781-.595a2.763 2.763 0 0 1 1.109-.215c.618 0 1.112.156 1.479.469.368.309.557.745.567 1.308v2.383c0 .475.067.855.2 1.138v.083h-1.211Zm-1.304-.855c.235 0 .454-.057.66-.171.208-.114.364-.267.468-.459v-.996h-.639c-.44 0-.77.077-.992.23a.743.743 0 0 0-.332.649c0 .228.075.41.225.547.153.134.356.2.61.2Zm6.324-3.344a2.848 2.848 0 0 0-.484-.04c-.543 0-.91.209-1.098.625v3.614h-1.187v-5.283h1.133l.029.59c.287-.459.684-.688 1.192-.688.169 0 .309.023.419.068l-.004 1.114ZM575.892 557.939h-2.754l-.576 1.655h-1.284l2.686-7.11h1.108l2.691 7.11h-1.29l-.581-1.655Zm-2.407-.997h2.061l-1.031-2.949-1.03 2.949Zm9.365.064c0 .817-.185 1.47-.556 1.958-.371.485-.869.727-1.494.727-.58 0-1.044-.19-1.392-.571v2.505h-1.187v-7.314h1.094l.049.537c.348-.423.822-.635 1.421-.635.645 0 1.149.241 1.514.723.367.478.551 1.144.551 1.997v.073Zm-1.181-.103c0-.527-.106-.945-.318-1.255-.208-.309-.507-.463-.898-.463-.485 0-.833.2-1.045.6v2.344c.215.41.566.615 1.055.615.377 0 .672-.151.883-.454.215-.306.323-.768.323-1.387Zm4.956-1.508a2.945 2.945 0 0 0-.484-.04c-.543 0-.909.209-1.098.625v3.614h-1.187v-5.283h1.133l.029.59c.287-.459.684-.688 1.192-.688.169 0 .309.023.42.068l-.005 1.114ZM699.428 552.484h1.23v4.986c0 .68-.213 1.22-.639 1.621-.423.4-.983.6-1.68.6-.742 0-1.315-.187-1.719-.561-.403-.374-.605-.895-.605-1.563h1.23c0 .378.093.663.279.855.188.189.46.283.815.283.332 0 .596-.109.791-.327.199-.221.298-.526.298-.913v-4.981Zm5.732 6.592c-.348.41-.843.615-1.484.615-.573 0-1.007-.167-1.304-.502-.293-.336-.439-.821-.439-1.456v-3.422h1.186v3.408c0 .67.279 1.006.835 1.006.576 0 .965-.207 1.167-.62v-3.794h1.187v5.283h-1.118l-.03-.518Zm3.457-4.765.035.61c.39-.472.903-.708 1.538-.708 1.1 0 1.66.63 1.679 1.89v3.491h-1.186v-3.423c0-.335-.073-.583-.22-.742-.143-.163-.379-.244-.708-.244-.478 0-.835.216-1.069.649v3.76h-1.187v-5.283h1.118ZM638.832 551.502l2.05 5.45 2.046-5.45h1.597v7.11h-1.231v-2.344l.123-3.135-2.1 5.479h-.884l-2.095-5.474.122 3.13v2.344h-1.23v-7.11h1.602Zm10.2 7.11a1.84 1.84 0 0 1-.137-.493 1.85 1.85 0 0 1-1.387.59c-.53 0-.963-.151-1.299-.454a1.452 1.452 0 0 1-.502-1.123c0-.563.208-.994.625-1.294.419-.302 1.018-.454 1.796-.454h.728v-.346c0-.274-.077-.492-.23-.655-.153-.166-.385-.249-.698-.249-.27 0-.491.069-.664.205a.624.624 0 0 0-.259.513h-1.186c0-.29.096-.56.288-.811.192-.253.452-.452.781-.595a2.76 2.76 0 0 1 1.109-.215c.618 0 1.111.156 1.479.469.368.309.557.745.566 1.308v2.383c0 .475.067.855.201 1.138v.083h-1.211Zm-1.304-.855c.234 0 .454-.057.659-.171.209-.114.365-.267.469-.459v-.996h-.64c-.439 0-.77.077-.991.23a.743.743 0 0 0-.332.649c0 .228.075.41.225.547.153.134.356.2.61.2Zm5.327-.844 1.074-3.584h1.265l-2.1 6.084c-.322.888-.869 1.333-1.64 1.333-.173 0-.363-.03-.571-.088v-.918l.224.014c.3 0 .524-.055.674-.166.153-.107.273-.289.361-.547l.171-.454-1.855-5.258h1.279l1.118 3.584ZM788.862 551.502h1.231v4.986c0 .68-.214 1.22-.64 1.621-.423.4-.983.6-1.68.6-.742 0-1.315-.187-1.719-.561-.403-.374-.605-.895-.605-1.563h1.23c0 .378.093.663.279.855.189.189.46.283.815.283.332 0 .596-.109.791-.327.199-.221.298-.526.298-.913v-4.981Zm5.733 6.592c-.349.41-.844.615-1.485.615-.573 0-1.007-.167-1.304-.503-.293-.335-.439-.82-.439-1.455v-3.422h1.186v3.408c0 .67.279 1.006.835 1.006.577 0 .966-.207 1.167-.621v-3.793h1.187v5.283h-1.118l-.029-.518Zm3.618.518h-1.187v-7.5h1.187v7.5ZM366.721 318.42h.884v.952h-.884v1.582h-1.186v-1.582h-3.071l-.034-.722 3.066-4.805h1.225v4.575Zm-3.046 0h1.86v-2.969l-.088.157-1.772 2.812Zm9.35-.459c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.738.747.385.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.149-.854.445-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.218.109-.441.113-.669v-.923h1.069l-.005.854c-.003.345-.091.69-.264 1.036a2.548 2.548 0 0 1-.659.859Zm6.587-4.595c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.739-.757-.387-.508-.585-1.258-.595-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.968-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.092-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.149-.855.445-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.279 1.484.185.326.477.489.874.489.381 0 .662-.15.844-.45.183-.302.279-.774.289-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.577 2.315-.38.517-.961.776-1.743.776-.768 0-1.347-.252-1.738-.757-.387-.508-.586-1.258-.596-2.251v-1.23c0-1.022.191-1.789.572-2.3.384-.511.968-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.187-1.328c0-.667-.091-1.156-.273-1.465-.183-.312-.472-.469-.869-.469-.388 0-.673.149-.855.445-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.278 1.484.186.326.477.489.874.489.381 0 .663-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.738.747.385.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.149-.854.445-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.218.109-.441.113-.669v-.923h1.069l-.005.854c-.003.345-.091.69-.264 1.036a2.548 2.548 0 0 1-.659.859Zm6.587-4.595c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.739-.757-.387-.508-.585-1.258-.595-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.092-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.149-.854.445-.183.293-.279.752-.289 1.377v1.611c0 .664.093 1.159.279 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.744.776-.768 0-1.347-.252-1.738-.757-.387-.508-.586-1.258-.596-2.251v-1.23c0-1.022.191-1.789.572-2.3.384-.511.968-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.187-1.328c0-.667-.091-1.156-.273-1.465-.183-.312-.472-.469-.869-.469-.388 0-.673.149-.855.445-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.278 1.484.186.326.477.489.874.489.381 0 .663-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.738.747.385.498.582 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.149-.854.445-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606ZM364.08 373.817h.723c.364-.003.652-.098.864-.283.215-.186.322-.454.322-.806 0-.339-.089-.601-.268-.786-.176-.189-.446-.283-.811-.283-.319 0-.581.092-.786.278a.915.915 0 0 0-.308.718h-1.186c0-.365.096-.697.288-.996.195-.3.465-.533.81-.699a2.642 2.642 0 0 1 1.167-.253c.71 0 1.267.179 1.67.537.407.354.611.849.611 1.484 0 .319-.103.62-.308.903-.202.28-.464.492-.786.635.39.134.687.344.889.63.205.286.307.628.307 1.025 0 .638-.22 1.146-.659 1.524-.436.377-1.011.566-1.724.566-.683 0-1.243-.182-1.679-.547-.437-.364-.655-.849-.655-1.455h1.187c0 .313.104.567.312.762.212.195.495.293.85.293.368 0 .658-.098.869-.293.212-.195.317-.479.317-.85 0-.374-.11-.662-.332-.864-.221-.202-.55-.303-.986-.303h-.698v-.937Zm8.945 1.103c0 1.023-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.507-.586-1.258-.596-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.358.249 1.738.747.385.498.581 1.243.591 2.236v1.23Zm-1.186-1.328c0-.667-.091-1.155-.274-1.465-.182-.312-.472-.468-.869-.468-.387 0-.672.148-.854.444-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.218.109-.441.113-.669v-.923h1.069l-.005.855c-.003.345-.091.69-.264 1.035a2.548 2.548 0 0 1-.659.859Zm6.587-4.595c0 1.023-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.739-.757-.387-.507-.585-1.258-.595-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.968-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.23Zm-1.186-1.328c0-.667-.092-1.155-.274-1.465-.182-.312-.472-.468-.869-.468-.387 0-.672.148-.855.444-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.279 1.485.185.325.477.488.874.488.381 0 .662-.15.844-.449.183-.303.279-.775.289-1.416v-1.607Zm6.87 1.328c0 1.023-.192 1.794-.577 2.315-.38.517-.961.776-1.743.776-.768 0-1.347-.252-1.738-.757-.387-.507-.586-1.258-.596-2.251v-1.23c0-1.022.191-1.789.572-2.3.384-.511.968-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.23Zm-1.187-1.328c0-.667-.091-1.155-.273-1.465-.183-.312-.472-.468-.869-.468-.388 0-.673.148-.855.444-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.278 1.485.186.325.477.488.874.488.381 0 .663-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm6.87 1.328c0 1.023-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.507-.586-1.258-.596-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.358.249 1.738.747.385.498.581 1.243.591 2.236v1.23Zm-1.186-1.328c0-.667-.091-1.155-.274-1.465-.182-.312-.472-.468-.869-.468-.387 0-.672.148-.854.444-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.218.109-.441.113-.669v-.923h1.069l-.005.855c-.003.345-.091.69-.264 1.035a2.548 2.548 0 0 1-.659.859Zm6.587-4.595c0 1.023-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.739-.757-.387-.507-.585-1.258-.595-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.23Zm-1.186-1.328c0-.667-.092-1.155-.274-1.465-.182-.312-.472-.468-.869-.468-.387 0-.672.148-.854.444-.183.293-.279.752-.289 1.377v1.611c0 .664.093 1.159.279 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm6.87 1.328c0 1.023-.192 1.794-.576 2.315-.381.517-.962.776-1.744.776-.768 0-1.347-.252-1.738-.757-.387-.507-.586-1.258-.596-2.251v-1.23c0-1.022.191-1.789.572-2.3.384-.511.968-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.23Zm-1.187-1.328c0-.667-.091-1.155-.273-1.465-.183-.312-.472-.468-.869-.468-.388 0-.673.148-.855.444-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.278 1.485.186.325.477.488.874.488.381 0 .663-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm6.87 1.328c0 1.023-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.507-.586-1.258-.596-2.251v-1.23c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.358.249 1.738.747.385.498.582 1.243.591 2.236v1.23Zm-1.186-1.328c0-.667-.091-1.155-.274-1.465-.182-.312-.472-.468-.869-.468-.387 0-.672.148-.854.444-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607ZM367.488 434.873h-4.78v-.816l2.368-2.583c.342-.381.584-.698.728-.952.146-.257.219-.514.219-.771 0-.339-.096-.612-.288-.821-.189-.208-.444-.312-.766-.312-.385 0-.682.117-.894.351-.212.235-.317.555-.317.962h-1.187c0-.433.098-.822.293-1.167a2.05 2.05 0 0 1 .845-.81 2.704 2.704 0 0 1 1.269-.288c.69 0 1.234.174 1.631.522.401.345.601.824.601 1.436 0 .355-.101.727-.303 1.118-.199.387-.526.828-.981 1.323l-1.739 1.86h3.301v.948Zm5.537-2.993c0 1.022-.192 1.793-.576 2.314-.381.518-.962.776-1.743.776-.768 0-1.348-.252-1.738-.756-.388-.508-.586-1.259-.596-2.251v-1.231c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.358.249 1.738.747.385.498.581 1.243.591 2.236v1.231Zm-1.186-1.329c0-.667-.091-1.155-.274-1.464-.182-.313-.472-.469-.869-.469-.387 0-.672.148-.854.444-.183.293-.279.752-.288 1.377v1.611c0 .665.092 1.159.278 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.218.109-.441.113-.669v-.923h1.069l-.005.855c-.003.345-.091.69-.264 1.035a2.538 2.538 0 0 1-.659.859Zm6.587-4.594c0 1.022-.192 1.793-.576 2.314-.381.518-.962.776-1.743.776-.768 0-1.348-.252-1.739-.756-.387-.508-.585-1.259-.595-2.251v-1.231c0-1.022.19-1.789.571-2.3.384-.511.968-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.231Zm-1.186-1.329c0-.667-.092-1.155-.274-1.464-.182-.313-.472-.469-.869-.469-.387 0-.672.148-.855.444-.182.293-.278.752-.288 1.377v1.611c0 .665.093 1.159.279 1.485.185.325.477.488.874.488.381 0 .662-.15.844-.449.183-.303.279-.775.289-1.416v-1.607Zm6.87 1.329c0 1.022-.192 1.793-.577 2.314-.38.518-.961.776-1.743.776-.768 0-1.347-.252-1.738-.756-.387-.508-.586-1.259-.596-2.251v-1.231c0-1.022.191-1.789.572-2.3.384-.511.968-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.231Zm-1.187-1.329c0-.667-.091-1.155-.273-1.464-.183-.313-.472-.469-.869-.469-.388 0-.673.148-.855.444-.182.293-.278.752-.288 1.377v1.611c0 .665.093 1.159.278 1.485.186.325.477.488.874.488.381 0 .663-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm6.87 1.329c0 1.022-.192 1.793-.576 2.314-.381.518-.962.776-1.743.776-.768 0-1.348-.252-1.738-.756-.388-.508-.586-1.259-.596-2.251v-1.231c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.358.249 1.738.747.385.498.581 1.243.591 2.236v1.231Zm-1.186-1.329c0-.667-.091-1.155-.274-1.464-.182-.313-.472-.469-.869-.469-.387 0-.672.148-.854.444-.183.293-.279.752-.288 1.377v1.611c0 .665.092 1.159.278 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.218.109-.441.113-.669v-.923h1.069l-.005.855c-.003.345-.091.69-.264 1.035a2.538 2.538 0 0 1-.659.859Zm6.587-4.594c0 1.022-.192 1.793-.576 2.314-.381.518-.962.776-1.743.776-.768 0-1.348-.252-1.739-.756-.387-.508-.585-1.259-.595-2.251v-1.231c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.231Zm-1.186-1.329c0-.667-.092-1.155-.274-1.464-.182-.313-.472-.469-.869-.469-.387 0-.672.148-.854.444-.183.293-.279.752-.289 1.377v1.611c0 .665.093 1.159.279 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm6.87 1.329c0 1.022-.192 1.793-.576 2.314-.381.518-.962.776-1.744.776-.768 0-1.347-.252-1.738-.756-.387-.508-.586-1.259-.596-2.251v-1.231c0-1.022.191-1.789.572-2.3.384-.511.968-.766 1.753-.766.778 0 1.357.249 1.738.747.384.498.581 1.243.591 2.236v1.231Zm-1.187-1.329c0-.667-.091-1.155-.273-1.464-.183-.313-.472-.469-.869-.469-.388 0-.673.148-.855.444-.182.293-.278.752-.288 1.377v1.611c0 .665.093 1.159.278 1.485.186.325.477.488.874.488.381 0 .663-.15.845-.449.182-.303.278-.775.288-1.416v-1.607Zm6.87 1.329c0 1.022-.192 1.793-.576 2.314-.381.518-.962.776-1.743.776-.768 0-1.348-.252-1.738-.756-.388-.508-.586-1.259-.596-2.251v-1.231c0-1.022.19-1.789.571-2.3.384-.511.969-.766 1.753-.766.778 0 1.358.249 1.738.747.385.498.582 1.243.591 2.236v1.231Zm-1.186-1.329c0-.667-.091-1.155-.274-1.464-.182-.313-.472-.469-.869-.469-.387 0-.672.148-.854.444-.183.293-.279.752-.288 1.377v1.611c0 .665.092 1.159.278 1.485.185.325.477.488.874.488.381 0 .662-.15.845-.449.182-.303.278-.775.288-1.416v-1.607ZM365.921 479.065h-1.182v-5.708l-1.743.596v-1.001l2.773-1.021h.152v7.134Zm7.104-2.993c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.023.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.738.747.385.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.148-.854.445-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.219.109-.441.113-.669v-.923h1.069l-.005.854c-.003.345-.091.69-.264 1.035a2.542 2.542 0 0 1-.659.86Zm6.587-4.595c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.739-.757-.387-.508-.585-1.258-.595-2.251v-1.23c0-1.023.19-1.789.571-2.3.384-.511.968-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.092-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.148-.855.445-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.279 1.484.185.326.477.489.874.489.381 0 .662-.15.844-.45.183-.302.279-.774.289-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.577 2.315-.38.517-.961.776-1.743.776-.768 0-1.347-.252-1.738-.757-.387-.508-.586-1.258-.596-2.251v-1.23c0-1.023.191-1.789.572-2.3.384-.511.968-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.187-1.328c0-.667-.091-1.156-.273-1.465-.183-.312-.472-.469-.869-.469-.388 0-.673.148-.855.445-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.278 1.484.186.326.477.489.874.489.381 0 .663-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.023.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.738.747.385.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.148-.854.445-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm2.48 5.923-.639-.381a3.35 3.35 0 0 0 .385-.776c.072-.219.109-.441.113-.669v-.923h1.069l-.005.854c-.003.345-.091.69-.264 1.035a2.542 2.542 0 0 1-.659.86Zm6.587-4.595c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.739-.757-.387-.508-.585-1.258-.595-2.251v-1.23c0-1.023.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.092-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.148-.854.445-.183.293-.279.752-.289 1.377v1.611c0 .664.093 1.159.279 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.744.776-.768 0-1.347-.252-1.738-.757-.387-.508-.586-1.258-.596-2.251v-1.23c0-1.023.191-1.789.572-2.3.384-.511.968-.767 1.753-.767.778 0 1.357.249 1.738.747.384.498.581 1.244.591 2.237v1.23Zm-1.187-1.328c0-.667-.091-1.156-.273-1.465-.183-.312-.472-.469-.869-.469-.388 0-.673.148-.855.445-.182.293-.278.752-.288 1.377v1.611c0 .664.093 1.159.278 1.484.186.326.477.489.874.489.381 0 .663-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Zm6.87 1.328c0 1.022-.192 1.794-.576 2.315-.381.517-.962.776-1.743.776-.768 0-1.348-.252-1.738-.757-.388-.508-.586-1.258-.596-2.251v-1.23c0-1.023.19-1.789.571-2.3.384-.511.969-.767 1.753-.767.778 0 1.358.249 1.738.747.385.498.582 1.244.591 2.237v1.23Zm-1.186-1.328c0-.667-.091-1.156-.274-1.465-.182-.312-.472-.469-.869-.469-.387 0-.672.148-.854.445-.183.293-.279.752-.288 1.377v1.611c0 .664.092 1.159.278 1.484.185.326.477.489.874.489.381 0 .662-.15.845-.45.182-.302.278-.774.288-1.416v-1.606Z"
    />
    <foreignObject x="680" y="205" width="130" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-4xl font-bold"
          style={{
            color: colors.accent,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          42,43M
        </p>
      </div>
    </foreignObject>
    <path
      fill={shades.primaryLight}
      d="M362.176 290.349h443.151v.982H362.176z"
    />
    <path
      fill={shades.primaryLight}
      d="M421.463 309.008h1.005v231.765h-1.005zM778.195 309.99h1.005v230.783h-1.005zM493.815 309.99h1.005v231.765h-1.005zM566.166 309.99h1.005v231.765h-1.005zM636.507 309.99h1.005v231.765h-1.005zM708.859 309.99h1.005v231.765h-1.005z"
    />
    <foreignObject x="330" y="205" width="180" height="80">
      <div className="h-full items-center flex justify-center">
        <p
          className="text-2xl font-bold"
          style={{
            color: colors.primary,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          Total visits
        </p>
      </div>
    </foreignObject>
    <path
      stroke={`url(#h${id})`}
      strokeWidth={3}
      d="M421.463 398.126c14.089 8.874 46.727 45.947 73.357 0 37.736-95.536 69.336-29.671 69.336-29.671s38.185 73.654 67.327 29.671c51.321-103.106 56.649-18.794 76.271 0 32.202 39.154 70.441 0 70.441 0"
    />
    <path
      fill={colors.accent}
      stroke={colors.bg}
      strokeWidth={4}
      d="M716.078 398.856c0 3.192-2.66 5.857-6.039 5.857-3.379 0-6.039-2.665-6.039-5.857 0-3.191 2.66-5.856 6.039-5.856 3.379 0 6.039 2.665 6.039 5.856Z"
    />
    <path fill={shades.primaryLight} d="M708 407h4v138.47h-4z" />
    <rect
      width={84.41}
      height={44.193}
      x={668}
      y={338}
      fill={shades.primaryLight}
      rx={16}
    />
    <foreignObject width={84.41} height={45} x={668} y={338}>
      <div className="h-full items-center flex flex-col justify-center">
        <p
          className="text-sm font-bold"
          style={{
            color: colors.bg,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          24,000,033
        </p>
        <p
          className="text-sm font-bold"
          style={{
            color: shades.bgLight,
            fontFamily: fonts.primary.fontFamily,
          }}
        >
          visitors
        </p>
      </div>
    </foreignObject>
    <defs>
      <filter
        id={`b${id}`}
        width={82}
        height={81}
        x={27}
        y={17}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_20"
          stdDeviation={11.5}
        />
      </filter>
      <filter
        id={`d${id}`}
        width={266.849}
        height={229.488}
        x={868.458}
        y={232}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_20"
          stdDeviation={23}
        />
      </filter>
      <filter
        id={`f${id}`}
        width={406.01}
        height={389.511}
        x={873.454}
        y={149.645}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_20"
          stdDeviation={49.5}
        />
      </filter>
      <filter
        id={`g${id}`}
        width={264.585}
        height={263.074}
        x={773.839}
        y={102.224}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_20"
          stdDeviation={36}
        />
      </filter>
      <linearGradient
        id={`a${id}`}
        x1={279}
        x2={8}
        y1={191}
        y2={185.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={colors.accent} stopOpacity={0.07} />
        <stop offset={1} stopColor={colors.accent} stopOpacity={0.03} />
      </linearGradient>
      <linearGradient
        id={`h${id}`}
        x1={421.463}
        x2={778.195}
        y1={346.326}
        y2={346.326}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={colors.accent} />
        <stop offset={1} stopColor={colors.extra} />
      </linearGradient>
      <pattern
        id={`c${id}`}
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref={`#i${id}`}
          transform="matrix(.00463 0 0 .00455 0 -.03)"
        />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id={`i${id}`}
        width={216}
        height={233}
      />
    </defs>
  </svg>
);

export default DashboardTemplate;
