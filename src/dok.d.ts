export type DokMetaJson= {
  /** Current page number */
  page: number;
  /** Number of items per page */
  page_size: number;
  /** Total number of pages */
  total_pages: number;
  /** Total number of items */
  count: number;
  /** URL of the next page */
  next: string | null;
  /** URL of the previous page */
  previous: string | null;
}

export type DokMeta= {
  /** Current page number */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  count: number;
  /** URL of the next page */
  next: string | null;
  /** URL of the previous page */
  previous: string | null;
}
