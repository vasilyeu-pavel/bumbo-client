export const prepareSearchParams = (queries = {}, defaultSearchParams, isPartners) => ({
  isPartners,
  adults: parseInt(queries.adults || defaultSearchParams.adults, 10),
  nights: parseInt(queries.nights || defaultSearchParams.nights, 10),
  nights_range: parseInt(queries.nights_range || defaultSearchParams.nights_range, 10),
  date_from: queries.date_from || defaultSearchParams.date_from,
  date_to: queries.date_to || defaultSearchParams.date_to,
  city_from_id: parseInt(queries.city_from_id || defaultSearchParams.city_from_id, 10),
  kids_ages: queries.kids_ages || defaultSearchParams.kids_ages,
});
