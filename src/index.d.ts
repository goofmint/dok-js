export type ErrorResponse = {
  /** Whether the error is fatal */
  is_fatal: boolean;
  /** Serial number of the error */
  serial: string;
  /** Status of the error */
  status: string;
  /** Error code */
  error_code: string;
  /** Error message */
  error_msg: string;
}