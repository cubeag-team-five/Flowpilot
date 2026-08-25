package com.flowpilot.flowpilot.scrummaster.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;

/**
 * Working-day arithmetic for every sprint calculation in this module.
 *
 * Sprint metrics must not count weekends: a Mon-Fri sprint is five working
 * days, not four (a naive endDate minus startDate) and not seven. Using
 * calendar days understates the required daily burn by roughly 28% on a
 * two-week sprint, which makes a struggling sprint look healthy.
 *
 * One fixed zone is used deliberately. "Today" has to mean the same day for
 * the nightly snapshot job and for a request served from any host, otherwise
 * a sprint gains or loses a day depending on server locale.
 */
public final class ScrumWorkingDays {

    public static final ZoneId ZONE = ZoneId.of("Asia/Kolkata");

    private ScrumWorkingDays() {
    }

    public static LocalDate today() {
        return LocalDate.now(ZONE);
    }

    /** Working days from `from` to `to`, inclusive of both ends. */
    public static int between(LocalDate from, LocalDate to) {

        if (from == null || to == null || to.isBefore(from)) {
            return 0;
        }

        int count = 0;

        for (LocalDate day = from; !day.isAfter(to); day = day.plusDays(1)) {

            DayOfWeek weekday = day.getDayOfWeek();

            if (weekday != DayOfWeek.SATURDAY && weekday != DayOfWeek.SUNDAY) {
                count++;
            }
        }

        return count;
    }

    /** Total working days in a sprint window; 0 when the dates are unset. */
    public static int durationOf(LocalDate start, LocalDate end) {
        return between(start, end);
    }

    /**
     * 1-based working-day ordinal of a date within a sprint, or 0 when the
     * date falls outside the window. Day 1 is the sprint's first working day.
     */
    public static int dayNumber(LocalDate start, LocalDate date) {

        if (start == null || date == null || date.isBefore(start)) {
            return 0;
        }

        return between(start, date);
    }

    /** Working days already spent, never negative and never past the end. */
    public static int elapsed(LocalDate start, LocalDate end) {

        if (start == null) {
            return 0;
        }

        LocalDate now = today();

        if (now.isBefore(start)) {
            return 0;
        }

        LocalDate cutoff = (end != null && now.isAfter(end)) ? end : now;

        return between(start, cutoff);
    }

    /** Working days left before the sprint ends, never negative. */
    public static int remaining(LocalDate start, LocalDate end) {

        if (end == null) {
            return 0;
        }

        LocalDate now = today();

        if (now.isAfter(end)) {
            return 0;
        }

        LocalDate from = (start != null && now.isBefore(start)) ? start : now;

        return between(from, end);
    }
}
