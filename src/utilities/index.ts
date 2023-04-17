import { SITE_NAME, TITLE_SPLITTER } from "@/configs";

/**
 * Get the site title for a page
 * @param title The name/title of the page
 * @returns a string of the site title with post-fix added
 */
export const getTitle = (title: string): string =>
  `${title} ${TITLE_SPLITTER} ${SITE_NAME}`;
