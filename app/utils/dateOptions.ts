import { startOfDay, subDays, format } from "date-fns"

// Date options for the graphic
export const DATE_OPTIONS = {
    last_7_days: {
        label: "Last 7 Days",
        startDate: startOfDay(subDays(new Date(), 8)),
    },
    
    last_month: {
        label: "Last Month",
        startDate: startOfDay(subDays(new Date(), 31)), 
    },

    last_year: {
        label: "Last Year",
        startDate: startOfDay(subDays(new Date(), 366)),
    },
}

// Formatted variables for date ranges
export const last_7_days = format(DATE_OPTIONS.last_7_days.startDate, "yyyy-MM-dd");
export const last_month = format(DATE_OPTIONS.last_month.startDate, "yyyy-MM-dd");
export const last_year = format(DATE_OPTIONS.last_year.startDate, "yyyy-MM-dd");