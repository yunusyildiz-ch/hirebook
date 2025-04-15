import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";

export default function MobilAppStoreBadges() {
  return (
    <div className="flex justify-between gap-4">
      {/* App Store Badge */}
      <div className="w-36 h-10">
        <a href="https://apps.apple.com/" target="_blank" rel="noreferrer">
          <img
            src={appStoreBadge}
            alt="Download on the App Store"
            className="w-full h-full object-contain"
          />
        </a>
      </div>

      {/* Google Play Badge */}
      <div className="w-36 h-10">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={googlePlayBadge}
            alt="Get it on Google Play"
            className="w-full h-full object-contain"
          />
        </a>
      </div>
    </div>
  );
}
