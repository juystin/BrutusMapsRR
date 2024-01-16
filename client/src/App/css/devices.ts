const size = {
    mobile: '360px',
    smallTablet: '568px',
    portraitTablet: '666px',
    landscapeTablet: '666px',
    laptop: '1024px',
    desktop: '1300px'
}

export const device = {
    mobile: `(min-width: ${size.mobile})`,
    smallTablet: `(min-width: ${size.smallTablet})`,
    portraitTablet: `(min-width: ${size.portraitTablet})`,
    landscapeTablet: `(min-width: ${size.landscapeTablet}) and (orientation: landscape)`,
    laptop: `(min-width: ${size.laptop})`,
    desktop: `(min-width: ${size.desktop})`
  }