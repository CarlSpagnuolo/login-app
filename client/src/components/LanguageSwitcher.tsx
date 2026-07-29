import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "it",
    name: "Italiano",
    flag: "🇮🇹",
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
  },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) ?? languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2
          px-3
          py-2
          rounded-lg
          border
          border-cyan-400/30
          bg-black/30
          text-cyan-300
          font-mono
          text-xs
          tracking-wider
          backdrop-blur-md
            cursor cursor-pointer
          hover:border-cyan-300
          hover:text-white
          hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]

          transition-all
          duration-300
        "
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>

        <span
          className={`
            transition-transform
            duration-250
            ${open ? "rotate-180" : ""}
          `}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            mt-2
            w-40
            rounded-lg
            border
            border-cyan-400/20
            bg-[#050816]/90
            backdrop-blur-md
            shadow-[0_0_30px_rgba(34,211,238,0.15)]
            overflow-hidden
           
            z-50
            
          "
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                i18n.changeLanguage(language.code);
                setOpen(false);
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-left
                text-xs
                font-mono
                text-gray-300
                cursor cursor-pointer
                hover:bg-cyan-400/10
                hover:text-white

                transition
                duration-75
              "
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
