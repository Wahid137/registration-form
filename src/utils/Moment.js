import moment from "moment";

export const minBirthDate = moment().subtract(18, "years").format("YYYY-MM-DD");
