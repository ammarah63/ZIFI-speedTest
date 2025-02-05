const LogoComponent = ({fill}) => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="55.4925"
          height="35" 
          viewBox="0 0 96.985 50"
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="Rectangle_3116"
                data-name="Rectangle 3116"
                width="96.985"
                height={50}
                fill="none"
              />
            </clipPath>
          </defs>
          <g id="Group_7924" data-name="Group 7924" transform="translate(0 0)">
            <g
              id="Group_7923"
              data-name="Group 7923"
              transform="translate(0 0)"
              clipPath="url(#clip-path)"
            >
              <path
                id="Path_36943"
                data-name="Path 36943"
                d="M.919,3H32.227L.425,47.422A2.164,2.164,0,0,0,0,48.693V50H36.75V47H4.806L36.538,2.685a2.493,2.493,0,0,0,.494-1.448V0H.919Z"
                transform="translate(0 0)"
                fill={fill || "#fff"}
              />
              <rect
                id="Rectangle_3114"
                data-name="Rectangle 3114"
                width="22.06"
                height="3.003"
                transform="translate(58.968 24.028)"
                fill={fill || "#fff"}
              />
              <rect
                id="Rectangle_3115"
                data-name="Rectangle 3115"
                width="25.593"
                height="3.004"
                transform="translate(58.968 0)"
                fill={fill || "#fff"}
              />
              <path
                id="Path_36944"
                data-name="Path 36944"
                d="M42.749,7.442l.01,41.9,2.9-.005-.011-41.9Z"
                transform="translate(3.797 0.66)"
                fill={fill || "#fff"}
              />
              <path
                id="Path_36945"
                data-name="Path 36945"
                d="M45.647,0l-2.9.005V3.754l2.9-.005Z"
                transform="translate(3.797 0)"
                fill={fill || "#fff"}
              />
              <path
                id="Path_36946"
                data-name="Path 36946"
                d="M89.3,7.437l-2.9.005.01,41.9,2.9,0Z"
                transform="translate(7.675 0.66)"
                fill={fill || "#fff"}
              />
              <path
                id="Path_36947"
                data-name="Path 36947"
                d="M89.3,0,86.4.005V3.754l2.9-.005Z"
                transform="translate(7.675 0)"
                fill={fill || "#fff"}
              />
            </g>
          </g>
        </svg>
      </>
    );
}
 
export default LogoComponent;