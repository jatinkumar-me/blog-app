import { formatDistanceToNow, parseISO } from "date-fns";

export const timeAgo = (timestamp: string): string => {
    const timePeriod = formatDistanceToNow(parseISO(timestamp));
    return `${timePeriod}`;
};

