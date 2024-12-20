export enum CourseEnum {
  DRAFTED = "DRAFTED",
  SUBMITTED = "SUBMITTED",
  BLOCKED = "BLOCKED",
  PUBLISHED = "PUBLISHED",
}
export const DefaultAvatar =
  "https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeHU5XQEO2o5FqukBPa_36zwWt9TLzuBU1Ba31MvO4FTUF-Bt6BZRMbrTlmohvV_WdXKDUMv0Q1BPp1fRgZjBMCu&_nc_ohc=mKje_Qww9A4Q7kNvgFvNu6u&_nc_zt=24&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=A_ar2IgZLd_cw_Mco4An8su&oh=00_AYB_eGtOt3_ntT9qN8-2ep04nMrqKuZAVgg2fJbAs56A0A&oe=6785B5BA"

export function convertToVND(amount: number) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0₫"
  }

  const numAmount = Number(amount)

  return numAmount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  })
}
