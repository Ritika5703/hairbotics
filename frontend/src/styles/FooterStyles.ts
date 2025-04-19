const FooterStyles = {
  footer: `
    bg-green-100 text-gray-800 py-10 px-6
    border-t border-green-200
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
    text-3xl font-extrabold tracking-tight text-green-600
  `,
  logoHighlight: `text-green-500 animate-pulse`,
  tagline: `
    text-sm text-gray-600 mt-2 italic max-w-xs
  `,
  links: `
    mt-5 flex flex-col md:flex-row justify-center md:justify-center
    items-center md:items-start
    gap-4 text-sm font-medium
  `,
  link: `
    text-gray-700 hover:text-green-600 transition duration-300 ease-in-out
  `,
  socialMedia: `
    flex justify-center md:justify-end gap-4 text-xl
    items-center text-green-600
  `,
  socialLink: `
    hover:text-green-800 transition transform hover:scale-110 duration-300
  `,
  copy: `
     mt-10 text-xs text-center text-gray-500 col-span-full
  `,
};

export default FooterStyles;
