export default function WindowsLogo({ className = "w-5 h-5" }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className={className}
        role="img"
        aria-label="Windows Logo"
      >
        <title>Windows Logo</title>
        <g>
          <path fill="#f1511b" d="M0 0h236.4v236.4H0z" />
          <path fill="#80cc28" d="M275.6 0H512v236.4H275.6z" />
          <path fill="#00adef" d="M0 275.6h236.4V512H0z" />
          <path fill="#fbbc09" d="M275.6 275.6H512V512H275.6z" />
        </g>
      </svg>
    );
  }