const FooterStyles = {
  footer: `
    bg-gray-900 text-white py-10 px-6
    border-t border-gray-700
  `,
  container: `
    max-w-7xl mx-auto w-full
    grid grid-cols-1 md:grid-cols-3
    gap-10 text-center md:text-left
  `,
  logoBlock: `
    flex flex-col items-center md:items-start
  `,
  logo: `
    text-3xl font-extrabold tracking-tight
  `,
  logoHighlight: `text-green-400 animate-pulse`,
  tagline: `
    text-sm text-gray-400 mt-2 italic max-w-xs
  `,
  links: `
    mt-5 flex flex-col md:flex-row justify-center md:justify-center
    items-center md:items-start
    gap-4 text-sm font-medium
  `,
  link: `
    hover:text-green-400 transition duration-300 ease-in-out
  `,
  socialMedia: `
    flex justify-center md:justify-end gap-4 text-xl
    items-center
  `,
  socialLink: `
    hover:text-green-400 transition transform hover:scale-110 duration-300
  `,
  copy: `
     mt-10 text-xs text-center text-gray-400 col-span-full
  `,
};

export default FooterStyles;
