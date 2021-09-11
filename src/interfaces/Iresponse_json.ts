export default interface DownloadFromTlgResponse {
  message: string,
  status: number,
  path?: string,
  err? : unknown
}