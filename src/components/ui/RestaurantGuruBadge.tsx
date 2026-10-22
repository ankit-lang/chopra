'use client'

export default function RestaurantGuruBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Restaurant Guru Badge Stylesheet */}
      <link href="https://awards.infcdn.net/2026_new/circ5_n.css" rel="stylesheet" />

      {/* Official Restaurant Guru Award Widget */}
      <div
        id="rg26-b-rcirc5"
        className="rg26-rg-award-lang-en_US transition-transform duration-300 hover:scale-105 shadow-lg"
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.nodeName.toLowerCase() !== 'a') {
            const link = document.querySelector<HTMLAnchorElement>('#rg26-b-rcirc5 .rg26-b-rcirc_bot_title')
            if (link?.href) {
              window.open(link.href, '_blank', 'noopener,noreferrer')
            } else {
              window.open('https://restaurantguru.com/Chopras-The-Hague', '_blank', 'noopener,noreferrer')
            }
          }
        }}
      >
        <div className="rg26-circ_cont">
          <img
            className="rg26-circ_img"
            src="https://awards.infcdn.net/img/star_red.svg"
            alt="star"
            width={36}
            height={36}
          />
          <a
            href="https://restaurantguru.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rg26-b-rcirc_top_title"
          >
            Restaurant Guru 2026
          </a>
          <p className="rg26-b-rcirc_ttl">Recommended</p>
          <a
            href="https://restaurantguru.com/Chopras-The-Hague"
            className="rg26-b-rcirc_bot_title rg26-circ11"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chopras Indian Restaurant Den Haag
          </a>
        </div>
      </div>
    </div>
  )
}
