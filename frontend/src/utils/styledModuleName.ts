type Stylesheets = {
  readonly [selector: string]: string
}

const BLANK = ' '

/**
 * The styled module name class for stored and get hashed css class name
 */
class StyledModuleNames {
  private readonly stylesheets: Stylesheets

  private keys: Array<string>

  constructor(stylesheets: Stylesheets) {
    this.stylesheets = stylesheets
    this.keys = Object.keys(stylesheets)
  }

  /**
   * Get local indent name of single css class's name
   *
   * @param className - the raw css class
   * @returns - hashed css class in stylesheet
   */
  private getHashedClassName = (className: string = '') => {
    const isClassNameExisted = this.keys.includes(className)
    if (!isClassNameExisted) {
      return className
    }

    return this.stylesheets[className] as string
  }

  /**
   * Get hashed value of css class names
   *
   * @param className - raw list or value of css class name
   * @returns a single string of all hashed class names
   */
  getSelectors = (className: string | ReadonlyArray<string>) => {
    let classNames: Array<string> =
      className instanceof Array
        ? className.join(BLANK).split(BLANK)
        : className.split(BLANK)

    return classNames.map((it) => this.getHashedClassName(it)).join(BLANK)
  }
}

/**
 * Convert to Styled Modules name for get hashed css class name
 * @param stylesheet - the stylesheet of components
 * @returns callback function to get hashed css class name
 */
export const toStyledModuleNames = (stylesheet: Stylesheets) => {
  const styledModule = new StyledModuleNames(stylesheet)
  return (cssClassName: string | ReadonlyArray<string>) =>
    styledModule.getSelectors(cssClassName)
}
