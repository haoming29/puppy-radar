import { SITE_NAME, TITLE_SPLITTER } from "@/configs";

export const getTitle = (title: string) =>
  `${title} ${TITLE_SPLITTER} ${SITE_NAME}`;
