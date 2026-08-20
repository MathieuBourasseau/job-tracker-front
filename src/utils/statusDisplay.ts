import { MdOutlineSchedule, MdAutorenew, MdNotificationsActive, MdCancel } from "react-icons/md";
import type { Application } from "../types/application";

// Compute color, label, and icon to represent an application's current status,
// shared between ApplicationsPage and ApplicationDetails
export function getStatusDisplay(application: Application) {

    // Get the latest status from the application (same reduce as before)
    const latestStatus = application.statuses.reduce((latest, current) => {

        if (latest.date > current.date) {
            return latest;
        } else {
            return current;
        }
    }, application.statuses[0]);

    // Determine display values according to the current state
    if (latestStatus.state === "EN_COURS" && application.aRelancer) {
        return {
            color: "bg-status-follow-up",
            label: "A relancer",
            textColor: "text-white",
            iconColor: "text-white",
            StatusIcon: MdNotificationsActive,
        };

    } else if (latestStatus.state === "A_FAIRE") {
        return {
            color: "bg-status-todo",
            label: "A faire",
            textColor: "text-emerald-700",
            iconColor: "text-emerald-500",
            StatusIcon: MdOutlineSchedule,
        };

    } else if (latestStatus.state === "EN_COURS" && !application.aRelancer) {
        return {
            color: "bg-status-in-progress",
            label: "En cours",
            textColor: "text-black",
            iconColor: "text-black",
            StatusIcon: MdAutorenew,
        };

    } else {
        return {
            color: "bg-status-refused",
            label: "Refus",
            textColor: "text-white",
            iconColor: "text-white",
            StatusIcon: MdCancel,
        };
    }
}
