const EPOCH = 1712546615000n // follow repo created
const MAX_TIMESTAMP_BITS = 41n // Maximum number of bits typically used for timestamp

export const isBizId = (id: string): boolean => {
  if (!id || !/^\d{13,19}$/.test(id)) return false

  const snowflake = BigInt(id)

  // Extract the timestamp assuming it's in the most significant bits after the sign bit
  const timestamp = (snowflake >> (63n - MAX_TIMESTAMP_BITS)) + EPOCH
  const date = new Date(Number(timestamp))

  // Check if the date is reasonable (between 2024 and 2050)
  if (date.getFullYear() >= 2024 && date.getFullYear() <= 2050) {
    // Additional validation: check if the ID is not larger than the maximum possible value
    const maxPossibleId = (1n << 63n) - 1n // Maximum possible 63-bit value
    if (snowflake <= maxPossibleId) {
      return true
    }
  }

  return false
}
