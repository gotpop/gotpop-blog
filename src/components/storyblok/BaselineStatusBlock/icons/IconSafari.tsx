import { useId } from "react"

export default function IconSafari() {
  const linearGradientId = useId()
  const radialGradientId = useId()
  const clipPathId = useId()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      aria-label="Safari"
    >
      <title>Safari browser icon</title>
      <g clipPath={`url(#${clipPathId})`}>
        <path
          opacity="0.53"
          d="M19.5049 10.5241C19.5049 11.7071 19.2643 12.8785 18.7967 13.9715C18.3292 15.0644 17.6438 16.0575 16.7799 16.894C15.9159 17.7305 14.8903 18.394 13.7615 18.8467C12.6327 19.2995 11.4229 19.5325 10.2011 19.5325C8.97927 19.5325 7.76944 19.2995 6.64064 18.8467C5.51184 18.394 4.4862 17.7305 3.62225 16.894C2.75831 16.0575 2.07299 15.0644 1.60543 13.9715C1.13787 12.8785 0.897217 11.7071 0.897217 10.5241C0.897217 8.13494 1.87744 5.84363 3.62225 4.15423C5.36706 2.46484 7.73354 1.51575 10.2011 1.51575C11.4229 1.51575 12.6327 1.74875 13.7615 2.20147C14.8903 2.65418 15.9159 3.31773 16.7799 4.15423C17.6438 4.99074 18.3292 5.98381 18.7967 7.07675C19.2643 8.1697 19.5049 9.34111 19.5049 10.5241Z"
          fill="black"
        />
        <path
          d="M19.8586 9.72878C19.8586 11.0041 19.6088 12.2669 19.1234 13.4451C18.6381 14.6233 17.9267 15.6939 17.0298 16.5956C16.133 17.4974 15.0683 18.2127 13.8965 18.7008C12.7248 19.1888 11.4689 19.44 10.2005 19.44C7.63906 19.44 5.1825 18.4168 3.37126 16.5956C1.56002 14.7744 0.54248 12.3043 0.54248 9.72878C0.54248 7.15321 1.56002 4.68313 3.37126 2.86192C5.1825 1.04072 7.63906 0.0175788 10.2005 0.0175781C11.4689 0.017578 12.7248 0.268767 13.8965 0.7568C15.0683 1.24483 16.133 1.96016 17.0298 2.86192C17.9267 3.76369 18.6381 4.83424 19.1234 6.01246C19.6088 7.19068 19.8586 8.45349 19.8586 9.72878Z"
          fill={`url(#${linearGradientId})`}
          stroke="#CDCDCD"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.1018 9.72868C19.1018 12.1024 18.164 14.379 16.4947 16.0575C14.8254 17.7359 12.5613 18.6789 10.2006 18.6789C7.83982 18.6789 5.57575 17.7359 3.90644 16.0575C2.23713 14.379 1.29932 12.1024 1.29932 9.72868C1.29932 7.35493 2.23713 5.0784 3.90644 3.39991C5.57575 1.72141 7.83982 0.778442 10.2006 0.778442C12.5613 0.778442 14.8254 1.72141 16.4947 3.39991C18.164 5.0784 19.1018 7.35493 19.1018 9.72868Z"
          fill={`url(#${radialGradientId})`}
        />
      </g>
      <defs>
        <linearGradient
          id={linearGradientId}
          x1="10.2002"
          y1="19.4398"
          x2="10.2002"
          y2="0.0175272"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BDBDBD" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <radialGradient
          id={radialGradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.2407 8.42362) scale(9.65803 9.71116)"
        >
          <stop stopColor="#06C2E7" />
          <stop offset="0.25" stopColor="#0DB8EC" />
          <stop offset="0.5" stopColor="#12AEF1" />
          <stop offset="0.75" stopColor="#1F86F9" />
          <stop offset="1" stopColor="#107DDD" />
        </radialGradient>
        <clipPath id={clipPathId}>
          <rect
            width="20.4"
            height="20.4"
            fill="white"
            transform="translate(0.000488281)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
