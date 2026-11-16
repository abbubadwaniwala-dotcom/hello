import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-default px-6">
      {/* Giant ghosted 404 in the background */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute text-[28vw] font-black leading-none tracking-tighter text-black/[0.04]"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Floating badge */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-primary-main text-primary-contrast flex items-center justify-center text-3xl font-bold shadow-lg shadow-primary-main/30 animate-[float_3s_ease-in-out_infinite]">
          ?
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
          Page not found
        </h1>

        <p className="mt-3 text-text-secondary">
          We couldn't find{" "}
          <code className="px-1.5 py-0.5 rounded bg-black/5 text-sm text-text-primary">
            {location.pathname}
          </code>
          . It may have been moved or never existed.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-primary-main text-primary-contrast font-medium hover:bg-primary-dark transition-colors duration-150 ease-material"
          >
            Go home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg border border-divider text-text-primary font-medium hover:bg-action-hover transition-colors duration-150 ease-material"
          >
            Go back
          </button>
        </div>
      </div>

      {/* Keyframes for the float animation (scoped inline) */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}